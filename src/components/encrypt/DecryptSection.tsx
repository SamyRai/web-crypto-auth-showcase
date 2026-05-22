interface DecryptSectionProps {
  password: string;
  onPasswordChange: (v: string) => void;
  ciphertext: string;
  onCiphertextChange: (v: string) => void;
  salt: string;
  onSaltChange: (v: string) => void;
  iv: string;
  onIvChange: (v: string) => void;
  onDecrypt: () => void;
  secure: boolean;
  error: string | null;
  plaintext: string | null;
}

export function DecryptSection({
  password,
  onPasswordChange,
  ciphertext,
  onCiphertextChange,
  salt,
  onSaltChange,
  iv,
  onIvChange,
  onDecrypt,
  secure,
  error,
  plaintext,
}: DecryptSectionProps) {
  return (
    <section className="mb-10 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6">
      <h2 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-4">
        Decrypt
      </h2>
      <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
        Use the same password and the stored ciphertext, salt, and IV to decrypt.
      </p>
      <div className="flex flex-col gap-3">
        <input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="Password"
          className="rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 text-sm font-mono"
          aria-label="Decryption password"
        />
        <input
          type="text"
          value={ciphertext}
          onChange={(e) => onCiphertextChange(e.target.value)}
          placeholder="Ciphertext (base64)"
          className="rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 text-sm font-mono"
          aria-label="Ciphertext"
        />
        <input
          type="text"
          value={salt}
          onChange={(e) => onSaltChange(e.target.value)}
          placeholder="Salt (base64)"
          className="rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 text-sm font-mono"
          aria-label="Salt"
        />
        <input
          type="text"
          value={iv}
          onChange={(e) => onIvChange(e.target.value)}
          placeholder="IV (base64)"
          className="rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 text-sm font-mono"
          aria-label="IV"
        />
        <button
          type="button"
          onClick={onDecrypt}
          disabled={!secure || !password.trim() || !ciphertext.trim() || !salt.trim() || !iv.trim()}
          className="rounded-xl border border-stone-400 dark:border-stone-500 py-2.5 px-4 w-fit text-sm font-medium disabled:opacity-50"
        >
          Decrypt
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
      {plaintext !== null && (
        <p className="mt-3 text-sm font-mono text-stone-800 dark:text-stone-200 break-words">
          Decrypted: {plaintext}
        </p>
      )}
    </section>
  );
}
