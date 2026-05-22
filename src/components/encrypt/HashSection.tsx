interface HashSectionProps {
  input: string;
  onInputChange: (v: string) => void;
  onHash: () => void;
  secure: boolean;
  output: string | null;
}

export function HashSection({
  input,
  onInputChange,
  onHash,
  secure,
  output,
}: HashSectionProps) {
  return (
    <section className="mb-10 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6">
      <h2 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-4">
        SHA-256 fingerprint (integrity)
      </h2>
      <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
        Hash a message to get a fixed-size fingerprint. Use for integrity checks, not for storing passwords.
      </p>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Message to hash"
          className="rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 text-sm font-mono"
          aria-label="Message to hash"
        />
        <button
          type="button"
          onClick={onHash}
          disabled={!secure}
          className="rounded-xl border border-stone-400 dark:border-stone-500 py-2.5 px-4 w-fit text-sm font-medium disabled:opacity-50"
        >
          Hash (SHA-256)
        </button>
        {output && (
          <p className="text-xs font-mono text-stone-600 dark:text-stone-400 break-all">
            {output}
          </p>
        )}
      </div>
    </section>
  );
}
