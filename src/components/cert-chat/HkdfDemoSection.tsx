/**
 * HKDF key derivation demo — for high-entropy secrets, not passwords.
 */

import { useState, useCallback } from 'react';
import { deriveBitsHKDF } from '../../lib/hkdf';

export function HkdfDemoSection() {
  const [secret, setSecret] = useState('');
  const [info, setInfo] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDerive = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const out = await deriveBitsHKDF(secret, '', info, 256);
      setResult(out);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Derivation failed');
    } finally {
      setLoading(false);
    }
  }, [secret, info]);

  return (
    <section className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 mb-6">
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-2">
        HKDF (key derivation)
      </h3>
      <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
        Derives key material from a <strong>high-entropy</strong> secret (e.g. ECDH output). Not for
        passwords — use PBKDF2 or Argon2. Optional <em>info</em> binds the output to a context.
      </p>
      <div className="space-y-2 mb-3">
        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300">
          Secret (input)
        </label>
        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="High-entropy secret..."
          className="w-full rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 text-sm"
          aria-label="HKDF secret"
        />
        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300">
          Info (optional context)
        </label>
        <input
          type="text"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          placeholder="e.g. session-v1"
          className="w-full rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 text-sm"
          aria-label="HKDF info"
        />
      </div>
      <button
        type="button"
        onClick={onDerive}
        disabled={loading || !secret.trim()}
        className="rounded-lg bg-stone-800 dark:bg-stone-200 text-stone-100 dark:text-stone-900 text-sm font-medium px-3 py-2 disabled:opacity-50"
      >
        {loading ? 'Deriving…' : 'Derive 256 bits'}
      </button>
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
      {result && (
        <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-700">
          <p className="text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">Derived (base64)</p>
          <p className="text-sm font-mono break-all text-stone-800 dark:text-stone-200">{result}</p>
        </div>
      )}
    </section>
  );
}
