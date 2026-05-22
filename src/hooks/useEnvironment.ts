import { useContext } from 'react';
import { EnvironmentContext } from '../context/EnvironmentContext';

export function useSecureContext(): boolean {
  return useContext(EnvironmentContext).isSecureContext;
}

export function useWebAuthnSupport() {
  return useContext(EnvironmentContext).webauthnSupport;
}
