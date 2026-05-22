/**
 * Displays current browser security context: isSecureContext, crypto.subtle, getRandomValues.
 */

import { useState } from 'react';

interface SecurityContextState {
  isSecureContext: boolean;
  hasCryptoSubtle: boolean;
  hasGetRandomValues: boolean;
  randomSample: string | null;
}

function getState(): SecurityContextState {
  const isSecureContext =
    typeof window !== 'undefined' && (window as Window & { isSecureContext?: boolean }).isSecureContext === true;
  const hasCryptoSubtle = typeof crypto !== 'undefined' && typeof crypto.subtle !== 'undefined';
  const hasGetRandomValues = typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function';
  let randomSample: string | null = null;
  if (hasGetRandomValues && crypto.getRandomValues) {
    const arr = new Uint8Array(8);
    crypto.getRandomValues(arr);
    randomSample = Array.from(arr)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  return { isSecureContext, hasCryptoSubtle, hasGetRandomValues, randomSample };
}

export function SecurityContextSection() {
  const [state] = useState<SecurityContextState>(() => getState());

  const allOk = state.isSecureContext && state.hasCryptoSubtle && state.hasGetRandomValues;

  return (
    <section className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 mb-6">
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-3">
        Security context
      </h3>
      <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
        These must be true for Web Crypto, WebAuthn, and Credential Management to work. They require HTTPS or{' '}
        <code className="font-mono">localhost</code>.
      </p>
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full ${state.isSecureContext ? 'bg-green-500' : 'bg-red-500'}`}
            aria-hidden
          />
          <code className="font-mono text-stone-700 dark:text-stone-300">window.isSecureContext</code>
          <span className="text-stone-600 dark:text-stone-400">
            {state.isSecureContext ? 'true' : 'false'}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full ${state.hasCryptoSubtle ? 'bg-green-500' : 'bg-red-500'}`}
            aria-hidden
          />
          <code className="font-mono text-stone-700 dark:text-stone-300">crypto.subtle</code>
          <span className="text-stone-600 dark:text-stone-400">
            {state.hasCryptoSubtle ? 'available' : 'not available'}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full ${state.hasGetRandomValues ? 'bg-green-500' : 'bg-red-500'}`}
            aria-hidden
          />
          <code className="font-mono text-stone-700 dark:text-stone-300">crypto.getRandomValues</code>
          {state.randomSample != null && (
            <span className="text-stone-500 dark:text-stone-400 font-mono text-xs">
              (sample: {state.randomSample})
            </span>
          )}
        </li>
      </ul>
      {!allOk && (
        <p className="mt-3 text-xs text-amber-700 dark:text-amber-300">
          Use <code className="font-mono">http://localhost:5173</code> or HTTPS to enable all APIs.
        </p>
      )}
    </section>
  );
}
