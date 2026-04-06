import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth.slice';
import { uiReducer } from './ui.slice';
import { filtersReducer } from './filters.slice';
import { financeAuthReducer } from './financeAuth.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    filters: filtersReducer,
    financeAuth: financeAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;