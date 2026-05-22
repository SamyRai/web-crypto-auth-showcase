/**
 * Shown on the Learn page after successful passkey auth. Displays credential ID and UV note.
 */

interface PasskeyResultSectionProps {
  credentialId: string;
}

export function PasskeyResultSection({ credentialId }: PasskeyResultSectionProps) {
  return (
    <section className="mb-10 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6">
      <h2 className="text-lg font-medium text-stone-800 dark:text-stone-200">
        Passkey result
      </h2>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
        You authenticated with a passkey. The browser used the Web Authentication API
        to sign a challenge; your biometric (or PIN) unlocked the local key. In
        production, the challenge must come from your server and the assertion must be
        verified server-side.
      </p>
      <p className="mt-2 text-xs text-stone-600 dark:text-stone-400">
        User verification: <strong>required</strong> (requested for this demo). The assertion payload includes
        authenticatorData (flags) and signature.
      </p>
      <p className="mt-2 text-xs text-stone-500 dark:text-stone-500 font-mono break-all">
        Credential ID (base64): {credentialId}
      </p>
    </section>
  );
}
