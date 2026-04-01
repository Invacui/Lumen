import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { inMemoryTransactions } from '@/data/transactions.mock';
import { mockMonthlySummaries } from '@/data/summary.mock';
import type { Transaction, CreateTransactionDto, UpdateTransactionDto, TransactionFilters } from '@/types/transaction.types';

export const financeApi = axios.create({ baseURL: '/finance-api' });

const mock = new MockAdapter(financeApi, { delayResponse: 300 });

// GET /transactions
mock.onGet('/transactions').reply((config) => {
  const params = config.params as TransactionFilters | undefined;
  let results = [...inMemoryTransactions];

  if (params?.type && params.type !== 'all') {
    results = results.filter((t) => t.type === params.type);
  }
  if (params?.category && params.category !== 'all') {
    results = results.filter((t) => t.category === params.category);
  }
  if (params?.dateFrom) {
    results = results.filter((t) => t.date >= params.dateFrom!);
  }
  if (params?.dateTo) {
    results = results.filter((t) => t.date <= params.dateTo!);
  }
  if (params?.search) {
    const q = params.search.toLowerCase();
    results = results.filter((t) => t.title.toLowerCase().includes(q));
  }

  results.sort((a, b) => b.date.localeCompare(a.date));
  return [200, { success: true, data: results }];
});

// GET /transactions/:id
mock.onGet(/\/transactions\/(.+)/).reply((config) => {
  const id = config.url?.split('/').pop();
  const txn = inMemoryTransactions.find((t) => t.id === id);
  if (!txn) return [404, { success: false, error: 'Transaction not found' }];
  return [200, { success: true, data: txn }];
});

// POST /transactions
mock.onPost('/transactions').reply((config) => {
  const dto = JSON.parse(config.data as string) as CreateTransactionDto;
  const newTxn: Transaction = {
    ...dto,
    id: `txn-${Date.now()}`,
  };
  inMemoryTransactions.unshift(newTxn);
  return [201, { success: true, data: newTxn }];
});

// PATCH /transactions/:id
mock.onPatch(/\/transactions\/(.+)/).reply((config) => {
  const id = config.url?.split('/').pop();
  const dto = JSON.parse(config.data as string) as UpdateTransactionDto;
  const idx = inMemoryTransactions.findIndex((t) => t.id === id);
  if (idx === -1) return [404, { success: false, error: 'Not found' }];
  inMemoryTransactions[idx] = { ...inMemoryTransactions[idx]!, ...dto };
  return [200, { success: true, data: inMemoryTransactions[idx] }];
});

// DELETE /transactions/:id
mock.onDelete(/\/transactions\/(.+)/).reply((config) => {
  const id = config.url?.split('/').pop();
  const idx = inMemoryTransactions.findIndex((t) => t.id === id);
  if (idx === -1) return [404, { success: false, error: 'Not found' }];
  inMemoryTransactions.splice(idx, 1);
  return [200, { success: true }];
});

// GET /summary
mock.onGet('/summary').reply(() => {
  return [200, { success: true, data: mockMonthlySummaries }];
});

// GET /insights
mock.onGet('/insights').reply(() => {
  const marchExpenses = inMemoryTransactions.filter(
    (t) => t.type === 'expense' && t.date.startsWith('2025-03'),
  );
  const categoryTotals = marchExpenses.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + t.amount;
    return acc;
  }, {});
  const totalExpenses = Object.values(categoryTotals).reduce((a, b) => a + b, 0);
  const topCategory = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0];
  const biggestTxn = [...marchExpenses].sort((a, b) => b.amount - a.amount)[0];

  const categoryBreakdown = Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
    percentage: totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0,
  }));

  const febFood = inMemoryTransactions
    .filter((t) => t.category === 'Food' && t.date.startsWith('2025-02') && t.type === 'expense')
    .reduce((a, t) => a + t.amount, 0);
  const marFood = inMemoryTransactions
    .filter((t) => t.category === 'Food' && t.date.startsWith('2025-03') && t.type === 'expense')
    .reduce((a, t) => a + t.amount, 0);
  const pct = febFood > 0 ? Math.round(((marFood - febFood) / febFood) * 100) : 0;
  const trendText =
    pct >= 0
      ? `You spent ${pct}% more on Food this month`
      : `You spent ${Math.abs(pct)}% less on Food this month`;

  return [
    200,
    {
      success: true,
      data: {
        topCategory: topCategory?.[0] ?? 'Food',
        topCategoryAmount: topCategory?.[1] ?? 0,
        biggestTransaction: biggestTxn,
        trendText,
        categoryBreakdown,
      },
    },
  ];
});
