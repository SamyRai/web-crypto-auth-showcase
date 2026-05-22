/**
 * Secure context detection for browser security APIs.
 * WebAuthn, Web Crypto, and Credential Management require HTTPS or localhost.
 * Single source of truth for the demo app.
 */

export function isSecureContext(): boolean {
  if (typeof window === 'undefined') return false;
  return window.isSecureContext;
}
