/** Explains why Touch ID may not prompt (user must create passkey first). */
export function TouchIdNote() {
  return (
    <div
      className="rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/50 px-4 py-3 text-sm text-sky-900 dark:text-sky-100"
      role="note"
    >
      <p className="font-medium mb-1">Why didn’t Touch ID prompt?</p>
      <p className="text-sky-800 dark:text-sky-200">
        The system only has a passkey for this site if you’ve already <strong>created</strong> one.
        “Authenticate with passkey” looks up passkeys for this origin (e.g. <code className="font-mono text-xs">localhost</code>) in the
        device store (on Mac: iCloud Keychain). If there are <strong>none</strong>, there’s nothing to unlock — so no Touch ID.
        Create a passkey below first; then sign in will use Touch ID to unlock that key.
      </p>
    </div>
  );
}
