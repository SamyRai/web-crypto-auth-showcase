/**
 * HKDF key derivation for the Security tab demo.
 * Use for high-entropy secrets (e.g. ECDH output); not for passwords — use PBKDF2.
 *
 * Refs: MDN SubtleCrypto.deriveBits, HkdfParams, RFC 5869.
 */

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

/**
 * Derive bytes using HKDF-SHA256.
 * @param secretUtf8 - Input secret (high-entropy; not a password).
 * @param saltB64 - Optional salt (base64); if empty, uses zero-length.
 * @param infoUtf8 - Optional context info (e.g. "session-v1").
 * @param lengthBits - Output length in bits (default 256).
 */
export async function deriveBitsHKDF(
  secretUtf8: string,
  saltB64: string = '',
  infoUtf8: string = '',
  lengthBits: number = 256
): Promise<string> {
  const subtle = getCrypto();
  const enc = new TextEncoder();
  const key = await subtle.importKey(
    'raw',
    enc.encode(secretUtf8),
    'HKDF',
    false,
    ['deriveBits']
  );
  const salt = saltB64.trim()
    ? new Uint8Array(Array.from(atob(saltB64.trim())).map((c) => c.charCodeAt(0)))
    : new Uint8Array(0);
  const info = enc.encode(infoUtf8);
  const bits = await subtle.deriveBits(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: salt.buffer,
      info,
    },
    key,
    lengthBits
  );
  return arrayBufferToBase64(bits);
}
