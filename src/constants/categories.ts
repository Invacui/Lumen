import type { Category } from '@/types/transaction.types';

export const CATEGORIES: Category[] = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Income'];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: '#f97316',
  Transport: '#3b82f6',
  Utilities: '#8b5cf6',
  Entertainment: '#ec4899',
  Health: '#10b981',
  Income: '#22c55e',
};

export const CATEGORY_BG: Record<Category, string> = {
  Food: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Transport: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Utilities: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Entertainment: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  Health: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Income: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};
