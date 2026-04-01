import { useQuery } from '@tanstack/react-query';
import { summaryService } from '@/services/summary.service';
import type { MonthlySummary } from '@/types/transaction.types';
import type { AxiosResponse } from 'axios';

/** Returns monthly income/expense/balance summary data. */
export function useSummary() {
  return useQuery<MonthlySummary[]>({
    queryKey: ['summary', 'totals'],
    queryFn: () =>
      summaryService
        .getSummary()
        .then((r: AxiosResponse<{ data: MonthlySummary[] }>) => r.data.data),
  });
}
