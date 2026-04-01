import type { Transaction } from '@/types/transaction.types';

let nextId = 1;
const makeId = () => `txn-${String(nextId++).padStart(3, '0')}`;

export const mockTransactions: Transaction[] = [
  // January 2025 - Income
  { id: makeId(), title: 'Salary', amount: 5000, type: 'income', category: 'Income', date: '2025-01-01' },
  { id: makeId(), title: 'Freelance Project', amount: 1200, type: 'income', category: 'Income', date: '2025-01-15' },
  // January expenses
  { id: makeId(), title: 'Grocery Store', amount: 180, type: 'expense', category: 'Food', date: '2025-01-03' },
  { id: makeId(), title: 'Restaurant Dinner', amount: 65, type: 'expense', category: 'Food', date: '2025-01-07' },
  { id: makeId(), title: 'Coffee Shop', amount: 25, type: 'expense', category: 'Food', date: '2025-01-10' },
  { id: makeId(), title: 'Uber Ride', amount: 22, type: 'expense', category: 'Transport', date: '2025-01-04' },
  { id: makeId(), title: 'Gas Station', amount: 60, type: 'expense', category: 'Transport', date: '2025-01-09' },
  { id: makeId(), title: 'Train Pass', amount: 85, type: 'expense', category: 'Transport', date: '2025-01-01' },
  { id: makeId(), title: 'Electricity Bill', amount: 120, type: 'expense', category: 'Utilities', date: '2025-01-05' },
  { id: makeId(), title: 'Internet Bill', amount: 60, type: 'expense', category: 'Utilities', date: '2025-01-05' },
  { id: makeId(), title: 'Netflix', amount: 18, type: 'expense', category: 'Entertainment', date: '2025-01-12' },
  { id: makeId(), title: 'Cinema', amount: 35, type: 'expense', category: 'Entertainment', date: '2025-01-20' },
  { id: makeId(), title: 'Gym Membership', amount: 50, type: 'expense', category: 'Health', date: '2025-01-01' },
  { id: makeId(), title: 'Pharmacy', amount: 30, type: 'expense', category: 'Health', date: '2025-01-18' },
  // February 2025 - Income
  { id: makeId(), title: 'Salary', amount: 5000, type: 'income', category: 'Income', date: '2025-02-01' },
  { id: makeId(), title: 'Side Project', amount: 800, type: 'income', category: 'Income', date: '2025-02-20' },
  // February expenses
  { id: makeId(), title: 'Grocery Store', amount: 210, type: 'expense', category: 'Food', date: '2025-02-02' },
  { id: makeId(), title: 'Restaurant Lunch', amount: 45, type: 'expense', category: 'Food', date: '2025-02-08' },
  { id: makeId(), title: 'Coffee Shop', amount: 30, type: 'expense', category: 'Food', date: '2025-02-12' },
  { id: makeId(), title: 'Supermarket', amount: 95, type: 'expense', category: 'Food', date: '2025-02-22' },
  { id: makeId(), title: 'Taxi', amount: 18, type: 'expense', category: 'Transport', date: '2025-02-05' },
  { id: makeId(), title: 'Gas Station', amount: 55, type: 'expense', category: 'Transport', date: '2025-02-14' },
  { id: makeId(), title: 'Electricity Bill', amount: 115, type: 'expense', category: 'Utilities', date: '2025-02-05' },
  { id: makeId(), title: 'Water Bill', amount: 40, type: 'expense', category: 'Utilities', date: '2025-02-06' },
  { id: makeId(), title: 'Spotify', amount: 10, type: 'expense', category: 'Entertainment', date: '2025-02-01' },
  { id: makeId(), title: 'Gaming', amount: 60, type: 'expense', category: 'Entertainment', date: '2025-02-18' },
  { id: makeId(), title: 'Gym Membership', amount: 50, type: 'expense', category: 'Health', date: '2025-02-01' },
  { id: makeId(), title: 'Doctor Visit', amount: 80, type: 'expense', category: 'Health', date: '2025-02-25' },
  // March 2025 - Income
  { id: makeId(), title: 'Salary', amount: 5000, type: 'income', category: 'Income', date: '2025-03-01' },
  { id: makeId(), title: 'Bonus', amount: 500, type: 'income', category: 'Income', date: '2025-03-15' },
  { id: makeId(), title: 'Freelance Work', amount: 1500, type: 'income', category: 'Income', date: '2025-03-22' },
  // March expenses
  { id: makeId(), title: 'Grocery Store', amount: 195, type: 'expense', category: 'Food', date: '2025-03-03' },
  { id: makeId(), title: 'Restaurant Dinner', amount: 75, type: 'expense', category: 'Food', date: '2025-03-10' },
  { id: makeId(), title: 'Coffee Shop', amount: 28, type: 'expense', category: 'Food', date: '2025-03-15' },
  { id: makeId(), title: 'Bakery', amount: 20, type: 'expense', category: 'Food', date: '2025-03-20' },
  { id: makeId(), title: 'Uber Ride', amount: 25, type: 'expense', category: 'Transport', date: '2025-03-06' },
  { id: makeId(), title: 'Parking Fee', amount: 15, type: 'expense', category: 'Transport', date: '2025-03-11' },
  { id: makeId(), title: 'Gas Station', amount: 70, type: 'expense', category: 'Transport', date: '2025-03-18' },
  { id: makeId(), title: 'Electricity Bill', amount: 105, type: 'expense', category: 'Utilities', date: '2025-03-05' },
  { id: makeId(), title: 'Internet Bill', amount: 60, type: 'expense', category: 'Utilities', date: '2025-03-05' },
  { id: makeId(), title: 'Phone Bill', amount: 45, type: 'expense', category: 'Utilities', date: '2025-03-08' },
  { id: makeId(), title: 'Netflix', amount: 18, type: 'expense', category: 'Entertainment', date: '2025-03-01' },
  { id: makeId(), title: 'Concert Tickets', amount: 120, type: 'expense', category: 'Entertainment', date: '2025-03-25' },
  { id: makeId(), title: 'Gym Membership', amount: 50, type: 'expense', category: 'Health', date: '2025-03-01' },
  { id: makeId(), title: 'Vitamins', amount: 35, type: 'expense', category: 'Health', date: '2025-03-12' },
  { id: makeId(), title: 'Dentist', amount: 150, type: 'expense', category: 'Health', date: '2025-03-28' },
];

/** In-memory store for mutations */
export let inMemoryTransactions: Transaction[] = [...mockTransactions];

export function resetTransactions(): void {
  inMemoryTransactions = [...mockTransactions];
}
