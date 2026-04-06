import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilterBar } from '@/components/finance/transactions/FilterBar';
import { TransactionTable } from '@/components/finance/transactions/TransactionTable';
import { AddTransactionModal } from '@/components/finance/transactions/AddTransactionModal';
import { useFinanceRole } from '@/hooks/useFinanceRole';
import { useTransactions } from '@/hooks/transactions/useTransactions';
import { useTransactionFiltersUrl } from '@/hooks/transactions/useTransactionFiltersUrl';
import { formatDate } from '@/lib/utils';

/** Transactions page with filter bar, table and admin add-transaction action. */
export default function FinanceTransactionsPage() {
  const { isAdmin } = useFinanceRole();
  const [showAdd, setShowAdd] = useState(false);
  const { data = [] } = useTransactions();

  useTransactionFiltersUrl();

  const handleExport = () => {
    const header = ['Date', 'Title', 'Category', 'Type', 'Amount', 'Note'];
    const rows = data.map((txn) => [
      formatDate(txn.date),
      txn.title,
      txn.category,
      txn.type,
      String(txn.amount),
      txn.note ?? '',
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions-export-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-white">Transactions</h1>
          <p className="mt-1 text-sm text-muted-foreground">Browse and manage your transactions.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          {isAdmin && (
            <Button onClick={() => setShowAdd(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Transaction
            </Button>
          )}
        </div>
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
