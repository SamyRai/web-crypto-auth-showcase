import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { checkWebAuthnSupport, type WebAuthnSupport } from '../lib/webauthn';
import { isSecureContext } from '../lib/secure-context';

export interface EnvironmentState {
  isSecureContext: boolean;
  webauthnSupport: WebAuthnSupport;
}

const defaultState: EnvironmentState = {
  isSecureContext: false,
  webauthnSupport: { supported: false, platformAuthenticator: false, conditionalMediation: false },
};

// eslint-disable-next-line react-refresh/only-export-components
export const EnvironmentContext = createContext<EnvironmentState>(defaultState);

export function EnvironmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EnvironmentState>(() => ({
    isSecureContext: isSecureContext(),
    webauthnSupport: defaultState.webauthnSupport,
  }));

  useEffect(() => {
    checkWebAuthnSupport().then((webauthnSupport) => {
      setState((prev) => ({ ...prev, webauthnSupport }));
    });
  }, []);

  return (
    <EnvironmentContext.Provider value={state}>
      {children}
    </EnvironmentContext.Provider>
  );
}
