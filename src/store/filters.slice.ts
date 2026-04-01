import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TransactionType, Category } from '@/types/transaction.types';

export interface FiltersState {
  type: TransactionType | 'all';
  category: Category | 'all';
  dateFrom: string | null;
  dateTo: string | null;
  search: string;
}

const initialFilters: FiltersState = {
  type: 'all',
  category: 'all',
  dateFrom: null,
  dateTo: null,
  search: '',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialFilters,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<Partial<FiltersState>>) => ({
      ...state,
      ...payload,
    }),
    resetFilters: () => initialFilters,
  },
});

export const { setFilter, resetFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

export const selectFilters = (s: { filters: FiltersState }) => s.filters;
