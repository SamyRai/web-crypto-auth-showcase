import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  PasskeyResultSection,
  WebAuthnSection,
  AdvancedWebAuthnSection,
  BestPracticesSection,
  CrossDeviceSection,
  MasterKeySection,
  BrowserApisSection,
  AdjacentApisSection,
  ReferencesSection,
} from '../components/learn';
import { SEO } from '../components/seo/SEO';

interface LocationState {
  method?: 'passkey' | 'demo';
  credentialId?: string;
  payload?: unknown;
}

const TABS = [
  { id: 'webauthn', label: '1. WebAuthn Basics', component: WebAuthnSection },
  { id: 'advanced-webauthn', label: '2. Advanced WebAuthn (L3)', component: AdvancedWebAuthnSection },
  { id: 'best-practices', label: '3. Best Practices', component: BestPracticesSection },
  { id: 'cross-device', label: '4. Cross-Device Passkeys', component: CrossDeviceSection },
  { id: 'master-key', label: '5. The Master Key Problem', component: MasterKeySection },
  { id: 'browser-apis', label: '6. Browser APIs', component: BrowserApisSection },
  { id: 'adjacent-apis', label: '7. Adjacent APIs', component: AdjacentApisSection },
  { id: 'references', label: '8. References', component: ReferencesSection },
];

export function LearnPage() {
  const location = useLocation();
  const state = (location.state ?? {}) as LocationState;
  const authenticatedWithPasskey = state.method === 'passkey';
  
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component || WebAuthnSection;

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30 text-stone-900 dark:text-stone-100 relative overflow-hidden">
      <SEO 
        title="Learn WebAuthn & Web Crypto" 
        description="Dive deep into WebAuthn, passkeys, Web Crypto, and secure key storage through interactive documentation."
        canonical="https://SamyRai.github.io/web-crypto-auth-showcase/learn"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-stone-50 to-stone-100 dark:from-blue-900/10 dark:via-black dark:to-black"></div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12 animate-fade-in-up">
          <nav className="flex flex-wrap items-center gap-3 text-sm text-stone-500 dark:text-stone-400 mb-6">
            <Link to="/" className="flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-200 transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Home
            </Link>
            <span className="text-stone-300 dark:text-stone-700">/</span>
            <Link to="/auth" className="hover:text-stone-900 dark:hover:text-stone-200 transition">Auth</Link>
            <span className="text-stone-300 dark:text-stone-700">/</span>
            <Link to="/encrypt" className="hover:text-stone-900 dark:hover:text-stone-200 transition">Encrypt</Link>
            <span className="text-stone-300 dark:text-stone-700">/</span>
            <Link to="/cert-chat" className="hover:text-stone-900 dark:hover:text-stone-200 transition">Cert / Chat</Link>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-stone-900 to-stone-500 dark:from-white dark:to-stone-400">
            {authenticatedWithPasskey ? "You're signed in" : 'Learn & Explore'}
          </h1>
          <p className="mt-4 text-lg text-stone-600 dark:text-stone-400 max-w-2xl">
            Dive deep into WebAuthn, passkeys, Web Crypto, and secure key storage through interactive documentation.
          </p>
        </header>

        {authenticatedWithPasskey && state.credentialId && (
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <PasskeyResultSection credentialId={state.credentialId} />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {/* Sidebar Navigation */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-8 rounded-2xl border border-white/50 dark:border-white/5 bg-white/60 dark:bg-black/40 backdrop-blur-xl p-3 shadow-xl shadow-stone-200/50 dark:shadow-black/50">
              <nav className="flex flex-col gap-1">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive 
                          ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-lg scale-[1.02]' 
                          : 'text-stone-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-900 hover:text-stone-900 dark:hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content Pane */}
          <main className="flex-1 min-w-0">
            <div className="rounded-3xl border border-white/50 dark:border-white/5 bg-white/70 dark:bg-black/40 backdrop-blur-2xl p-6 md:p-10 shadow-2xl shadow-stone-200/50 dark:shadow-black/50 min-h-[500px] animate-fade-in-up" key={activeTab}>
              <ActiveComponent />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
