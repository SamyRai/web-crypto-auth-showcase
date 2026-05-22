import { useState } from 'react';
import type { AuthStatus } from '../../hooks/usePasskeyAuth';

interface PasskeyAuthSectionProps {
  onAuthenticate: () => void;
  status: AuthStatus;
  disabled: boolean;
  conditionalSupported?: boolean;
}

export function PasskeyAuthSection({
  onAuthenticate,
  status,
  disabled,
  conditionalSupported,
}: PasskeyAuthSectionProps) {
  const [loginUser, setLoginUser] = useState('');
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
        Step 2: Sign in with that passkey
      </p>
      {conditionalSupported && (
        <input
          type="text"
          value={loginUser}
          onChange={(e) => setLoginUser(e.target.value)}
          placeholder="Tap here to autofill passkey..."
          autoComplete="username webauthn"
          className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 py-3 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 transition"
        />
      )}
      <button
        type="button"
        onClick={onAuthenticate}
        disabled={disabled}
        className="w-full rounded-xl bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-medium py-3 px-4 transition opacity-100 disabled:opacity-50 hover:bg-stone-800 dark:hover:bg-stone-200"
      >
        {status === 'loading' ? 'Waiting for passkey…' : 'Authenticate with passkey'}
      </button>
    </div>
  );
}
