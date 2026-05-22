export function BestPracticesSection() {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
        2. Best practices
      </h2>
      <ul className="space-y-3 text-stone-600 dark:text-stone-400 text-sm">
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Challenge from server:</strong>{' '}
          Always generate the challenge on the server (crypto random, ≥16 bytes). Never
          trust a client-generated challenge in production.
        </li>
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Verify on server:</strong>{' '}
          Send the assertion (credential id, clientDataJSON, authenticatorData,
          signature, userHandle) to your backend and verify the signature with the
          stored public key and challenge.
        </li>
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Secure context:</strong>{' '}
          WebAuthn only works over HTTPS (or <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">localhost</code> for dev).
        </li>
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Passkeys (discoverable credentials):</strong>{' '}
          Use <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">residentKey: &quot;preferred&quot;</code> or{' '}
          <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">&quot;required&quot;</code> and empty{' '}
          <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">allowCredentials</code> for
          username-less sign-in (user picks account after biometric).
        </li>
      </ul>
    </section>
  );
}
