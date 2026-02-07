import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, Customer } from '../types';

const initialState: AuthState = {
  customer: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.customer = action.payload;
      state.isAuthenticated = action.payload !== null;
    },
    logout: (state) => {
      state.customer = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCustomer, logout } = authSlice.actions;
export default authSlice.reducer;
