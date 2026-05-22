export function AdjacentApisSection() {
  return (
    <section className="animate-fade-in-up">
      <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-xl">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>
        </div>
        Adjacent APIs
      </h2>
      <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed mb-8">
        These APIs sit next to WebAuthn and Web Crypto: they’re about secure contexts, copying secrets, checking permissions, and cryptographic functions.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* WebAuthn PRF */}
        <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-stone-900 transition-colors shadow-sm">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">WebAuthn PRF Extension</h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 leading-relaxed">
            Derive a deterministic secret from a passkey. You can encrypt data "with the passkey" without the server seeing the key.
          </p>
          <a href="https://github.com/w3c/webauthn/wiki/Explainer:-PRF-extension" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-pink-600 dark:text-pink-400 hover:underline">Read Explainer →</a>
        </div>

        {/* crypto.randomUUID */}
        <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-stone-900 transition-colors shadow-sm">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">crypto.randomUUID()</h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 leading-relaxed">
            Returns a cryptographically secure random UUID v4 string. Perfect for session IDs, nonces, or correlation IDs.
          </p>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-pink-600 dark:text-pink-400 hover:underline">Read MDN Docs →</a>
        </div>

        {/* Clipboard API */}
        <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-stone-900 transition-colors shadow-sm">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">Clipboard API</h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 leading-relaxed">
            <code className="font-mono text-xs px-1 rounded bg-stone-100 dark:bg-stone-800">navigator.clipboard.writeText()</code> lets you copy public keys or ciphertext safely in secure contexts.
          </p>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-pink-600 dark:text-pink-400 hover:underline">Read MDN Docs →</a>
        </div>

        {/* Subresource Integrity */}
        <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-stone-900 transition-colors shadow-sm">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">Subresource Integrity (SRI)</h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 leading-relaxed">
            Add an <code className="font-mono text-xs px-1 rounded bg-stone-100 dark:bg-stone-800">integrity</code> attribute with a hash to protect against compromised CDNs for external scripts.
          </p>
          <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-pink-600 dark:text-pink-400 hover:underline">Read MDN Docs →</a>
        </div>
      </div>
    </section>
  );
}
