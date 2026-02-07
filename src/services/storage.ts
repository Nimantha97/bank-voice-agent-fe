import { STORAGE_KEYS } from '../types/constants';
import type { SessionState } from '../types';

export const storage = {
  // Save session to sessionStorage
  saveSession: (session: SessionState): void => {
    sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, session.sessionId);
    sessionStorage.setItem(STORAGE_KEYS.CUSTOMER_ID, session.customerId || '');
    sessionStorage.setItem(STORAGE_KEYS.VERIFIED, session.verified.toString());
  },

  // Load session from sessionStorage
  loadSession: (): SessionState | null => {
    const sessionId = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
    const customerId = sessionStorage.getItem(STORAGE_KEYS.CUSTOMER_ID);
    const verified = sessionStorage.getItem(STORAGE_KEYS.VERIFIED) === 'true';

    if (!sessionId) return null;

    return {
      sessionId,
      customerId: customerId || null,
      verified,
    };
  },

  // Clear session from sessionStorage
  clearSession: (): void => {
    sessionStorage.removeItem(STORAGE_KEYS.SESSION_ID);
    sessionStorage.removeItem(STORAGE_KEYS.CUSTOMER_ID);
    sessionStorage.removeItem(STORAGE_KEYS.VERIFIED);
  },
};
