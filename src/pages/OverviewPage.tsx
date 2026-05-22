import { Link } from 'react-router-dom';

const SECTIONS = [
  {
    title: 'Authenticate',
    description: 'Passkeys (WebAuthn): create and sign in with a device passkey. Touch ID, Face ID, or Windows Hello.',
    to: '/auth',
    label: 'Passkey demo',
  },
  {
    title: 'Encrypt & keys',
    description: 'Web Crypto in the browser: password-based encryption (PBKDF2 + AES-GCM), public-key exchange (RSA-OAEP), digest, sign/verify.',
    links: [
      { to: '/encrypt', label: 'Encrypt a secret' },
      { to: '/cert-chat', label: 'Cert / Chat (public key)' },
    ],
  },
  {
    title: 'Learn',
    description: 'Theory, best practices, cross-device passkeys, key storage, and references.',
    to: '/learn',
    label: 'Theory & references',
  },
] as const;

export function OverviewPage() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <header className="text-center mb-14">
          <h1 className="text-3xl font-semibold tracking-tight">
            web-crypto-auth-showcase
          </h1>
          <p className="mt-3 text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
            Passkeys (WebAuthn), Web Crypto (encryption, keys, hashing, signatures), and secure context.
            All demos run in the browser; no server required.
          </p>
        </header>

        <nav className="space-y-8" aria-label="Demo sections">
          {SECTIONS.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-stone-800 dark:text-stone-200">
                {section.title}
              </h2>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                {section.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {'to' in section ? (
                  <Link
                    to={section.to}
                    className="inline-flex items-center rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-sm font-medium px-4 py-2.5 hover:opacity-90 transition"
                  >
                    {section.label}
                  </Link>
                ) : (
                  section.links.map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      className="inline-flex items-center rounded-lg border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 text-sm font-medium px-4 py-2.5 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                    >
                      {label}
                    </Link>
                  ))
                )}
              </div>
            </section>
          ))}
        </nav>

        <p className="mt-10 text-center text-xs text-stone-500 dark:text-stone-400">
          Requires a secure context (HTTPS or{' '}
          <code className="font-mono bg-stone-200 dark:bg-stone-700 px-1 rounded">localhost</code>).
        </p>
      </div>
    </div>
  );
}
