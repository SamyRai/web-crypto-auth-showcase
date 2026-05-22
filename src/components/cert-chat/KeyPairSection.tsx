interface KeyPairSectionProps {
  publicKeyBase64: string | null;
  publicKeyFingerprint: string | null;
  hasKeyPair: boolean;
  loading: boolean;
  error: string | null;
  onGenerate: () => void;
  onClear: () => void;
}

export function KeyPairSection({
  publicKeyBase64,
  publicKeyFingerprint,
  hasKeyPair,
  loading,
  error,
  onGenerate,
  onClear,
}: KeyPairSectionProps) {
  return (
    <section className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 mb-6">
      <h2 className="text-sm font-semibold text-stone-800 dark:text-stone-200 mb-3">
        My key pair (for public key exchange)
      </h2>
      <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
        Generate a key pair. We exchange <strong>public keys</strong> so others can <strong>encrypt</strong> (encode) messages to us — the public key cannot decrypt. Only your <strong>private key</strong> can decrypt; keep it secret.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onGenerate}
          disabled={loading}
          className="rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-sm font-medium px-3 py-2 disabled:opacity-50"
        >
          {loading ? 'Generating…' : 'Generate key pair'}
        </button>
        {hasKeyPair && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-lg border border-stone-400 dark:border-stone-500 text-stone-700 dark:text-stone-300 text-sm px-3 py-2"
          >
            Clear keys
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {hasKeyPair && !publicKeyBase64 && (
        <p className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-400">
          Private key loaded (decrypt only). Generate a key pair above to get a public key to share.
        </p>
      )}
      {hasKeyPair && publicKeyBase64 && (
        <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-700">
          <p className="text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
            My public key (share this so others can encrypt to you)
          </p>
          <textarea
            readOnly
            value={publicKeyBase64}
            rows={4}
            className="w-full rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-800 px-2 py-1.5 text-xs font-mono break-all resize-y"
            aria-label="Public key (SPKI base64)"
          />
          {publicKeyFingerprint && (
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-mono">
              Fingerprint: {publicKeyFingerprint}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
