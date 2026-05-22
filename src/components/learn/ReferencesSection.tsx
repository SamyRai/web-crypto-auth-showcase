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
    <section className="animate-fade-in-up">
      <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-xl">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
        </div>
        References & Reading
      </h2>

      <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm p-6">
        <ul className="flex flex-col gap-3">
          {REFERENCES.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
              >
                <div className="shrink-0 text-stone-400 dark:text-stone-600 group-hover:text-blue-500 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                </div>
                <span className="text-sm font-medium border-b border-transparent group-hover:border-current transition-colors">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
