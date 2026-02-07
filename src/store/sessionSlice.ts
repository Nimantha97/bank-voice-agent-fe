import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SessionState } from '../types';
import { v4 as uuidv4 } from 'uuid';

const initialState: SessionState = {
  sessionId: uuidv4(),
  customerId: null,
  verified: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCustomerId: (state, action: PayloadAction<string | null>) => {
      state.customerId = action.payload;
    },
    setVerified: (state, action: PayloadAction<boolean>) => {
      state.verified = action.payload;
    },
    resetSession: (state) => {
      state.sessionId = uuidv4();
      state.customerId = null;
      state.verified = false;
    },
    restoreSession: (state, action: PayloadAction<SessionState>) => {
      state.sessionId = action.payload.sessionId;
      state.customerId = action.payload.customerId;
      state.verified = action.payload.verified;
    },
  },
});

export const { setCustomerId, setVerified, resetSession, restoreSession } = sessionSlice.actions;
export default sessionSlice.reducer;
