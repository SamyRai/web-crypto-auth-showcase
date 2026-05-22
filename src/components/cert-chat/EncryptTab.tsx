import { useEncryptWithDebug } from '../../hooks/useCertChat';
import { DebugSidebar } from './DebugSidebar';

interface EncryptTabProps {
  encrypt: ReturnType<typeof useEncryptWithDebug>;
  myPublicKeyFingerprint: string | null;
}

export function EncryptTab({ encrypt, myPublicKeyFingerprint }: EncryptTabProps) {
  const {
    recipientPublicKeyBase64,
    setRecipientPublicKeyBase64,
    message,
    setMessage,
    ciphertextBase64,
    loading,
    error,
    debugLog,
    encrypt: doEncrypt,
    reset,
    maxPlaintextBytes,
  } = encrypt;

  const byteLength = new TextEncoder().encode(message).length;
  const overLimit = byteLength > maxPlaintextBytes;

  return (
    <div className="flex flex-1 min-h-0">
      <div className="flex-1 overflow-auto p-6">
        <h2 className="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-2">
          Encrypt a message
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
          Paste the <strong>recipient&apos;s public key</strong> (SPKI base64), then type a message. Max {maxPlaintextBytes} bytes for RSA-OAEP 2048.
        </p>

        <div className="space-y-3 mb-4">
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
            Recipient&apos;s public key (SPKI, base64)
          </label>
          <textarea
            value={recipientPublicKeyBase64}
            onChange={(e) => setRecipientPublicKeyBase64(e.target.value)}
            placeholder="Paste the other party's public key here..."
            rows={5}
            className="w-full rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 text-sm font-mono resize-y"
            aria-label="Recipient public key"
          />
        </div>

        <div className="space-y-3 mb-4">
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
            Message ({byteLength} / {maxPlaintextBytes} bytes)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Short message to encrypt..."
            rows={3}
            className={`w-full rounded-lg border px-3 py-2 text-sm resize-y ${
              overLimit
                ? 'border-red-500 dark:border-red-400 bg-red-50/50 dark:bg-red-950/20'
                : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800'
            }`}
            aria-label="Message to encrypt"
          />
          {overLimit && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Message too long. RSA-OAEP supports max {maxPlaintextBytes} bytes.
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={doEncrypt}
            disabled={loading || !recipientPublicKeyBase64.trim() || !message.trim() || overLimit}
            className="rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-sm font-medium px-4 py-2 disabled:opacity-50"
          >
            {loading ? 'Encrypting…' : 'Encrypt'}
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
        {ciphertextBase64 && (
          <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Ciphertext (base64)</p>
            <textarea
              readOnly
              value={ciphertextBase64}
              rows={6}
              className="w-full rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-800 px-3 py-2 text-xs font-mono break-all resize-y"
              aria-label="Encrypted ciphertext"
            />
          </div>
        )}
      </div>
      <DebugSidebar
        title="Encrypt debug"
        entries={debugLog}
        keyFingerprint={myPublicKeyFingerprint}
        extra={ciphertextBase64 ? [{ label: 'Ciphertext length', value: `${ciphertextBase64.length} chars` }] : []}
      />
    </div>
  );
}
