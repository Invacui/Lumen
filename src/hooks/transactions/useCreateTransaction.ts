import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { transactionService } from '@/services/transaction.service';
import type { CreateTransactionDto } from '@/types/transaction.types';

/** Mutation hook to create a new transaction. */
export function useCreateTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateTransactionDto) => transactionService.create(dto),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['transactions'] });
      void qc.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Transaction added');
    },
    onError: () => toast.error('Failed to add transaction'),
  });
}
