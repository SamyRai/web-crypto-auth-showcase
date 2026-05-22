import type { WebAuthnSupport } from '../../lib/webauthn';

interface WebAuthnSupportAlertProps {
  support: WebAuthnSupport;
}

/** Shown on auth page when the browser does not support WebAuthn. */
export function WebAuthnSupportAlert({ support }: WebAuthnSupportAlertProps) {
  if (support.supported) return null;
  return (
    <div
      className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50 px-4 py-3 text-sm text-red-800 dark:text-red-200"
      role="alert"
    >
      This browser does not support WebAuthn / passkeys.
    </div>
  );
}
