import { useState } from 'react';
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 p-6">
      <main className="w-full max-w-md flex flex-col gap-8">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Passkey demo
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400 text-sm">
            Sign in with your device passkey (Touch ID, Face ID, or Windows Hello)
          </p>
        </header>

        <TouchIdNote />

        <div className="flex flex-col gap-4">
          <SecureContextAlert secure={secure} />
          <WebAuthnSupportAlert support={support} />

          <PasskeyCreateSection
            userName={userName}
            onUserNameChange={setUserName}
            onRegister={handleRegister}
            status={registration.status}
            message={registration.message}
            disabled={registration.status === 'loading' || !canUsePasskey}
            defaultUserName={DEFAULT_USER_NAME}
          />

          <PasskeyAuthSection
            onAuthenticate={auth.authenticate}
            status={auth.status}
            disabled={auth.status === 'loading' || !canUsePasskey}
          />

          <AuthNav onViewLearn={handleViewLearn} />
        </div>

        {auth.status === 'error' && auth.message && (
          <div
            className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50 px-4 py-3 text-sm text-red-800 dark:text-red-200"
            role="alert"
          >
            {auth.message}
          </div>
        )}
      </main>
    </div>
  );
}
