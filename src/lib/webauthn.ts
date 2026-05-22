/**
 * WebAuthn (passkey) client helpers.
 * Uses browser APIs:
 *   - navigator.credentials.create({ publicKey }) — register a passkey (triggers Touch ID)
 *   - navigator.credentials.get({ publicKey })     — sign in with existing passkey (triggers Touch ID when you pick one)
 *
 * In production, challenges MUST come from your server and assertions MUST be verified server-side.
 * This demo uses client-generated challenges only to demonstrate the browser flow.
 */

import { isSecureContext as checkSecureContext } from './secure-context';

const DEMO_RP_ID = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const DEMO_RP_NAME = 'web-crypto-auth-showcase';

/**
 * Generate a random challenge (32 bytes). Demo only — in production the server generates this.
 */
export function generateDemoChallenge(): Uint8Array {
  const challenge = new Uint8Array(32);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(challenge);
  }
  return challenge;
}

export interface WebAuthnSupport {
  supported: boolean;
  conditionalMediation: boolean;
  message?: string;
}

/**
 * Check if WebAuthn / passkeys are supported in this browser.
 */
export function checkWebAuthnSupport(): WebAuthnSupport {
  if (typeof window === 'undefined') {
    return { supported: false, conditionalMediation: false, message: 'Not in browser' };
  }
  if (!window.PublicKeyCredential) {
    return { supported: false, conditionalMediation: false, message: 'WebAuthn not supported' };
  }
  return {
    supported: true,
    conditionalMediation: false,
    message: 'Passkeys supported',
  };
}

/** Re-export for callers that depend on webauthn for environment checks. */
export { isSecureContext } from './secure-context';

export interface AuthenticateWithPasskeyResult {
  success: true;
  credentialId: string;
  clientDataJSON: string;
  authenticatorData: string;
  signature: string;
  userHandle: string | null;
}

export interface AuthenticateWithPasskeyError {
  success: false;
  error: string;
  code?: string;
}

export interface RegisterPasskeyResult {
  success: true;
  credentialId: string;
  publicKeyBase64: string;
  attestation?: string;
}

export interface RegisterPasskeyError {
  success: false;
  error: string;
  code?: string;
}

/**
 * Register a new passkey for this origin (create credential).
 * This stores a key pair in the platform authenticator (e.g. iCloud Keychain on Mac);
 * the private key never leaves the device. Touch ID / Face ID is prompted here to secure it.
 * In production, the server must provide challenge and store the public key + credential ID.
 */
export async function registerPasskey(userName: string): Promise<
  RegisterPasskeyResult | RegisterPasskeyError
> {
  if (typeof navigator === 'undefined' || !navigator.credentials) {
    return { success: false, error: 'Credentials API not available', code: 'NOT_AVAILABLE' };
  }
  if (!window.PublicKeyCredential) {
    return { success: false, error: 'WebAuthn not supported', code: 'NOT_SUPPORTED' };
  }
  if (!checkSecureContext()) {
    return {
      success: false,
      error: 'WebAuthn requires a secure context (HTTPS or localhost)',
      code: 'INSECURE_CONTEXT',
    };
  }

  const challenge = generateDemoChallenge();
  const challengeBuffer = new Uint8Array(challenge).buffer as ArrayBuffer;
  const userId = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(userId);
  }

  const publicKeyOptions: PublicKeyCredentialCreationOptions = {
    challenge: challengeBuffer,
    rp: { id: DEMO_RP_ID, name: DEMO_RP_NAME },
    user: {
      id: userId,
      name: userName,
      displayName: userName,
    },
    pubKeyCredParams: [
      { type: 'public-key', alg: -7 },
      { type: 'public-key', alg: -257 },
    ],
    authenticatorSelection: {
      authenticatorAttachment: 'platform',
      userVerification: 'required',
      residentKey: 'preferred',
      requireResidentKey: false,
    },
    timeout: 60_000,
  };

  try {
    const credential = await navigator.credentials.create({
      publicKey: publicKeyOptions,
    });

    if (!credential || !(credential instanceof PublicKeyCredential)) {
      return {
        success: false,
        error: 'No credential returned (user may have cancelled)',
        code: 'CANCELLED',
      };
    }

    const response = credential.response as AuthenticatorAttestationResponse;
    const credentialId = btoa(String.fromCharCode(...new Uint8Array(credential.rawId)));
    const publicKeyBase64 = response.getPublicKey()
      ? btoa(String.fromCharCode(...new Uint8Array(response.getPublicKey()!)))
      : '';
    const attestation = response.attestationObject
      ? btoa(String.fromCharCode(...new Uint8Array(response.attestationObject)))
      : undefined;

    return {
      success: true,
      credentialId,
      publicKeyBase64,
      attestation,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const code =
      err instanceof Error && 'name' in err ? (err as { name?: string }).name : undefined;
    return {
      success: false,
      error: message,
      code: code ?? 'UNKNOWN',
    };
  }
}

/**
 * Run WebAuthn authentication (get assertion) using browser APIs.
 * For demo, challenge is generated client-side; production must use server challenge.
 */
export async function authenticateWithPasskey(): Promise<
  AuthenticateWithPasskeyResult | AuthenticateWithPasskeyError
> {
  if (typeof navigator === 'undefined' || !navigator.credentials) {
    return { success: false, error: 'Credentials API not available', code: 'NOT_AVAILABLE' };
  }
  if (!window.PublicKeyCredential) {
    return { success: false, error: 'WebAuthn not supported', code: 'NOT_SUPPORTED' };
  }
  if (!checkSecureContext()) {
    return {
      success: false,
      error: 'WebAuthn requires a secure context (HTTPS or localhost)',
      code: 'INSECURE_CONTEXT',
    };
  }

  const challenge = generateDemoChallenge();
  const challengeBuffer = new Uint8Array(challenge).buffer as ArrayBuffer;

  const publicKeyOptions: PublicKeyCredentialRequestOptions = {
    challenge: challengeBuffer,
    rpId: DEMO_RP_ID,
    userVerification: 'required',
    allowCredentials: [], // discoverable credentials (passkey list)
    timeout: 60_000,
  };

  try {
    const credential = await navigator.credentials.get({
      publicKey: publicKeyOptions,
    });

    if (!credential || !(credential instanceof PublicKeyCredential)) {
      return {
        success: false,
        error: 'No credential returned (user may have cancelled)',
        code: 'CANCELLED',
      };
    }

    const response = credential.response as AuthenticatorAssertionResponse;
    const credentialId = btoa(String.fromCharCode(...new Uint8Array(credential.rawId)));
    const clientDataJSON = btoa(
      String.fromCharCode(...new Uint8Array(response.clientDataJSON))
    );
    const authenticatorData = btoa(
      String.fromCharCode(...new Uint8Array(response.authenticatorData))
    );
    const signature = btoa(String.fromCharCode(...new Uint8Array(response.signature)));
    const userHandle = response.userHandle
      ? btoa(String.fromCharCode(...new Uint8Array(response.userHandle)))
      : null;

    return {
      success: true,
      credentialId,
      clientDataJSON,
      authenticatorData,
      signature,
      userHandle,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const code =
      err instanceof Error && 'name' in err ? (err as { name?: string }).name : undefined;
    return {
      success: false,
      error: message,
      code: code ?? 'UNKNOWN',
    };
  }
}
