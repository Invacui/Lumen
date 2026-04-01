import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { SummaryCard } from './SummaryCard';
import { useSummary } from '@/hooks/summary/useSummary';

/** Grid of four KPI cards computed from the latest monthly summary. */
export function SummaryGrid() {
  const { data, isLoading } = useSummary();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  const latest = data?.[data.length - 1];
  const prev = data && data.length >= 2 ? data[data.length - 2] : undefined;

  const balance = latest?.balance ?? 0;
  const income = latest?.income ?? 0;
  const expenses = latest?.expenses ?? 0;
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  const incomeTrend = prev && prev.income > 0 ? ((income - prev.income) / prev.income) * 100 : undefined;
  const expenseTrend = prev && prev.expenses > 0 ? ((expenses - prev.expenses) / prev.expenses) * 100 : undefined;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Total Balance"
        value={balance}
        icon={<Wallet className="h-4 w-4" />}
        color="blue"
      />
      <SummaryCard
        title="Monthly Income"
        value={income}
        icon={<TrendingUp className="h-4 w-4" />}
        color="green"
        {...(incomeTrend !== undefined ? { trend: incomeTrend } : {})}
      />
      <SummaryCard
        title="Monthly Expenses"
        value={expenses}
        icon={<TrendingDown className="h-4 w-4" />}
        color="red"
        {...(expenseTrend !== undefined ? { trend: expenseTrend } : {})}
      />
      <SummaryCard
        title="Savings Rate"
        value={`${savingsRate.toFixed(0)}%`}
        isCurrency={false}
        icon={<PiggyBank className="h-4 w-4" />}
        color="purple"
      />
    </div>
  );
}
