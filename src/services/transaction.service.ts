import { financeApi } from '@/lib/financeApi';
import type { TransactionFilters, CreateTransactionDto, UpdateTransactionDto } from '@/types/transaction.types';

export const transactionService = {
  list: (filters?: TransactionFilters) =>
    financeApi.get('/transactions', { params: filters }),
  get: (id: string) => financeApi.get(`/transactions/${id}`),
  create: (dto: CreateTransactionDto) => financeApi.post('/transactions', dto),
  update: (id: string, dto: UpdateTransactionDto) =>
    financeApi.patch(`/transactions/${id}`, dto),
  remove: (id: string) => financeApi.delete(`/transactions/${id}`),
};
