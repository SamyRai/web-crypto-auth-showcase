import { Link } from 'react-router-dom';

export function BrowserApisSection() {
  return (
    <section className="animate-fade-in-up">
      <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        </div>
        Browser APIs
      </h2>
      <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed mb-8">
        Modern browsers provide powerful native APIs for handling secrets, authentication, and user privacy without relying on external libraries.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Web Crypto API */}
        <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-stone-900 transition-colors shadow-sm flex flex-col h-full">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">Web Crypto API</h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm flex-1 mb-4 leading-relaxed">
            Native cryptography (<code className="font-mono text-xs px-1 rounded bg-stone-100 dark:bg-stone-800">SubtleCrypto</code>). Perform encryption, decryption, key derivation (PBKDF2, HKDF), hashing (SHA-256), and signing directly in the browser.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            <Link to="/encrypt" className="text-xs font-semibold px-3 py-1.5 bg-stone-900 text-white dark:bg-white dark:text-stone-900 rounded-lg hover:opacity-80 transition">AES Demo</Link>
            <Link to="/cert-chat" className="text-xs font-semibold px-3 py-1.5 bg-stone-900 text-white dark:bg-white dark:text-stone-900 rounded-lg hover:opacity-80 transition">RSA Demo</Link>
          </div>
        </div>

        {/* Credential Management API */}
        <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-stone-900 transition-colors shadow-sm flex flex-col h-full">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">Credential Management</h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm flex-1 mb-4 leading-relaxed">
            The <code className="font-mono text-xs px-1 rounded bg-stone-100 dark:bg-stone-800">navigator.credentials</code> API allows sites to ask the browser to save and autofill passwords or federated credentials seamlessly.
          </p>
          <div className="mt-auto">
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">Read MDN Docs →</a>
          </div>
        </div>

        {/* Storage Access API */}
        <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-stone-900 transition-colors shadow-sm flex flex-col h-full">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">Storage Access API</h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm flex-1 mb-4 leading-relaxed">
            Use <code className="font-mono text-xs px-1 rounded bg-stone-100 dark:bg-stone-800">document.requestStorageAccess()</code> to request unpartitioned cookie access for embedded iframes (like SSO widgets) in a privacy-first world.
          </p>
          <div className="mt-auto">
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">Read MDN Docs →</a>
          </div>
        </div>

        {/* Secure Context */}
        <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-stone-900 transition-colors shadow-sm flex flex-col h-full">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">Secure Context</h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm flex-1 mb-4 leading-relaxed">
            Powerful APIs (WebAuthn, Web Crypto, Credential Management) only execute over HTTPS or <code className="font-mono text-xs px-1 rounded bg-stone-100 dark:bg-stone-800">localhost</code>. Detect this via <code className="font-mono text-xs px-1 rounded bg-stone-100 dark:bg-stone-800">window.isSecureContext</code>.
          </p>
          <div className="mt-auto">
            <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">Read MDN Docs →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
