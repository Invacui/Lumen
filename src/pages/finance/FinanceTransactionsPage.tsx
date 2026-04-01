import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilterBar } from '@/components/finance/transactions/FilterBar';
import { TransactionTable } from '@/components/finance/transactions/TransactionTable';
import { AddTransactionModal } from '@/components/finance/transactions/AddTransactionModal';
import { useFinanceRole } from '@/hooks/useFinanceRole';

/** Transactions page with filter bar, table and admin add-transaction action. */
export default function FinanceTransactionsPage() {
  const { isAdmin } = useFinanceRole();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="mt-1 text-sm text-muted-foreground">Browse and manage your transactions.</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowAdd(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        )}
      </div>

      {/* Filters */}
      <FilterBar />

      {/* Table */}
      <TransactionTable />

      {/* Modal */}
      {showAdd && <AddTransactionModal onClose={() => setShowAdd(false)} />}
    </motion.div>
  );
}
