/**
 * Public-key encryption (RSA-OAEP) for the Cert/Chat demo.
 * Demonstrates key generation, public key exchange, and encrypt/decrypt.
 * RSA-OAEP with SHA-256; max plaintext ~190 bytes for 2048-bit key.
 *
 * Refs: MDN SubtleCrypto generateKey, encrypt, decrypt, exportKey, importKey.
 */

const RSA_MODULUS_LENGTH = 2048;
const RSA_PUBLIC_EXPONENT = new Uint8Array([0x01, 0x00, 0x01]);
const HASH_NAME = 'SHA-256';
const ALGORITHM_NAME = 'RSA-OAEP';
/** RSA-OAEP with 2048-bit and SHA-256: 256 - 2*32 - 2 = 190 bytes max plaintext */
export const RSA_OAEP_MAX_PLAINTEXT_BYTES = 190;

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

export interface RsaKeyPair {
  publicKey: CryptoKey;
  privateKey: CryptoKey;
}

const keyGenParams: RsaHashedKeyGenParams = {
  name: ALGORITHM_NAME,
  modulusLength: RSA_MODULUS_LENGTH,
  publicExponent: RSA_PUBLIC_EXPONENT,
  hash: HASH_NAME,
};

/**
 * Generate an RSA-OAEP key pair (2048-bit, SHA-256).
 * Keys are extractable so they can be exported for exchange.
 */
export async function generateRsaKeyPair(): Promise<RsaKeyPair> {
  const subtle = getCrypto();
  const pair = await subtle.generateKey(
    keyGenParams,
    true,
    ['encrypt', 'decrypt']
  );
  return { publicKey: pair.publicKey!, privateKey: pair.privateKey! };
}

/**
 * Export public key as SPKI (SubjectPublicKeyInfo), base64-encoded.
 * Safe to share; used for "key exchange" so others can encrypt to you.
 */
export async function exportPublicKeySpki(publicKey: CryptoKey): Promise<string> {
  const subtle = getCrypto();
  const spki = await subtle.exportKey('spki', publicKey);
  return arrayBufferToBase64(spki);
}

/**
 * Export private key as PKCS#8, base64-encoded.
 * Keep private; used only for decryption on the owning device.
 */
export async function exportPrivateKeyPkcs8(privateKey: CryptoKey): Promise<string> {
  const subtle = getCrypto();
  const pkcs8 = await subtle.exportKey('pkcs8', privateKey);
  return arrayBufferToBase64(pkcs8);
}

/**
 * Import a public key from base64 SPKI.
 * Use after receiving the recipient's public key (e.g. paste from other party).
 */
export async function importPublicKeySpki(spkiBase64: string): Promise<CryptoKey> {
  const subtle = getCrypto();
  const buffer = base64ToArrayBuffer(spkiBase64);
  return subtle.importKey(
    'spki',
    buffer,
    { name: ALGORITHM_NAME, hash: HASH_NAME },
    false,
    ['encrypt']
  );
}

/**
 * Import a private key from base64 PKCS#8.
 * Use to restore "my" key pair (e.g. from saved export) for decryption.
 */
export async function importPrivateKeyPkcs8(pkcs8Base64: string): Promise<CryptoKey> {
  const subtle = getCrypto();
  const buffer = base64ToArrayBuffer(pkcs8Base64);
  return subtle.importKey(
    'pkcs8',
    buffer,
    { name: ALGORITHM_NAME, hash: HASH_NAME },
    false,
    ['decrypt']
  );
}

/**
 * Encrypt plaintext with the recipient's public key.
 * Plaintext must be ≤ RSA_OAEP_MAX_PLAINTEXT_BYTES bytes (190 for 2048-bit).
 */
export async function encryptWithPublicKey(
  publicKey: CryptoKey,
  plaintext: string
): Promise<string> {
  const subtle = getCrypto();
  const enc = new TextEncoder();
  const data = enc.encode(plaintext);
  if (data.byteLength > RSA_OAEP_MAX_PLAINTEXT_BYTES) {
    throw new Error(
      `Plaintext too long: max ${RSA_OAEP_MAX_PLAINTEXT_BYTES} bytes for RSA-OAEP 2048`
    );
  }
  const ciphertext = await subtle.encrypt(
    { name: ALGORITHM_NAME },
    publicKey,
    data
  );
  return arrayBufferToBase64(ciphertext);
}

/**
 * Decrypt ciphertext (base64) with the private key.
 */
export async function decryptWithPrivateKey(
  privateKey: CryptoKey,
  ciphertextBase64: string
): Promise<string> {
  const subtle = getCrypto();
  const buffer = base64ToArrayBuffer(ciphertextBase64);
  const decrypted = await subtle.decrypt(
    { name: ALGORITHM_NAME },
    privateKey,
    buffer
  );
  return new TextDecoder().decode(decrypted);
}

/**
 * Produce a short fingerprint of a public key (SHA-256 of SPKI, first 12 chars base64).
 * For display in debug sidebar only; not a security guarantee.
 */
export async function publicKeyFingerprint(publicKey: CryptoKey): Promise<string> {
  const subtle = getCrypto();
  const spki = await subtle.exportKey('spki', publicKey);
  const hash = await subtle.digest('SHA-256', spki);
  const b64 = arrayBufferToBase64(hash);
  return b64.slice(0, 16);
}

export const PUBLIC_KEY_CRYPTO_CONSTANTS = {
  algorithm: ALGORITHM_NAME,
  hash: HASH_NAME,
  modulusLength: RSA_MODULUS_LENGTH,
  maxPlaintextBytes: RSA_OAEP_MAX_PLAINTEXT_BYTES,
} as const;
