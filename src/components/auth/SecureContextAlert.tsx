interface SecureContextAlertProps {
  secure: boolean;
}

/** Shown on auth page when not in a secure context (WebAuthn requires HTTPS or localhost). */
export function SecureContextAlert({ secure }: SecureContextAlertProps) {
  if (secure) return null;
  return (
    <div
      className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50 px-4 py-3 text-sm text-amber-800 dark:text-amber-200"
      role="alert"
    >
      WebAuthn requires a secure context (HTTPS or localhost). Open this page via{' '}
      <code className="font-mono">http://localhost:5173</code> to try passkeys.
    </div>
  );
}
