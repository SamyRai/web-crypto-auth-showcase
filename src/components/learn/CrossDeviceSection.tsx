export function CrossDeviceSection() {
  return (
    <section className="animate-fade-in-up">
      <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </div>
        Cross-Device Passkeys
      </h2>
      <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed mb-8">
        The same WebAuthn flow works on Mac, Windows, Android, and iOS. But whether you can use <strong>one passkey with biometrics across different devices</strong> depends on <strong>where the passkey is stored</strong>.
      </p>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M12 2v20"/><path d="m4.9 4.9 14.2 14.2"/><path d="m4.9 19.1 14.2-14.2"/></svg>
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-3">Synced Passkeys</h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
            Stored in a credential manager that syncs (e.g. Google Password Manager, Apple Keychain, 1Password). One passkey syncs to all devices, and each device uses its own biometric to unlock it.
          </p>
          <div className="mt-4 text-xs font-semibold px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 inline-block rounded-lg">
            Best for "Bio on multiple devices"
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-3">Device-bound Passkeys</h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
            Stored only on one physical device (e.g. YubiKey or a TPM-bound credential). They do not sync. To sign in on another device, you need the physical key or a completely separate passkey.
          </p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
        <h4 className="font-semibold text-stone-900 dark:text-white mb-2">Developer Note</h4>
        <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
          As a developer, you don't change your code. The <code className="font-mono text-xs px-1 rounded bg-white dark:bg-black">create</code> and <code className="font-mono text-xs px-1 rounded bg-white dark:bg-black">get</code> flows are identical. The user's OS and credential manager determine how the passkey is stored. If a device has no passkey, the OS will naturally fall back to offering a QR code for cross-device authentication.
        </p>
      </div>
    </section>
  );
}
