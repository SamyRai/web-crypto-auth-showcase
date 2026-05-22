import type { DebugEntry } from '../../hooks/useCertChat';
import { PUBLIC_KEY_CRYPTO_CONSTANTS } from '../../lib/publicKeyCrypto';

interface DebugSidebarProps {
  title: string;
  entries: DebugEntry[];
  keyFingerprint: string | null;
  extra?: { label: string; value: string }[];
}

export function DebugSidebar({
  title,
  entries,
  keyFingerprint,
  extra = [],
}: DebugSidebarProps) {
  return (
    <aside
      className="w-72 shrink-0 border-l border-stone-200 dark:border-stone-700 bg-stone-100/50 dark:bg-stone-800/30 overflow-hidden flex flex-col"
      aria-label="Debug info"
    >
      <div className="p-3 border-b border-stone-200 dark:border-stone-700">
        <h2 className="text-sm font-semibold text-stone-800 dark:text-stone-200">
          {title}
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
          Algorithm: {PUBLIC_KEY_CRYPTO_CONSTANTS.algorithm} ({PUBLIC_KEY_CRYPTO_CONSTANTS.modulusLength}-bit)
        </p>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Hash: {PUBLIC_KEY_CRYPTO_CONSTANTS.hash}
        </p>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Key usages: encrypt (public), decrypt (private)
        </p>
        {keyFingerprint && (
          <p className="text-xs font-mono text-stone-600 dark:text-stone-300 mt-1 break-all">
            Key fingerprint: {keyFingerprint}
          </p>
        )}
        {extra.map(({ label, value }) => (
          <p key={label} className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            {label}: {value}
          </p>
        ))}
      </div>
      <div className="flex-1 overflow-auto p-3">
        <h3 className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
          Step log
        </h3>
        <ul className="space-y-1.5 text-xs font-mono">
          {entries.length === 0 ? (
            <li className="text-stone-400 dark:text-stone-500">No steps yet.</li>
          ) : (
            entries.map((e, i) => (
              <li key={i} className="text-stone-600 dark:text-stone-300">
                <span className="text-stone-400 dark:text-stone-500">[{e.time}]</span>{' '}
                {e.label}
                {e.detail != null && (
                  <span className="block text-stone-500 dark:text-stone-400 pl-4">{e.detail}</span>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  );
}
