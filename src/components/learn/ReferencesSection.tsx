const REFERENCES = [
  { href: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API', label: 'Web Authentication API (MDN)' },
  { href: 'https://www.w3.org/TR/webauthn-3/', label: 'W3C WebAuthn Level 3' },
  { href: 'https://developer.mozilla.org/en-US/docs/Web/Security/Authentication/Passkeys', label: 'Passkeys (MDN)' },
  { href: 'https://passkeycentral.org/introduction-to-passkeys/passkey-types', label: 'Passkey types: synced vs device-bound (Passkey Central)' },
  { href: 'https://developers.google.com/identity/passkeys/supported-environments', label: 'Passkey support on Android and Chrome (Google)' },
  { href: 'https://passkeycentral.org/design-guidelines/optional-patterns/cross-device-sign-in', label: 'Cross-device sign-in (Passkey Central)' },
  { href: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API', label: 'Web Crypto API (MDN)' },
  { href: 'https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API', label: 'Credential Management API (MDN)' },
  { href: 'https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API', label: 'Storage Access API (MDN)' },
  { href: 'https://cheatsheetseries.owasp.org/cheatsheets/Key_Management_Cheat_Sheet.html', label: 'OWASP Key Management Cheat Sheet' },
] as const;

export function ReferencesSection() {
  return (
    <section className="rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-100/50 dark:bg-stone-800/30 p-6">
      <h2 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-2">
        References
      </h2>
      <ul className="text-sm text-stone-600 dark:text-stone-400 space-y-1">
        {REFERENCES.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-stone-900 dark:hover:text-stone-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
