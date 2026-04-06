import type { Transaction } from '@/types/transaction.types';

let nextId = 1;
const makeId = () => `txn-${String(nextId++).padStart(3, '0')}`;

const monthSeeds = [
  { month: 1, incomeA: 5000, incomeB: 1200, expenseBase: 3800 },
  { month: 2, incomeA: 4900, incomeB: 900, expenseBase: 3550 },
  { month: 3, incomeA: 5600, incomeB: 1400, expenseBase: 4100 },
  { month: 4, incomeA: 5200, incomeB: 1200, expenseBase: 3950 },
  { month: 5, incomeA: 6100, incomeB: 1500, expenseBase: 4700 },
  { month: 6, incomeA: 5500, incomeB: 1400, expenseBase: 4550 },
  { month: 7, incomeA: 6400, incomeB: 1800, expenseBase: 5300 },
  { month: 8, incomeA: 6200, incomeB: 1600, expenseBase: 5000 },
  { month: 9, incomeA: 5900, incomeB: 1500, expenseBase: 4850 },
  { month: 10, incomeA: 6500, incomeB: 1500, expenseBase: 5600 },
  { month: 11, incomeA: 6100, incomeB: 1600, expenseBase: 5100 },
  { month: 12, incomeA: 7200, incomeB: 1900, expenseBase: 6200 },
];

function d(month: number, day: number): string {
  return `2025-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export const mockTransactions: Transaction[] = monthSeeds.flatMap((seed) => {
  const m = seed.month;
  const food = Math.round(seed.expenseBase * 0.28);
  const transport = Math.round(seed.expenseBase * 0.16);
  const utilities = Math.round(seed.expenseBase * 0.24);
  const entertainment = Math.round(seed.expenseBase * 0.14);
  const health = Math.round(seed.expenseBase * 0.18);

  return [
    { id: makeId(), title: 'Salary', amount: seed.incomeA, type: 'income', category: 'Income', date: d(m, 1) },
    { id: makeId(), title: 'Freelance Project', amount: seed.incomeB, type: 'income', category: 'Income', date: d(m, 18) },
    { id: makeId(), title: 'Grocery Store', amount: Math.round(food * 0.45), type: 'expense', category: 'Food', date: d(m, 3) },
    { id: makeId(), title: 'Restaurant', amount: Math.round(food * 0.3), type: 'expense', category: 'Food', date: d(m, 12) },
    { id: makeId(), title: 'Coffee Shop', amount: Math.round(food * 0.25), type: 'expense', category: 'Food', date: d(m, 21) },
    { id: makeId(), title: 'Fuel & Commute', amount: Math.round(transport * 0.7), type: 'expense', category: 'Transport', date: d(m, 8) },
    { id: makeId(), title: 'Cab Rides', amount: Math.round(transport * 0.3), type: 'expense', category: 'Transport', date: d(m, 24) },
    { id: makeId(), title: 'Electricity Bill', amount: Math.round(utilities * 0.5), type: 'expense', category: 'Utilities', date: d(m, 5) },
    { id: makeId(), title: 'Internet & Phone', amount: Math.round(utilities * 0.5), type: 'expense', category: 'Utilities', date: d(m, 6) },
    { id: makeId(), title: 'Streaming & Leisure', amount: Math.round(entertainment * 0.55), type: 'expense', category: 'Entertainment', date: d(m, 14) },
    { id: makeId(), title: 'Shopping & Movies', amount: Math.round(entertainment * 0.45), type: 'expense', category: 'Entertainment', date: d(m, 27) },
    { id: makeId(), title: 'Fitness & Medical', amount: Math.round(health * 0.7), type: 'expense', category: 'Health', date: d(m, 11) },
    { id: makeId(), title: 'Pharmacy', amount: Math.round(health * 0.3), type: 'expense', category: 'Health', date: d(m, 25) },
  ];
});

/** In-memory store for mutations */
export let inMemoryTransactions: Transaction[] = [...mockTransactions];

export function resetTransactions(): void {
  inMemoryTransactions = [...mockTransactions];
}
