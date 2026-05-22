/**
 * Web Crypto API: password-based encryption (PBKDF2 + AES-GCM).
 * For demo/education only. In production use a server-side KDF (e.g. Argon2) for
 * password hashing and key derivation where possible.
 *
 * Refs: MDN SubtleCrypto, OWASP Password Storage, NIST SP 800-132.
 */

const PBKDF2_ITERATIONS = 310_000; // OWASP 2023+ recommendation range for SHA-256
const SALT_LENGTH = 16;
const IV_LENGTH = 12; // 96 bits for AES-GCM
const KEY_LENGTH = 256;

function getCrypto(): SubtleCrypto {
  if (typeof crypto === 'undefined' || !crypto.subtle) {
    throw new Error('Web Crypto API (SubtleCrypto) is not available');
  }
  return crypto.subtle;
}

/**
 * Derive an AES-GCM key from a password using PBKDF2.
 * Salt should be random and stored with the ciphertext (not secret).
 */
export async function deriveKeyFromPassword(
  password: string,
  salt: Uint8Array,
  iterations: number = PBKDF2_ITERATIONS
): Promise<CryptoKey> {
  const subtle = getCrypto();
  const enc = new TextEncoder();
  const keyMaterial = await subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );
  const saltBuffer = new Uint8Array(salt).buffer as ArrayBuffer;
  return subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt plaintext with a password. Returns ciphertext, salt, and iv (all base64).
 * Salt and IV are random; store them with the ciphertext — they are not secret.
 */
export interface EncryptResult {
  ciphertextBase64: string;
  saltBase64: string;
  ivBase64: string;
  iterations: number;
}

export async function encryptWithPassword(
  password: string,
  plaintext: string,
  iterations: number = PBKDF2_ITERATIONS
): Promise<EncryptResult> {
  if (!password) throw new Error('Password is required');
  const subtle = getCrypto();
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await deriveKeyFromPassword(password, salt, iterations);
  const enc = new TextEncoder();
  const ivBuffer = new Uint8Array(iv).buffer as ArrayBuffer;
  const plainBytes = enc.encode(plaintext);
  const ciphertext = await subtle.encrypt(
    { name: 'AES-GCM', iv: ivBuffer },
    key,
    plainBytes
  );
  return {
    ciphertextBase64: arrayBufferToBase64(ciphertext as ArrayBuffer),
    saltBase64: arrayBufferToBase64(salt),
    ivBase64: arrayBufferToBase64(iv),
    iterations,
  };
}

/**
 * Decrypt ciphertext (base64) with password, using stored salt and iv (base64).
 */
export async function decryptWithPassword(
  password: string,
  ciphertextBase64: string,
  saltBase64: string,
  ivBase64: string,
  iterations: number = PBKDF2_ITERATIONS
): Promise<string> {
  if (!password) throw new Error('Password is required');
  const subtle = getCrypto();
  const salt = base64ToUint8Array(saltBase64);
  const iv = base64ToUint8Array(ivBase64);
  const ciphertext = base64ToArrayBuffer(ciphertextBase64);
  const key = await deriveKeyFromPassword(password, salt, iterations);
  const ivBuffer = new Uint8Array(iv).buffer as ArrayBuffer;
  const decrypted = await subtle.decrypt(
    { name: 'AES-GCM', iv: ivBuffer },
    key,
    ciphertext
  );
  return new TextDecoder().decode(decrypted);
}

/**
 * Hash a message with SHA-256 (integrity fingerprint; not for passwords).
 */
export async function sha256Fingerprint(message: string): Promise<string> {
  const subtle = getCrypto();
  const enc = new TextEncoder();
  const bytes = enc.encode(message);
  const digest = await subtle.digest('SHA-256', bytes.buffer as ArrayBuffer);
  return arrayBufferToBase64(digest);
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

function base64ToUint8Array(base64: string): Uint8Array {
  return new Uint8Array(base64ToArrayBuffer(base64));
}

export const WEB_CRYPTO_CONSTANTS = {
  PBKDF2_ITERATIONS,
  SALT_LENGTH,
  IV_LENGTH,
  KEY_LENGTH,
} as const;
