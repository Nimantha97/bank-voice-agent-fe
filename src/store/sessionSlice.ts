import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SessionState } from '../types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'bank_session';

const loadFromStorage = (): SessionState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load session:', error);
  }
  return {
    sessionId: uuidv4(),
    customerId: null,
    verified: false,
  };
};

const saveToStorage = (state: SessionState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save session:', error);
  }
};

const initialState: SessionState = loadFromStorage();

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCustomerId: (state, action: PayloadAction<string | null>) => {
      state.customerId = action.payload;
      saveToStorage(state);
    },
    setVerified: (state, action: PayloadAction<boolean>) => {
      state.verified = action.payload;
      saveToStorage(state);
    },
    resetSession: (state) => {
      state.sessionId = uuidv4();
      state.customerId = null;
      state.verified = false;
      saveToStorage(state);
    },
    restoreSession: (state, action: PayloadAction<SessionState>) => {
      state.sessionId = action.payload.sessionId;
      state.customerId = action.payload.customerId;
      state.verified = action.payload.verified;
      saveToStorage(state);
    },
  },
});

export const { setCustomerId, setVerified, resetSession, restoreSession } = sessionSlice.actions;
export default sessionSlice.reducer;
