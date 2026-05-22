export function BestPracticesSection() {
  return (
    <section className="animate-fade-in-up">
      <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        Best Practices
      </h2>

      <div className="grid gap-4">
        <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 flex gap-4">
          <div className="shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <div>
            <strong className="block text-stone-900 dark:text-white mb-1">Challenge from server</strong>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              Always generate the challenge on the server (crypto random, ≥16 bytes). Never
              trust a client-generated challenge in production.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 flex gap-4">
          <div className="shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <div>
            <strong className="block text-stone-900 dark:text-white mb-1">Verify on server</strong>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              Send the assertion (credential id, clientDataJSON, authenticatorData,
              signature, userHandle) to your backend and verify the signature with the
              stored public key and challenge.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 flex gap-4">
          <div className="shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <div>
            <strong className="block text-stone-900 dark:text-white mb-1">Secure context</strong>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              WebAuthn only works over HTTPS (or <code className="font-mono text-xs bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded text-stone-800 dark:text-stone-200">localhost</code> for dev).
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 flex gap-4">
          <div className="shrink-0 mt-0.5 text-blue-600 dark:text-blue-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <div>
            <strong className="block text-stone-900 dark:text-white mb-1">Passkeys (discoverable credentials)</strong>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              Use <code className="font-mono text-xs bg-white dark:bg-black px-1.5 py-0.5 rounded text-stone-800 dark:text-stone-200">residentKey: "preferred"</code> or <code className="font-mono text-xs bg-white dark:bg-black px-1.5 py-0.5 rounded text-stone-800 dark:text-stone-200">"required"</code> and empty <code className="font-mono text-xs bg-white dark:bg-black px-1.5 py-0.5 rounded text-stone-800 dark:text-stone-200">allowCredentials</code> for
              username-less sign-in (user picks account after biometric).
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 flex gap-4">
          <div className="shrink-0 mt-0.5 text-red-600 dark:text-red-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div>
            <strong className="block text-stone-900 dark:text-white mb-1">Account Recovery & Fallbacks</strong>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-2">
              Losing all passkeys (e.g. losing your iCloud/Google account or hardware key) means permanent lockout. You must build robust recovery mechanisms like email magic links, hardware-backed recovery codes, or admin intervention.
            </p>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed font-semibold">
              Warning: Do not weaken passkeys by requiring insecure second factors like SMS 2FA. Passkeys are already phishing-resistant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
