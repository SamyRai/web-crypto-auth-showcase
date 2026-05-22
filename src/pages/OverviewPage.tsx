import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';

const SECTIONS = [
  {
    title: 'Authenticate',
    description: 'Passkeys (WebAuthn): create and sign in with a device passkey. Touch ID, Face ID, or Windows Hello.',
    to: '/auth',
    label: 'Passkey demo',
    accent: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Encrypt & keys',
    description: 'Web Crypto in the browser: password-based encryption (PBKDF2 + AES-GCM), public-key exchange (RSA-OAEP), digest, sign/verify.',
    links: [
      { to: '/encrypt', label: 'Encrypt a secret' },
      { to: '/cert-chat', label: 'Cert / Chat (public key)' },
    ],
    accent: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Learn',
    description: 'Theory, best practices, cross-device passkeys, key storage, and references.',
    to: '/learn',
    label: 'Theory & references',
    accent: 'from-emerald-400 to-teal-500',
  },
] as const;

export function OverviewPage() {
  return (
    <div className="min-h-screen text-stone-900 dark:text-stone-100 font-sans selection:bg-blue-500/30">
      <SEO 
        title="Home" 
        description="WebAuthn and Web Crypto API showcase. Learn how passkeys and cryptography work in the browser."
        canonical="https://SamyRai.github.io/web-crypto-auth-showcase/"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "WebAuthn & Web Crypto Showcase",
          "applicationCategory": "EducationalApplication",
          "description": "Passkeys (WebAuthn), Web Crypto (encryption, keys, hashing, signatures), and secure context demos."
        })}
      />
      <div className="max-w-3xl mx-auto px-6 py-20 animate-fade-in-up">
        <header className="text-center mb-16 relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full scale-150 opacity-50 dark:opacity-30"></div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-stone-800 to-stone-500 dark:from-white dark:to-stone-400 mb-4 pb-2">
            web-crypto-auth-showcase
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Passkeys (WebAuthn), Web Crypto (encryption, keys, hashing, signatures), and secure context.
            All demos run securely in the browser; no server required.
          </p>
        </header>

        <nav className="grid gap-6 md:grid-cols-1" aria-label="Demo sections">
          {SECTIONS.map((section, idx) => (
            <section
              key={section.title}
              className="group relative overflow-hidden rounded-3xl border border-white/20 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-xl p-8 shadow-2xl shadow-stone-200/50 dark:shadow-black/50 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-black/60"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${section.accent} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
              <h2 className="text-2xl font-bold text-stone-800 dark:text-white mb-3">
                {section.title}
              </h2>
              <p className="text-stone-600 dark:text-stone-300 mb-6 leading-relaxed">
                {section.description}
              </p>
              <div className="flex flex-wrap gap-4">
                {'to' in section ? (
                  <Link
                    to={section.to}
                    className="inline-flex items-center justify-center rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-semibold px-6 py-3 transition-transform duration-200 hover:scale-[1.02] active:scale-95 shadow-md"
                  >
                    {section.label}
                  </Link>
                ) : (
                  section.links.map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      className="inline-flex items-center justify-center rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/50 text-stone-800 dark:text-stone-200 text-sm font-semibold px-6 py-3 transition-all duration-200 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-900 active:scale-95"
                    >
                      {label}
                    </Link>
                  ))
                )}
              </div>
            </section>
          ))}
        </nav>

        <p className="mt-16 text-center text-sm text-stone-500 dark:text-stone-400 flex items-center justify-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          Requires a secure context (HTTPS or <code className="font-mono bg-stone-200/50 dark:bg-stone-800/50 px-1.5 py-0.5 rounded text-xs">localhost</code>).
        </p>
      </div>
    </div>
  );
}
