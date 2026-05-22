import { useState, useCallback } from 'react';
import {
  generateRsaKeyPair,
  exportPublicKeySpki,
  exportPrivateKeyPkcs8,
  importPublicKeySpki,
  importPrivateKeyPkcs8,
  encryptWithPublicKey,
  decryptWithPrivateKey,
  publicKeyFingerprint,
  RSA_OAEP_MAX_PLAINTEXT_BYTES,
} from '../lib/publicKeyCrypto';

export interface DebugEntry {
  time: string;
  label: string;
  detail?: string;
}

export interface KeyPairState {
  publicKeyBase64: string | null;
  privateKeyBase64: string | null;
  publicKeyFingerprint: string | null;
  hasKeyPair: boolean;
}

export function useKeyPair() {
  const [publicKeyBase64, setPublicKeyBase64] = useState<string | null>(null);
  const [privateKeyBase64, setPrivateKeyBase64] = useState<string | null>(null);
  const [publicKeyFingerprintState, setPublicKeyFingerprintState] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { publicKey, privateKey } = await generateRsaKeyPair();
      const [pubB64, privB64, fp] = await Promise.all([
        exportPublicKeySpki(publicKey),
        exportPrivateKeyPkcs8(privateKey),
        publicKeyFingerprint(publicKey),
      ]);
      setPublicKeyBase64(pubB64);
      setPrivateKeyBase64(privB64);
      setPublicKeyFingerprintState(fp);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Key generation failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadFromPaste = useCallback(async (publicKeyPaste: string, privateKeyPaste: string) => {
    setLoading(true);
    setError(null);
    try {
      const publicKey = await importPublicKeySpki(publicKeyPaste.trim());
      const privateKey = await importPrivateKeyPkcs8(privateKeyPaste.trim());
      const [pubB64, privB64, fp] = await Promise.all([
        exportPublicKeySpki(publicKey),
        exportPrivateKeyPkcs8(privateKey),
        publicKeyFingerprint(publicKey),
      ]);
      setPublicKeyBase64(pubB64);
      setPrivateKeyBase64(privB64);
      setPublicKeyFingerprintState(fp);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setLoading(false);
    }
  }, []);

  /** Load only private key (decrypt-only mode; no public key to share). */
  const loadPrivateKeyOnly = useCallback(async (pkcs8Base64: string) => {
    const trimmed = pkcs8Base64.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    try {
      await importPrivateKeyPkcs8(trimmed);
      setPrivateKeyBase64(trimmed);
      setPublicKeyBase64(null);
      setPublicKeyFingerprintState(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid private key');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearKeys = useCallback(() => {
    setPublicKeyBase64(null);
    setPrivateKeyBase64(null);
    setPublicKeyFingerprintState(null);
    setError(null);
  }, []);

  const keyPairState: KeyPairState = {
    publicKeyBase64,
    privateKeyBase64,
    publicKeyFingerprint: publicKeyFingerprintState,
    hasKeyPair: !!privateKeyBase64,
  };

  return {
    ...keyPairState,
    loading,
    error,
    generate,
    loadFromPaste,
    loadPrivateKeyOnly,
    clearKeys,
  };
}

export function useEncryptWithDebug() {
  const [recipientPublicKeyBase64, setRecipientPublicKeyBase64] = useState('');
  const [message, setMessage] = useState('');
  const [ciphertextBase64, setCiphertextBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugLog, setDebugLog] = useState<DebugEntry[]>([]);

  const addDebug = useCallback((label: string, detail?: string) => {
    setDebugLog((prev) => [
      ...prev,
      { time: new Date().toISOString().slice(11, 23), label, detail },
    ]);
  }, []);

  const encrypt = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCiphertextBase64(null);
    setDebugLog([]);
    try {
      addDebug('Importing recipient public key (SPKI)...');
      const publicKey = await importPublicKeySpki(recipientPublicKeyBase64.trim());
      const fp = await publicKeyFingerprint(publicKey);
      addDebug('Recipient key fingerprint', fp);

      const enc = new TextEncoder().encode(message);
      if (enc.byteLength > RSA_OAEP_MAX_PLAINTEXT_BYTES) {
        throw new Error(`Message too long (max ${RSA_OAEP_MAX_PLAINTEXT_BYTES} bytes)`);
      }
      addDebug('Encrypting with RSA-OAEP...');
      const ciphertext = await encryptWithPublicKey(publicKey, message);
      setCiphertextBase64(ciphertext);
      addDebug('Ciphertext length (base64)', `${ciphertext.length} chars`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Encryption failed';
      setError(msg);
      addDebug('Error', msg);
    } finally {
      setLoading(false);
    }
  }, [recipientPublicKeyBase64, message, addDebug]);

  const reset = useCallback(() => {
    setCiphertextBase64(null);
    setError(null);
    setDebugLog([]);
  }, []);

  return {
    recipientPublicKeyBase64,
    setRecipientPublicKeyBase64,
    message,
    setMessage,
    ciphertextBase64,
    loading,
    error,
    debugLog,
    encrypt,
    reset,
    maxPlaintextBytes: RSA_OAEP_MAX_PLAINTEXT_BYTES,
  };
}

export function useDecryptWithDebug() {
  const [ciphertextBase64, setCiphertextBase64] = useState('');
  const [plaintext, setPlaintext] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugLog, setDebugLog] = useState<DebugEntry[]>([]);

  const addDebug = useCallback((label: string, detail?: string) => {
    setDebugLog((prev) => [
      ...prev,
      { time: new Date().toISOString().slice(11, 23), label, detail },
    ]);
  }, []);

  const decrypt = useCallback(
    async (privateKeyBase64: string) => {
      setLoading(true);
      setError(null);
      setPlaintext(null);
      setDebugLog([]);
      try {
        addDebug('Importing private key (PKCS#8)...');
        const privateKey = await importPrivateKeyPkcs8(privateKeyBase64.trim());
        addDebug('Decrypting with RSA-OAEP...');
        const decrypted = await decryptWithPrivateKey(privateKey, ciphertextBase64.trim());
        setPlaintext(decrypted);
        addDebug('Plaintext length', `${new TextEncoder().encode(decrypted).length} bytes`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Decryption failed';
        setError(msg);
        addDebug('Error', msg);
      } finally {
        setLoading(false);
      }
    },
    [ciphertextBase64, addDebug]
  );

  const reset = useCallback(() => {
    setPlaintext(null);
    setError(null);
    setDebugLog([]);
  }, []);

  return {
    ciphertextBase64,
    setCiphertextBase64,
    plaintext,
    loading,
    error,
    debugLog,
    decrypt,
    reset,
  };
}
