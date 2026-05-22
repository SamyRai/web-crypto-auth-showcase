import { Link, useLocation } from 'react-router-dom';
import {
  PasskeyResultSection,
  WebAuthnSection,
  BestPracticesSection,
  CrossDeviceSection,
  MasterKeySection,
  BrowserApisSection,
  AdjacentApisSection,
  ReferencesSection,
} from '../components/learn';

interface LocationState {
  method?: 'passkey' | 'demo';
  credentialId?: string;
  payload?: unknown;
}

export function LearnPage() {
  const location = useLocation();
  const state = (location.state ?? {}) as LocationState;
  const authenticatedWithPasskey = state.method === 'passkey';

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10">
          <nav className="flex flex-wrap gap-3 text-sm text-stone-500 dark:text-stone-400">
            <Link to="/" className="hover:text-stone-700 dark:hover:text-stone-300">
              ← Home
            </Link>
            <Link to="/auth" className="underline hover:text-stone-700 dark:hover:text-stone-300">
              Auth
            </Link>
            <Link to="/encrypt" className="underline hover:text-stone-700 dark:hover:text-stone-300">
              Encrypt
            </Link>
            <Link to="/cert-chat" className="underline hover:text-stone-700 dark:hover:text-stone-300">
              Cert / Chat
            </Link>
          </nav>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            {authenticatedWithPasskey ? "You're signed in" : 'Learn'}
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            WebAuthn, passkeys, Web Crypto, and secure key storage.
          </p>
        </header>

        {authenticatedWithPasskey && state.credentialId && (
          <PasskeyResultSection credentialId={state.credentialId} />
        )}

        <WebAuthnSection />
        <BestPracticesSection />
        <CrossDeviceSection />
        <MasterKeySection />
        <BrowserApisSection />
        <AdjacentApisSection />
        <ReferencesSection />
      </div>
    </div>
  );
}
