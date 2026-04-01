import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateTransaction } from '@/hooks/transactions/useUpdateTransaction';
import { createTransactionSchema } from '@/schemas/transaction.schema';
import type { CreateTransactionDto } from '@/types/transaction.types';
import { CATEGORIES } from '@/constants/categories';
import type { Transaction } from '@/types/transaction.types';

interface EditTransactionModalProps {
  transaction: Transaction;
  onClose: () => void;
}

/** Modal form to edit an existing transaction, pre-filled with current values. */
export function EditTransactionModal({ transaction, onClose }: EditTransactionModalProps) {
  const { mutate, isPending } = useUpdateTransaction();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateTransactionDto>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(createTransactionSchema) as any,
    defaultValues: {
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: transaction.date,
      note: transaction.note ?? '',
    },
  });

  const typeValue = watch('type');
  const categoryValue = watch('category');

  const onSubmit = (dto: CreateTransactionDto) => {
    mutate({ id: transaction.id, dto }, { onSuccess: onClose });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Title</label>
            <Input placeholder="e.g. Grocery Store" {...register('title')} />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Amount */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Amount ($)</label>
              <Input type="number" step="0.01" min="0" {...register('amount')} />
              {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
            </div>
            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Date</label>
              <Input type="date" {...register('date')} />
              {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Type */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Type</label>
              <Select
                value={typeValue}
                onValueChange={(v) => setValue('type', v as CreateTransactionDto['type'])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={categoryValue}
                onValueChange={(v) => setValue('category', v as CreateTransactionDto['category'])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Note */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Note (optional)</label>
            <Input placeholder="Any extra details…" {...register('note')} />
            {errors.note && <p className="text-xs text-destructive">{errors.note.message}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving…' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

