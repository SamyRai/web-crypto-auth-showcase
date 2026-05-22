/**
 * Digital signatures (RSA-PSS) for the Cert/Chat browser security demo.
 * Demonstrates sign/verify with Web Crypto; keys are ephemeral for the demo.
 *
 * Refs: MDN SubtleCrypto sign(), verify(), RSA-PSS, RsaPssParams.
 */

const ALGORITHM_NAME = 'RSA-PSS';
const HASH_NAME = 'SHA-256';
const MODULUS_LENGTH = 2048;
const PUBLIC_EXPONENT = new Uint8Array([0x01, 0x00, 0x01]);
/** Salt length in bytes; typically matches hash output (SHA-256 = 32). */
const SALT_LENGTH = 32;

function getCrypto(): SubtleCrypto {
  if (typeof crypto === 'undefined' || !crypto.subtle) {
    throw new Error('Web Crypto API (SubtleCrypto) is not available');
  }
  return crypto.subtle;
}

function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
  return btoa(String.fromCharCode(...bytes));
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export interface SigningKeyPair {
  publicKey: CryptoKey;
  privateKey: CryptoKey;
}

const keyGenParams: RsaHashedKeyGenParams = {
  name: ALGORITHM_NAME,
  modulusLength: MODULUS_LENGTH,
  publicExponent: PUBLIC_EXPONENT,
  hash: HASH_NAME,
};

/**
 * Generate an RSA-PSS key pair for signing/verification.
 */
export async function generateSigningKeyPair(): Promise<SigningKeyPair> {
  const subtle = getCrypto();
  const pair = await subtle.generateKey(keyGenParams, true, ['sign', 'verify']);
  return { publicKey: pair.publicKey!, privateKey: pair.privateKey! };
}

/**
 * Export public key as SPKI base64 (for display or exchange).
 */
export async function exportSigningPublicKeySpki(publicKey: CryptoKey): Promise<string> {
  const subtle = getCrypto();
  const spki = await subtle.exportKey('spki', publicKey);
  return arrayBufferToBase64(spki);
}

/**
 * Import a public key from base64 SPKI for verification.
 */
export async function importSigningPublicKeySpki(spkiBase64: string): Promise<CryptoKey> {
  const subtle = getCrypto();
  const buffer = base64ToArrayBuffer(spkiBase64);
  return subtle.importKey(
    'spki',
    buffer,
    { name: ALGORITHM_NAME, hash: HASH_NAME },
    false,
    ['verify']
  );
}

/**
 * Sign message with private key; returns signature as base64.
 */
export async function signMessage(privateKey: CryptoKey, message: string): Promise<string> {
  const subtle = getCrypto();
  const enc = new TextEncoder();
  const data = enc.encode(message);
  const signature = await subtle.sign(
    { name: ALGORITHM_NAME, saltLength: SALT_LENGTH },
    privateKey,
    data
  );
  return arrayBufferToBase64(signature);
}

/**
 * Verify signature (base64) against message using public key.
 */
export async function verifySignature(
  publicKey: CryptoKey,
  signatureBase64: string,
  message: string
): Promise<boolean> {
  const subtle = getCrypto();
  const enc = new TextEncoder();
  const data = enc.encode(message);
  const signatureBuffer = base64ToArrayBuffer(signatureBase64);
  return subtle.verify(
    { name: ALGORITHM_NAME, saltLength: SALT_LENGTH },
    publicKey,
    signatureBuffer,
    data
  );
}

export const SIGN_VERIFY_CONSTANTS = {
  algorithm: ALGORITHM_NAME,
  hash: HASH_NAME,
  modulusLength: MODULUS_LENGTH,
  saltLength: SALT_LENGTH,
} as const;
