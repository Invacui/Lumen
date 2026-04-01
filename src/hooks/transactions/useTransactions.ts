import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/store/hooks';
import { selectFilters } from '@/store/filters.slice';
import { transactionService } from '@/services/transaction.service';
import type { Transaction } from '@/types/transaction.types';
import type { AxiosResponse } from 'axios';

/** Returns filtered, sorted transactions from the mock API. */
export function useTransactions() {
  const filters = useAppSelector(selectFilters);
  return useQuery<Transaction[]>({
    queryKey: ['transactions', 'list', filters],
    queryFn: () =>
      transactionService
        .list(filters)
        .then((r: AxiosResponse<{ data: Transaction[] }>) => r.data.data),
  });
}
