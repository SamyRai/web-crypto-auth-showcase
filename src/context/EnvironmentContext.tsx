import {
  createContext,
  useMemo,
  type ReactNode,
} from 'react';
import { checkWebAuthnSupport } from '../lib/webauthn';
import { isSecureContext } from '../lib/secure-context';

export interface EnvironmentState {
  isSecureContext: boolean;
  webauthnSupport: ReturnType<typeof checkWebAuthnSupport>;
}

const defaultState: EnvironmentState = {
  isSecureContext: false,
  webauthnSupport: { supported: false, conditionalMediation: false },
};

export const EnvironmentContext = createContext<EnvironmentState>(defaultState);

export function EnvironmentProvider({ children }: { children: ReactNode }) {
  const value = useMemo<EnvironmentState>(() => ({
    isSecureContext: isSecureContext(),
    webauthnSupport: checkWebAuthnSupport(),
  }), []);

  return (
    <EnvironmentContext.Provider value={value}>
      {children}
    </EnvironmentContext.Provider>
  );
}
