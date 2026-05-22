import { useState, useCallback } from 'react';
import { registerPasskey } from '../lib/webauthn';

export type RegisterStatus = 'idle' | 'loading' | 'ok' | 'error';

export interface UsePasskeyRegistrationResult {
  status: RegisterStatus;
  message: string | null;
  register: (userName: string) => Promise<void>;
}

const DEFAULT_USER_NAME = 'demo@localhost';

export function usePasskeyRegistration(): UsePasskeyRegistrationResult {
  const [status, setStatus] = useState<RegisterStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const register = useCallback(async (userName: string) => {
    setStatus('loading');
    setMessage(null);
    try {
      const result = await registerPasskey(userName.trim() || DEFAULT_USER_NAME);
      if (result.success) {
        setStatus('ok');
        setMessage(
          'Passkey created. Use "Authenticate with passkey" below — Touch ID will be used to sign in.'
        );
      } else {
        setStatus('error');
        setMessage(result.error ?? 'Registration failed.');
      }
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  return { status, message, register };
}
