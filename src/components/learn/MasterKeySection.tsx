export function MasterKeySection() {
  return (
    <section className="animate-fade-in-up">
      <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/></svg>
        </div>
        Master Key Storage
      </h2>
      <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed mb-8">
        For applications that must protect a master encryption key or Vault, adhering to strict zero-knowledge protocols is critical.
      </p>

      <div className="space-y-4">
        <div className="p-5 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 flex gap-4">
          <div className="shrink-0 mt-0.5 text-red-600 dark:text-red-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <div>
            <strong className="block text-stone-900 dark:text-white mb-1">Never store plaintext keys</strong>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              Never store the master key in plaintext inside configuration, environment variables, or source code. Prefer OS keychains, HSMs, or cloud KMS.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 shadow-sm flex gap-4">
          <div className="shrink-0 mt-0.5 text-stone-900 dark:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <div>
            <strong className="block text-stone-900 dark:text-white mb-1">Web / Zero-knowledge</strong>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              Derive the key in the browser from the user password using a strong KDF (like PBKDF2). Optionally cache an encrypted version of this key in IndexedDB, and use WebAuthn as a second factor to release it.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 shadow-sm flex gap-4">
          <div className="shrink-0 mt-0.5 text-stone-900 dark:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
          </div>
          <div>
            <strong className="block text-stone-900 dark:text-white mb-1">Desktop & Mobile</strong>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              Store the key or Key Encryption Key (KEK) inside the native OS Keychain/Keystore. Require biometric authentication (Touch ID, Face ID, Windows Hello) to access it.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 shadow-sm flex gap-4">
          <div className="shrink-0 mt-0.5 text-stone-900 dark:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
          </div>
          <div>
            <strong className="block text-stone-900 dark:text-white mb-1">How Password Managers Work</strong>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              Products like Bitwarden and 1Password do <strong>not</strong> store the master password anywhere. The encryption key is derived from it locally and exists only in memory while the vault is unlocked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
