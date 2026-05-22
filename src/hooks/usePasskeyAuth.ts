import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateWithPasskey } from '../lib/webauthn';
import { parseAssertionPayload } from '../schemas/auth';

export type AuthStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UsePasskeyAuthResult {
  status: AuthStatus;
  message: string | null;
  authenticate: () => Promise<void>;
}

export function usePasskeyAuth(): UsePasskeyAuthResult {
  const navigate = useNavigate();
  const [status, setStatus] = useState<AuthStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const authenticate = useCallback(async () => {
    setStatus('loading');
    setMessage(null);
    try {
      const result = await authenticateWithPasskey();
      if (result.success) {
        const payload = {
          credentialId: result.credentialId,
          clientDataJSON: result.clientDataJSON,
          authenticatorData: result.authenticatorData,
          signature: result.signature,
          userHandle: result.userHandle,
        };
        const parsed = parseAssertionPayload(payload);
        if (parsed.success) {
          setStatus('success');
          setMessage('Authentication successful.');
          navigate('/learn', {
            state: {
              method: 'passkey',
              credentialId: result.credentialId,
              payload: parsed.data,
            },
          });
          return;
        }
      }
      setStatus('error');
      setMessage(result.success ? 'Invalid assertion payload.' : (result.error ?? 'Authentication failed.'));
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Unknown error');
    }
  }, [navigate]);

  return { status, message, authenticate };
}
