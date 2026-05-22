import type { AuthStatus } from '../../hooks/usePasskeyAuth';

interface PasskeyAuthSectionProps {
  onAuthenticate: () => void;
  status: AuthStatus;
  disabled: boolean;
}

export function PasskeyAuthSection({
  onAuthenticate,
  status,
  disabled,
}: PasskeyAuthSectionProps) {
  return (
    <>
      <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
        Step 2: Sign in with that passkey
      </p>
      <button
        type="button"
        onClick={onAuthenticate}
        disabled={disabled}
        className="w-full rounded-xl bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-medium py-3 px-4 transition opacity-100 disabled:opacity-50 hover:bg-stone-800 dark:hover:bg-stone-200"
      >
        {status === 'loading' ? 'Waiting for passkey…' : 'Authenticate with passkey'}
      </button>
    </>
  );
}
