import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useSecureContext,
  useWebAuthnSupport,
  usePasskeyRegistration,
  usePasskeyAuth,
} from '../hooks';
import {
  SecureContextAlert,
  WebAuthnSupportAlert,
  PasskeyCreateSection,
  PasskeyAuthSection,
  TouchIdNote,
  AuthNav,
} from '../components/auth';

const DEFAULT_USER_NAME = 'demo@localhost';

/** Auth route: passkey create and sign-in. */
export function AuthPage() {
  const navigate = useNavigate();
  const secure = useSecureContext();
  const support = useWebAuthnSupport();
  const registration = usePasskeyRegistration();
  const auth = usePasskeyAuth();

  const [userName, setUserName] = useState(DEFAULT_USER_NAME);

  const handleRegister = () => registration.register(userName);
  const handleViewLearn = () => navigate('/learn', { state: { method: 'demo' } });

  const canUsePasskey = support.supported && secure;

  useEffect(() => {
    if (support.conditionalMediation && canUsePasskey) {
      auth.authenticate(true).catch(console.error);
    }
  }, [support.conditionalMediation, canUsePasskey, auth, auth.authenticate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans selection:bg-blue-500/30 p-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      
      <main className="w-full max-w-md flex flex-col gap-8 animate-fade-in-up">
        <header className="text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-stone-900 to-stone-600 dark:from-white dark:to-stone-400">
            Passkey Magic
          </h1>
          <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
            Experience the fastest, most secure way to sign in using your device's built-in biometrics.
          </p>
        </header>

        <TouchIdNote />

        <div className="flex flex-col gap-6 rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/50 backdrop-blur-xl p-8 shadow-2xl shadow-stone-200/50 dark:shadow-black/50">
          <SecureContextAlert secure={secure} />
          <WebAuthnSupportAlert support={support} />

          <div className="space-y-6">
            <PasskeyCreateSection
              userName={userName}
              onUserNameChange={setUserName}
              onRegister={handleRegister}
              status={registration.status}
              message={registration.message}
              disabled={registration.status === 'loading' || !canUsePasskey}
              defaultUserName={DEFAULT_USER_NAME}
            />

            <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-200 dark:via-stone-700 to-transparent"></div>

            <PasskeyAuthSection
              onAuthenticate={() => auth.authenticate()}
              status={auth.status}
              disabled={auth.status === 'loading' || !canUsePasskey}
              conditionalSupported={support.conditionalMediation}
            />
          </div>

          <AuthNav onViewLearn={handleViewLearn} />
        </div>

        {auth.status === 'error' && auth.message && (
          <div
            className="rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/80 dark:bg-red-950/50 backdrop-blur-sm px-5 py-4 text-sm text-red-800 dark:text-red-200 shadow-sm animate-fade-in-up"
            role="alert"
          >
            <div className="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
              <p>{auth.message}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
