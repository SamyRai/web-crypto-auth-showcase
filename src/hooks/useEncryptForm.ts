import { useState, useCallback } from 'react';
import {
  encryptWithPassword,
  decryptWithPassword,
  sha256Fingerprint,
} from '../lib/webcrypto';

export interface EncryptResult {
  ciphertextBase64: string;
  saltBase64: string;
  ivBase64: string;
  iterations: number;
}

export type EncryptStatus = 'idle' | 'loading' | 'error';

export function useEncryptForm() {
  const [password, setPassword] = useState('');
  const [plaintext, setPlaintext] = useState('');
  const [encResult, setEncResult] = useState<EncryptResult | null>(null);
  const [status, setStatus] = useState<EncryptStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const encrypt = useCallback(async () => {
    setStatus('loading');
    setErrorMessage(null);
    setEncResult(null);
    try {
      const result = await encryptWithPassword(password, plaintext);
      setEncResult(result);
      return result;
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Encryption failed');
    } finally {
      setStatus('idle');
    }
  }, [password, plaintext]);

  return {
    password,
    setPassword,
    plaintext,
    setPlaintext,
    encResult,
    setEncResult,
    status,
    errorMessage,
    encrypt,
  };
}

export function useDecryptForm(initialCiphertext = '', initialSalt = '', initialIv = '') {
  const [password, setPassword] = useState('');
  const [ciphertext, setCiphertext] = useState(initialCiphertext);
  const [salt, setSalt] = useState(initialSalt);
  const [iv, setIv] = useState(initialIv);
  const [plaintext, setPlaintext] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const decrypt = useCallback(async () => {
    setError(null);
    setPlaintext(null);
    try {
      const result = await decryptWithPassword(password, ciphertext, salt, iv);
      setPlaintext(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Decryption failed');
    }
  }, [password, ciphertext, salt, iv]);

  return {
    password,
    setPassword,
    ciphertext,
    setCiphertext,
    salt,
    setSalt,
    iv,
    setIv,
    plaintext,
    error,
    decrypt,
  };
}

export function useHashForm() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);

  const hash = useCallback(async () => {
    setOutput(null);
    try {
      const out = await sha256Fingerprint(input);
      setOutput(out);
    } catch {
      setOutput('Hash failed');
    }
  }, [input]);

  return { input, setInput, output, hash };
}
