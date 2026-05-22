import { Link } from 'react-router-dom';

export function EncryptTheorySection() {
  return (
    <section className="rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-100/50 dark:bg-stone-800/30 p-6">
      <h2 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-2">
        Theory & best practices
      </h2>
      <ul className="text-sm text-stone-600 dark:text-stone-400 space-y-2">
        <li><strong className="text-stone-800 dark:text-stone-200">PBKDF2</strong> — Key derivation from a password; salt (random, stored) and high iterations slow down brute force. OWASP recommends 600k+ for PBKDF2-HMAC-SHA256; Argon2 is preferred for new systems where available (not in Web Crypto).</li>
        <li><strong className="text-stone-800 dark:text-stone-200">AES-GCM</strong> — Authenticated encryption: confidentiality and integrity. IV must be unique per encryption (we use 12 random bytes). Reusing the same IV with the same key breaks confidentiality.</li>
        <li><strong className="text-stone-800 dark:text-stone-200">Secure context</strong> — Web Crypto only works over HTTPS or localhost.</li>
        <li><strong className="text-stone-800 dark:text-stone-200">Vault-style</strong> — Password managers derive a key from the master password (KDF), encrypt the vault with that key; key exists only in memory. See <Link to="/learn" className="underline">Learn</Link> for master key storage.</li>
      </ul>
      <p className="mt-3 text-xs text-stone-500 dark:text-stone-500">
        Refs: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" target="_blank" rel="noopener noreferrer" className="underline">Web Crypto API (MDN)</a>,{' '}
        <a href="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" target="_blank" rel="noopener noreferrer" className="underline">OWASP Password Storage</a>.
      </p>
    </section>
  );
}
