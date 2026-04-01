import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Role } from '@/constants/roles';

interface FinanceUser {
  name: string;
  email: string;
  picture?: string;
}

interface FinanceAuthState {
  user: FinanceUser | null;
  token: string | null;
  role: Role;
  isAuthenticated: boolean;
}

const saved = localStorage.getItem('finance-user');

const initialState: FinanceAuthState = {
  user: saved ? (JSON.parse(saved) as FinanceUser) : null,
  token: null,
  role: 'viewer',
  isAuthenticated: !!saved,
};

export const financeAuthSlice = createSlice({
  name: 'financeAuth',
  initialState,
  reducers: {
    setFinanceAuth: (
      state,
      { payload }: PayloadAction<{ user: FinanceUser; token: string; role: Role }>,
    ) => {
      state.user = payload.user;
      state.token = payload.token;
      state.role = payload.role;
      state.isAuthenticated = true;
      localStorage.setItem('finance-user', JSON.stringify(payload.user));
    },
    setFinanceRole: (state, { payload }: PayloadAction<Role>) => {
      state.role = payload;
    },
    clearFinanceAuth: (state) => {
      state.user = null;
      state.token = null;
      state.role = 'viewer';
      state.isAuthenticated = false;
      localStorage.removeItem('finance-user');
    },
  },
});

export const { setFinanceAuth, setFinanceRole, clearFinanceAuth } = financeAuthSlice.actions;
export const financeAuthReducer = financeAuthSlice.reducer;

export const selectFinanceAuth = (s: { financeAuth: FinanceAuthState }) => s.financeAuth;
export const selectFinanceUser = (s: { financeAuth: FinanceAuthState }) => s.financeAuth.user;
export const selectFinanceRole = (s: { financeAuth: FinanceAuthState }) => s.financeAuth.role;
export const selectFinanceIsAuthenticated = (s: { financeAuth: FinanceAuthState }) =>
  s.financeAuth.isAuthenticated;
