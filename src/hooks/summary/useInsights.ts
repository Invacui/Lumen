import { useQuery } from '@tanstack/react-query';
import { summaryService } from '@/services/summary.service';
import type { InsightData } from '@/types/transaction.types';
import type { AxiosResponse } from 'axios';

/** Returns computed insight data for the current month. */
export function useInsights() {
  return useQuery<InsightData>({
    queryKey: ['summary', 'insights'],
    queryFn: () =>
      summaryService
        .getInsights()
        .then((r: AxiosResponse<{ data: InsightData }>) => r.data.data),
  });
}
