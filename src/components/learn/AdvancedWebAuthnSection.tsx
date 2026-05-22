export function AdvancedWebAuthnSection() {
  return (
    <section className="animate-fade-in-up">
      <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        Advanced WebAuthn (L3)
      </h2>
      <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed mb-8 max-w-3xl">
        "Level 3" of the WebAuthn spec introduces powerful new capabilities that move passkeys from a simple 2FA alternative to a foundational pillar of web security and user experience.
      </p>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Conditional UI */}
        <div className="p-8 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-black/40 backdrop-blur-sm shadow-lg shadow-stone-200/50 dark:shadow-black/50 flex flex-col hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-indigo-600 dark:text-indigo-400 p-2.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl shadow-sm border border-indigo-100 dark:border-indigo-800/50">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white tracking-tight">Conditional UI (Autofill)</h3>
          </div>
          <div className="space-y-4 flex-1">
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-loose">
              Conditional UI makes passkeys feel exactly like saved passwords. By passing <code className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700">mediation: "conditional"</code> to <code className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700">navigator.credentials.get()</code>, the browser waits quietly in the background.
            </p>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-loose">
              When the user taps a username input field (decorated with <code className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700">autocomplete="webauthn"</code>), the browser displays their passkeys directly in the native autofill dropdown.
            </p>
          </div>
          <div className="mt-6 p-4 bg-stone-100 dark:bg-stone-900 rounded-2xl text-[11px] font-mono text-stone-700 dark:text-stone-300 overflow-x-auto border border-stone-200 dark:border-stone-800 shadow-inner">
            {`<input 
  type="text" 
  name="username" 
  autocomplete="username webauthn" 
/>`}
          </div>
        </div>

        {/* PRF Extension */}
        <div className="p-8 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-black/40 backdrop-blur-sm shadow-lg shadow-stone-200/50 dark:shadow-black/50 flex flex-col hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-indigo-600 dark:text-indigo-400 p-2.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl shadow-sm border border-indigo-100 dark:border-indigo-800/50">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white tracking-tight">PRF Extension (Encryption)</h3>
          </div>
          <div className="space-y-4 flex-1">
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-loose">
              The Pseudo-Random Function (PRF) extension enables <strong className="text-stone-900 dark:text-stone-100 font-semibold">End-to-End Encryption (E2EE) bound to a passkey</strong>. Instead of just returning a signature to prove identity, the authenticator derives a deterministic, symmetric secret key using the passkey material and a salt you provide. 
            </p>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-loose">
              This means you can decrypt local vaults (like a password manager) or user data purely by asking the user to authenticate with their passkey, completely removing the need for a master password.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 rounded-3xl bg-indigo-50/80 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800/40 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-[0.03] dark:opacity-10 pointer-events-none">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        </div>
        <div className="relative z-10">
          <h4 className="font-bold text-base text-indigo-900 dark:text-indigo-300 mb-3 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Implementation Tip
          </h4>
          <p className="text-indigo-800/80 dark:text-indigo-200/70 text-sm leading-loose max-w-4xl">
            Because PRF keys are tied to a specific passkey, if a user has multiple passkeys (e.g., a phone and a YubiKey), you must handle key rotation and synchronization across those credentials. Usually, the PRF output is used to decrypt an intermediate Master Key, which in turn decrypts the actual data.
          </p>
        </div>
      </div>
    </section>
  );
}
