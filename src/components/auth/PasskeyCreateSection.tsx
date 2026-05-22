import type { RegisterStatus } from '../../hooks/usePasskeyRegistration';

interface PasskeyCreateSectionProps {
  userName: string;
  onUserNameChange: (v: string) => void;
  onRegister: () => void;
  status: RegisterStatus;
  message: string | null;
  disabled: boolean;
  defaultUserName: string;
}

export function PasskeyCreateSection({
  userName,
  onUserNameChange,
  onRegister,
  status,
  message,
  disabled,
  defaultUserName,
}: PasskeyCreateSectionProps) {
  return (
    <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-100/50 dark:bg-stone-800/30 p-4 flex flex-col gap-3">
      <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
        Step 1: Create a passkey for this site
      </p>
      <p className="text-xs text-stone-600 dark:text-stone-400">
        This stores a key in your device (e.g. iCloud Keychain). Touch ID will be used to create and later unlock it.
      </p>
      <input
        type="text"
        value={userName}
        onChange={(e) => onUserNameChange(e.target.value)}
        placeholder={defaultUserName}
        className="rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 px-3 py-2 text-sm font-mono"
        aria-label="Username for passkey"
      />
      <button
        type="button"
        onClick={onRegister}
        disabled={disabled}
        className="rounded-xl border border-stone-400 dark:border-stone-500 py-2.5 px-4 text-sm font-medium text-stone-700 dark:text-stone-300 transition opacity-100 disabled:opacity-50 hover:bg-stone-200 dark:hover:bg-stone-700"
      >
        {status === 'loading' ? 'Creating…' : 'Create passkey'}
      </button>
      {status === 'ok' && message && (
        <p className="text-xs text-green-700 dark:text-green-400">{message}</p>
      )}
      {status === 'error' && message && (
        <p className="text-xs text-red-700 dark:text-red-400">{message}</p>
      )}
    </div>
  );
}
