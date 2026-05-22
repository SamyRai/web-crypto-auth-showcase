/**
 * Digital signature demo: RSA-PSS sign and verify with ephemeral key pair.
 */

import { useState, useCallback } from 'react';
import {
  generateSigningKeyPair,
  exportSigningPublicKeySpki,
  importSigningPublicKeySpki,
  signMessage,
  verifySignature,
  SIGN_VERIFY_CONSTANTS,
} from '../../lib/signVerify';

export function SignVerifySection() {
  const [message, setMessage] = useState('');
  const [signatureBase64, setSignatureBase64] = useState<string | null>(null);
  const [publicKeySpki, setPublicKeySpki] = useState<string | null>(null);
  const [privateKeyRef, setPrivateKeyRef] = useState<CryptoKey | null>(null);
  const [verifyMessage, setVerifyMessage] = useState('');
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onGenerateKey = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSignatureBase64(null);
    setPublicKeySpki(null);
    setVerifyResult(null);
    setPrivateKeyRef(null);
    try {
      const { publicKey, privateKey } = await generateSigningKeyPair();
      const spki = await exportSigningPublicKeySpki(publicKey);
      setPublicKeySpki(spki);
      setPrivateKeyRef(privateKey);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Key generation failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const onSign = useCallback(async () => {
    if (!privateKeyRef) return;
    setLoading(true);
    setError(null);
    setSignatureBase64(null);
    setVerifyResult(null);
    try {
      const sig = await signMessage(privateKeyRef, message);
      setSignatureBase64(sig);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign failed');
    } finally {
      setLoading(false);
    }
  }, [privateKeyRef, message]);

  const onVerify = useCallback(async () => {
    if (!publicKeySpki || !signatureBase64) return;
    setLoading(true);
    setError(null);
    setVerifyResult(null);
    try {
      const publicKey = await importSigningPublicKeySpki(publicKeySpki);
      const valid = await verifySignature(publicKey, signatureBase64, verifyMessage);
      setVerifyResult(valid);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verify failed');
    } finally {
      setLoading(false);
    }
  }, [publicKeySpki, signatureBase64, verifyMessage]);

  return (
    <section className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 mb-6">
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-2">
        Sign & verify (RSA-PSS)
      </h3>
      <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
        Generate an ephemeral signing key pair. Sign a message with the private key; anyone with the public
        key can verify the signature. Algorithm: {SIGN_VERIFY_CONSTANTS.algorithm}, hash:{' '}
        {SIGN_VERIFY_CONSTANTS.hash}.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={onGenerateKey}
          disabled={loading}
          className="rounded-lg bg-stone-800 dark:bg-stone-200 text-stone-100 dark:text-stone-900 text-sm font-medium px-3 py-2 disabled:opacity-50"
        >
          {loading ? 'Generating…' : 'Generate signing key pair'}
        </button>
      </div>

      {publicKeySpki && (
        <>
          <div className="space-y-2 mb-3">
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300">
              Message to sign
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message..."
              rows={2}
              className="w-full rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 text-sm resize-y"
              aria-label="Message to sign"
            />
            <button
              type="button"
              onClick={onSign}
              disabled={loading || !message.trim()}
              className="rounded-lg border border-stone-400 dark:border-stone-500 text-stone-700 dark:text-stone-300 text-sm px-3 py-2 disabled:opacity-50"
            >
              {loading ? 'Signing…' : 'Sign'}
            </button>
          </div>

          {signatureBase64 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">Signature (base64)</p>
              <p className="text-xs font-mono break-all text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 p-2 rounded">
                {signatureBase64}
              </p>
              <div className="mt-2 space-y-2">
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300">
                  Message to verify (must match signed message)
                </label>
                <textarea
                  value={verifyMessage}
                  onChange={(e) => setVerifyMessage(e.target.value)}
                  placeholder="Paste the same message to verify..."
                  rows={2}
                  className="w-full rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 text-sm resize-y"
                  aria-label="Message to verify"
                />
                <button
                  type="button"
                  onClick={onVerify}
                  disabled={loading}
                  className="rounded-lg border border-stone-400 dark:border-stone-500 text-stone-700 dark:text-stone-300 text-sm px-3 py-2 disabled:opacity-50"
                >
                  {loading ? 'Verifying…' : 'Verify'}
                </button>
                {verifyResult !== null && (
                  <p
                    className={`text-sm font-medium ${verifyResult ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                  >
                    {verifyResult ? '✓ Signature valid' : '✗ Signature invalid'}
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </section>
  );
}
