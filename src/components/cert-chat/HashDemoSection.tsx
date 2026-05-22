/**
 * Digest (SHA-256) demo using Web Crypto — integrity fingerprint, not for passwords.
 */

import { useState, useCallback } from 'react';
import { sha256Fingerprint } from '../../lib/webcrypto';

export function HashDemoSection() {
  const [input, setInput] = useState('');
  const [hashResult, setHashResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onHash = useCallback(async () => {
    setLoading(true);
    setError(null);
    setHashResult(null);
    try {
      const out = await sha256Fingerprint(input);
      setHashResult(out);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hash failed');
    } finally {
      setLoading(false);
    }
  }, [input]);

  return (
    <section className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 mb-6">
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-2">
        Digest (SHA-256)
      </h3>
      <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
        One-way hash for integrity and fingerprints. Same input always gives the same output. Not for storing
        passwords — use PBKDF2/Argon2 for that.
      </p>
      <div className="space-y-2 mb-3">
        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300">
          Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Text to hash..."
          rows={2}
          className="w-full rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 text-sm font-mono resize-y"
          aria-label="Input for hash"
        />
      </div>
      <button
        type="button"
        onClick={onHash}
        disabled={loading}
        className="rounded-lg bg-stone-800 dark:bg-stone-200 text-stone-100 dark:text-stone-900 text-sm font-medium px-3 py-2 disabled:opacity-50"
      >
        {loading ? 'Hashing…' : 'Hash (SHA-256)'}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {hashResult && (
        <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-700">
          <p className="text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">SHA-256 (base64)</p>
          <p className="text-sm font-mono break-all text-stone-800 dark:text-stone-200">{hashResult}</p>
        </div>
      )}
    </section>
  );
}
