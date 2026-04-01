import { z } from 'zod';

export const createTransactionSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  amount: z.coerce.number().positive('Amount must be positive'),
  type: z.enum(['income', 'expense']),
  category: z.enum(['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Income']),
  date: z.string().min(1, 'Date is required'),
  note: z.string().max(200).optional(),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export type CreateTransactionDto = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionDto = z.infer<typeof updateTransactionSchema>;
