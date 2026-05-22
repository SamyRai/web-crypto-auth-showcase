/**
 * Teaches browser APIs adjacent to auth & crypto: Clipboard, Permissions, PRF, randomUUID, SRI.
 */

export function AdjacentApisSection() {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
        6. Other cool browser APIs (adjacent to auth & crypto)
      </h2>
      <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">
        These APIs sit next to WebAuthn and Web Crypto: they’re about secure context, copying secrets,
        checking permissions, or deriving keys from passkeys.
      </p>
      <ul className="space-y-4 text-stone-600 dark:text-stone-400 text-sm">
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Clipboard API</strong>
          <p className="mt-1">
            <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">navigator.clipboard.writeText()</code> and{' '}
            <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">readText()</code> let you copy or paste text (e.g. a public key or ciphertext) without a user pressing Ctrl+C. Only available in a <strong>secure context</strong>; some browsers also require a user gesture for <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">readText()</code>. Great for “Copy to clipboard” buttons next to keys.
          </p>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API" target="_blank" rel="noopener noreferrer" className="text-xs underline mt-1 inline-block">MDN: Clipboard API</a>
        </li>
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Permissions API</strong>
          <p className="mt-1">
            <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">navigator.permissions.query(&#123; name: &apos;clipboard-read&apos; &#125;)</code> (or <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">'clipboard-write'</code>, <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">'notifications'</code>, etc.) returns a Promise with <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">state</code>: <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">'granted'</code>, <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">'denied'</code>, or <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">'prompt'</code>. Lets you check before calling a sensitive API and show the right UI. Not all permissions are queryable in every browser.
          </p>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API" target="_blank" rel="noopener noreferrer" className="text-xs underline mt-1 inline-block">MDN: Permissions API</a>
        </li>
        <li>
          <strong className="text-stone-800 dark:text-stone-200">WebAuthn PRF extension (passkey-backed encryption)</strong>
          <p className="mt-1">
            The <strong>PRF</strong> (pseudo-random function) extension lets a passkey derive a deterministic secret from a <em>salt</em>. The authenticator returns an HMAC-like output that you can use as an encryption key — so you can encrypt data “with the passkey” without the server or app ever seeing the key. Same passkey + same salt → same key (e.g. for vault decryption). Support: Chrome/Edge, Safari (recent), Android with Google Password Manager; not yet Windows Hello. Replaces the older <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">hmac-secret</code> CTAP2 extension at the WebAuthn level.
          </p>
          <a href="https://github.com/w3c/webauthn/wiki/Explainer:-PRF-extension" target="_blank" rel="noopener noreferrer" className="text-xs underline mt-1 inline-block">W3C: PRF extension</a>
          {' · '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API" target="_blank" rel="noopener noreferrer" className="text-xs underline">MDN: Web Authentication API</a>
        </li>
        <li>
          <strong className="text-stone-800 dark:text-stone-200">crypto.randomUUID()</strong>
          <p className="mt-1">
            Returns a random UUID v4 string (e.g. <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">a1b2c3d4-e5f6-7890-abcd-ef1234567890</code>). Uses a cryptographically secure RNG, like <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">crypto.getRandomValues()</code>. Handy for session IDs, nonces, or correlation IDs. Requires secure context. Widely supported.
          </p>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID" target="_blank" rel="noopener noreferrer" className="text-xs underline mt-1 inline-block">MDN: crypto.randomUUID()</a>
        </li>
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Subresource Integrity (SRI)</strong>
          <p className="mt-1">
            When you load a script or stylesheet from a CDN, add an <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">integrity</code> attribute with a hash (e.g. SHA-384). The browser checks that the fetched resource matches the hash; if not, it won’t execute it. Protects against a compromised or malicious CDN. Uses the same hash algorithms as Web Crypto (SHA-256, SHA-384, SHA-512).
          </p>
          <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity" target="_blank" rel="noopener noreferrer" className="text-xs underline mt-1 inline-block">MDN: Subresource Integrity</a>
        </li>
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Trusted Types</strong>
          <p className="mt-1">
            A CSP (Content Security Policy) feature to prevent DOM XSS: you create “trusted” wrappers for strings that get passed to sinks like <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">innerHTML</code> or <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">eval</code>. The browser only accepts Trusted Type objects in those sinks, so unsanitized user input can’t be injected. Complements auth and crypto by hardening the page against script injection.
          </p>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API" target="_blank" rel="noopener noreferrer" className="text-xs underline mt-1 inline-block">MDN: Trusted Types</a>
        </li>
      </ul>
    </section>
  );
}
