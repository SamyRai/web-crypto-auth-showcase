import type { EncryptResult as EncryptResultType } from '../../hooks/useEncryptForm';

interface EncryptSectionProps {
  password: string;
  onPasswordChange: (v: string) => void;
  plaintext: string;
  onPlaintextChange: (v: string) => void;
  onEncrypt: () => void;
  status: 'idle' | 'loading' | 'error';
  errorMessage: string | null;
  encResult: EncryptResultType | null;
  secure: boolean;
  pbkdf2Iterations: number;
}

export function EncryptSection({
  password,
  onPasswordChange,
  plaintext,
  onPlaintextChange,
  onEncrypt,
  status,
  errorMessage,
  encResult,
  secure,
  pbkdf2Iterations,
}: EncryptSectionProps) {
  return (
    <section className="mb-10 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6">
      <h2 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-4">
        Encrypt
      </h2>
      <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
        Enter a password and a secret message. A key is derived with PBKDF2 (SHA-256,{' '}
        {pbkdf2Iterations.toLocaleString()} iterations) and the message is encrypted with AES-GCM.
      </p>
      <div className="flex flex-col gap-3">
        <input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="Password"
          className="rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 text-sm font-mono"
          aria-label="Encryption password"
        />
        <textarea
          value={plaintext}
          onChange={(e) => onPlaintextChange(e.target.value)}
          placeholder="Secret message"
          rows={3}
          className="rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 text-sm font-mono resize-y"
          aria-label="Plaintext to encrypt"
        />
        <button
          type="button"
          onClick={onEncrypt}
          disabled={status === 'loading' || !secure || !password.trim()}
          className="rounded-xl bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-medium py-2.5 px-4 w-fit disabled:opacity-50"
        >
          {status === 'loading' ? 'Encrypting…' : 'Encrypt'}
        </button>
      </div>
      {errorMessage && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
      )}
      {encResult && (
        <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700 space-y-2 text-xs font-mono break-all">
          <p><span className="text-stone-500 dark:text-stone-400">Ciphertext (base64):</span> {encResult.ciphertextBase64}</p>
          <p><span className="text-stone-500 dark:text-stone-400">Salt (base64):</span> {encResult.saltBase64}</p>
          <p><span className="text-stone-500 dark:text-stone-400">IV (base64):</span> {encResult.ivBase64}</p>
          <p className="text-stone-500 dark:text-stone-400">Store salt and IV with the ciphertext; they are not secret.</p>
        </div>
      )}
    </section>
  );
}
