export type TransactionType = 'income' | 'expense';
export type Category = 'Food' | 'Transport' | 'Utilities' | 'Entertainment' | 'Health' | 'Income';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string; // ISO date string
  note?: string;
}

export interface CreateTransactionDto {
  title: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
  note?: string;
}

export type UpdateTransactionDto = Partial<CreateTransactionDto>;

export interface TransactionFilters {
  type?: TransactionType | 'all';
  category?: Category | 'all';
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
}

export interface MonthlySummary {
  month: string; // e.g. "Jan 2025"
  income: number;
  expenses: number;
  balance: number;
}

export interface InsightData {
  topCategory: Category;
  topCategoryAmount: number;
  biggestTransaction: Transaction;
  trendText: string;
  categoryBreakdown: { category: Category; amount: number; percentage: number }[];
}
