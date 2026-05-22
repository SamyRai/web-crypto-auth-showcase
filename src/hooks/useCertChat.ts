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

export interface ChatMessage {
  id: string;
  sender: 'me' | 'contact';
  plaintext: string | null;
  ciphertextBase64: string;
  timestamp: Date;
  isDecrypted?: boolean;
}

export function useChatConversation(myPrivateKeyBase64: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [contactPublicKeyBase64, setContactPublicKeyBase64] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!contactPublicKeyBase64.trim()) {
        setError('Contact public key is missing.');
        return;
      }
      setIsEncrypting(true);
      setError(null);
      try {
        const publicKey = await importPublicKeySpki(contactPublicKeyBase64.trim());
        const enc = new TextEncoder().encode(text);
        if (enc.byteLength > RSA_OAEP_MAX_PLAINTEXT_BYTES) {
          throw new Error(`Message too long (max ${RSA_OAEP_MAX_PLAINTEXT_BYTES} bytes)`);
        }
        const ciphertext = await encryptWithPublicKey(publicKey, text);
        const newMessage: ChatMessage = {
          id: crypto.randomUUID(),
          sender: 'me',
          plaintext: text,
          ciphertextBase64: ciphertext,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Encryption failed');
      } finally {
        setIsEncrypting(false);
      }
    },
    [contactPublicKeyBase64]
  );

  const simulateReceive = useCallback(async (text: string, myPublicKeyBase64: string | null) => {
    if (!myPublicKeyBase64) {
      setError('You need to generate your key pair first.');
      return;
    }
    setIsEncrypting(true);
    setError(null);
    try {
      const publicKey = await importPublicKeySpki(myPublicKeyBase64.trim());
      const ciphertext = await encryptWithPublicKey(publicKey, text);
      const newMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'contact',
        plaintext: null,
        ciphertextBase64: ciphertext,
        timestamp: new Date(),
        isDecrypted: false,
      };
      setMessages((prev) => [...prev, newMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Simulated encryption failed');
    } finally {
      setIsEncrypting(false);
    }
  }, []);

  const decryptMessage = useCallback(
    async (messageId: string) => {
      if (!myPrivateKeyBase64) {
        setError('Your private key is missing.');
        return;
      }
      setIsDecrypting(true);
      setError(null);
      try {
        const privateKey = await importPrivateKeyPkcs8(myPrivateKeyBase64.trim());
        const targetMessage = messages.find((m) => m.id === messageId);
        if (!targetMessage) throw new Error('Message not found');

        const decryptedText = await decryptWithPrivateKey(privateKey, targetMessage.ciphertextBase64);
        
        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId ? { ...m, plaintext: decryptedText, isDecrypted: true } : m
          )
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Decryption failed. Ensure you have the correct private key.');
      } finally {
        setIsDecrypting(false);
      }
    },
    [myPrivateKeyBase64, messages]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    contactPublicKeyBase64,
    setContactPublicKeyBase64,
    sendMessage,
    simulateReceive,
    decryptMessage,
    clearChat,
    isEncrypting,
    isDecrypting,
    error,
  };
}
