import { financeApi } from '@/lib/financeApi';

export const summaryService = {
  getSummary: () => financeApi.get('/summary'),
  getInsights: () => financeApi.get('/insights'),
};
