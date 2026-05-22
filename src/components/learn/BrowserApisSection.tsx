import { Link } from 'react-router-dom';

export function BrowserApisSection() {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
        5. More auth, secrets & privacy APIs (browsers)
      </h2>
      <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">
        Other browser APIs relevant to secrets, auth, and privacy that you can learn and use:
      </p>
      <ul className="space-y-3 text-stone-600 dark:text-stone-400 text-sm">
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Web Crypto API (SubtleCrypto)</strong> — Encryption, decryption, key derivation (PBKDF2, HKDF), hashing (SHA-256), signing. Used for password-based encryption and vault-style &quot;derive key from password, encrypt data.&quot; Demos: <Link to="/encrypt" className="underline hover:text-stone-900 dark:hover:text-stone-200">Encrypt a secret</Link> (password + AES-GCM), <Link to="/cert-chat" className="underline hover:text-stone-900 dark:hover:text-stone-200">Cert / Chat</Link> (public-key encrypt/decrypt, digest, sign/verify). Refs: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" target="_blank" rel="noopener noreferrer" className="underline">MDN</a>, <a href="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" target="_blank" rel="noopener noreferrer" className="underline">OWASP Password Storage</a>.
        </li>
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Credential Management API</strong> — <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">navigator.credentials.store()</code> / <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">get()</code> for password and federated credentials (in addition to WebAuthn). Lets the site ask the browser to save or autofill passwords. Requires secure context; not supported in Firefox. <a href="https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API" target="_blank" rel="noopener noreferrer" className="underline">MDN</a>.
        </li>
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Storage Access API</strong> — <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">document.requestStorageAccess()</code> / <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">hasStorageAccess()</code>. Lets embedded content (e.g. iframes) request access to unpartitioned cookies/storage when the browser blocks third-party cookies for privacy. Used for legitimate embeds (SSO, widgets) while limiting cross-site tracking. <a href="https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API" target="_blank" rel="noopener noreferrer" className="underline">MDN</a>, <a href="https://privacysandbox.google.com/cookies/storage-access-api" target="_blank" rel="noopener noreferrer" className="underline">Privacy Sandbox</a>.
        </li>
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Secure context</strong> — Many of these APIs (WebAuthn, Web Crypto, Credential Management) only work in secure contexts (HTTPS or <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">localhost</code>). Check with <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">window.isSecureContext</code>. <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts" target="_blank" rel="noopener noreferrer" className="underline">MDN</a>.
        </li>
      </ul>
    </section>
  );
}
