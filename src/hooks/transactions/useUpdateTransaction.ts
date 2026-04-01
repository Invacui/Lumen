import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { transactionService } from '@/services/transaction.service';
import type { UpdateTransactionDto } from '@/types/transaction.types';

/** Mutation hook to update an existing transaction. */
export function useUpdateTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTransactionDto }) =>
      transactionService.update(id, dto),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['transactions'] });
      void qc.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Transaction updated');
    },
    onError: () => toast.error('Failed to update transaction'),
  });
}
