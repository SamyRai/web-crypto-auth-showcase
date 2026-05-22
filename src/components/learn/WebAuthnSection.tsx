export function WebAuthnSection() {
  return (
    <section className="animate-fade-in-up">
      <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        Web Authentication API (WebAuthn)
      </h2>
      
      <div className="prose prose-stone dark:prose-invert max-w-none mb-8">
        <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-lg">
          WebAuthn is a W3C standard for <strong>public-key-based authentication</strong>.
          The browser talks to an <em>authenticator</em>—built into the device (Touch ID,
          Face ID, Windows Hello) or external (USB/NFC key). You do <strong>not</strong> get
          raw fingerprint data; the authenticator verifies the user and <strong>signs a
          challenge</strong> with a private key. The site only sees the signature and
          public key. This is phishing-resistant because the signature is bound to the
          origin.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-stone-900 transition-colors shadow-sm">
          <div className="font-mono text-sm text-pink-600 dark:text-pink-400 mb-2 font-semibold">
            navigator.credentials.create(publicKey)
          </div>
          <p className="text-stone-600 dark:text-stone-400 text-sm">
            Registers a new credential (key pair) and triggers the biometric/PIN prompt.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-stone-900 transition-colors shadow-sm">
          <div className="font-mono text-sm text-blue-600 dark:text-blue-400 mb-2 font-semibold">
            navigator.credentials.get(publicKey)
          </div>
          <p className="text-stone-600 dark:text-stone-400 text-sm">
            Authenticates the user by signing a challenge. Triggers the biometric/PIN prompt.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-stone-900 transition-colors shadow-sm">
          <div className="font-mono text-sm text-emerald-600 dark:text-emerald-400 mb-2 font-semibold">
            authenticatorAttachment: "platform"
          </div>
          <p className="text-stone-600 dark:text-stone-400 text-sm">
            Used alongside <code className="text-xs bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded text-stone-800 dark:text-stone-200">userVerification: "required"</code> to prefer the device's built-in biometrics.
          </p>
        </div>
      </div>
    </section>
  );
}
