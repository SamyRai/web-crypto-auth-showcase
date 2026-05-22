import { useState } from 'react';
import { useDecryptWithDebug } from '../../hooks/useCertChat';
import { DebugSidebar } from './DebugSidebar';

interface DecryptTabProps {
  decrypt: ReturnType<typeof useDecryptWithDebug>;
  privateKeyBase64: string | null;
  publicKeyFingerprint: string | null;
  hasKeyPair: boolean;
  onLoadPrivateKeyOnly?: (pkcs8Base64: string) => Promise<void>;
  loadingKey?: boolean;
}

export function DecryptTab({
  decrypt,
  privateKeyBase64,
  publicKeyFingerprint,
  hasKeyPair,
  onLoadPrivateKeyOnly,
  loadingKey = false,
}: DecryptTabProps) {
  const [privateKeyPaste, setPrivateKeyPaste] = useState('');

  const {
    ciphertextBase64,
    setCiphertextBase64,
    plaintext,
    loading,
    error,
    debugLog,
    decrypt: doDecrypt,
    reset,
  } = decrypt;

  const handleDecrypt = () => {
    if (privateKeyBase64) doDecrypt(privateKeyBase64);
  };

  const handleUsePastedKey = () => {
    if (onLoadPrivateKeyOnly && privateKeyPaste.trim()) onLoadPrivateKeyOnly(privateKeyPaste);
  };

  return (
    <div className="flex flex-1 min-h-0">
      <div className="flex-1 overflow-auto p-6">
        <h2 className="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-2">
          Decrypt a message
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
          Paste ciphertext (base64) that was encrypted with <strong>your</strong> public key. You need the matching private key (generate above or paste below).
        </p>

        {!hasKeyPair && onLoadPrivateKeyOnly && (
          <div className="rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 px-4 py-3 mb-4">
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Or paste your private key (PKCS#8 base64)
            </p>
            <p className="text-xs text-stone-600 dark:text-stone-400 mb-2">
              Use this on another device or after clearing keys: paste the key you exported earlier.
            </p>
            <textarea
              value={privateKeyPaste}
              onChange={(e) => setPrivateKeyPaste(e.target.value)}
              placeholder="Paste PKCS#8 base64 private key..."
              rows={4}
              className="w-full rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 text-xs font-mono resize-y mb-2"
              aria-label="Private key paste"
            />
            <button
              type="button"
              onClick={handleUsePastedKey}
              disabled={loadingKey || !privateKeyPaste.trim()}
              className="rounded-lg border border-stone-400 dark:border-stone-500 text-stone-700 dark:text-stone-300 text-sm px-3 py-2 disabled:opacity-50"
            >
              {loadingKey ? 'Loading…' : 'Use this key'}
            </button>
          </div>
        )}

        <div className="space-y-3 mb-4">
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
            Ciphertext (base64)
          </label>
          <textarea
            value={ciphertextBase64}
            onChange={(e) => setCiphertextBase64(e.target.value)}
            placeholder="Paste ciphertext from the Encrypt tab or from another party..."
            rows={6}
            className="w-full rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 text-sm font-mono resize-y"
            aria-label="Ciphertext to decrypt"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleDecrypt}
            disabled={loading || !ciphertextBase64.trim() || !hasKeyPair}
            className="rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-sm font-medium px-4 py-2 disabled:opacity-50"
          >
            {loading ? 'Decrypting…' : 'Decrypt'}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-stone-400 dark:border-stone-500 text-stone-700 dark:text-stone-300 text-sm px-4 py-2"
          >
            Clear result
          </button>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {plaintext !== null && (
          <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Decrypted message</p>
            <pre className="rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 p-3 text-sm whitespace-pre-wrap break-words">
              {plaintext}
            </pre>
          </div>
        )}
      </div>
      <DebugSidebar
        title="Decrypt debug"
        entries={debugLog}
        keyFingerprint={publicKeyFingerprint}
      />
    </div>
  );
}
