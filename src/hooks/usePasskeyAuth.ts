import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateWithPasskey } from '../lib/webauthn';
import { parseAssertionPayload } from '../schemas/auth';

export type AuthStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UsePasskeyAuthResult {
  status: AuthStatus;
  message: string | null;
  authenticate: (useConditionalUI?: boolean) => Promise<void>;
}

export function usePasskeyAuth(): UsePasskeyAuthResult {
  const navigate = useNavigate();
  const [status, setStatus] = useState<AuthStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const isAuthenticating = useRef(false);

  const authenticate = useCallback(async (useConditionalUI = false) => {
    if (isAuthenticating.current) return;
    isAuthenticating.current = true;
    
    if (!useConditionalUI) setStatus('loading');
    setMessage(null);
    
    try {
      const result = await authenticateWithPasskey(useConditionalUI);
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
      
      if (result.success === false && result.code === 'CANCELLED' && useConditionalUI) {
        // User ignored conditional UI
      } else {
        setStatus('error');
        setMessage(result.success ? 'Invalid assertion payload.' : (result.error ?? 'Authentication failed.'));
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      isAuthenticating.current = false;
    }
  }, [navigate]);

  return { status, message, authenticate };
}
