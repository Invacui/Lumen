import { motion } from 'framer-motion';
import { TrendingUp, Award, ArrowBigUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { MonthlyBarChart } from '@/components/finance/insights/MonthlyBarChart';
import { InsightCard } from '@/components/finance/insights/InsightCard';
import { TopCategoryBadge } from '@/components/finance/insights/TopCategoryBadge';
import { SpendingDonutChart } from '@/components/finance/dashboard/SpendingDonutChart';
import { useInsights } from '@/hooks/summary/useInsights';
import { formatCurrency } from '@/lib/utils';
import type { Category } from '@/types/transaction.types';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

/** Insights page with spending analysis and month-over-month trends. */
export default function FinanceInsightsPage() {
  const { data, isLoading } = useInsights();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold">Insights</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Spending patterns and trends for March 2025.
        </p>
      </motion.div>

      {/* Insight cards */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)
        ) : (
          <>
            <InsightCard
              title="Top Spending Category"
              value={data?.topCategory ?? '—'}
              description={data ? formatCurrency(data.topCategoryAmount) + ' this month' : ''}
              icon={<Award className="h-5 w-5" />}
              accent="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
            />
            <InsightCard
              title="Biggest Transaction"
              value={data?.biggestTransaction ? data.biggestTransaction.title : '—'}
              description={
                data?.biggestTransaction
                  ? `${formatCurrency(data.biggestTransaction.amount)} · ${data.biggestTransaction.category}`
                  : ''
              }
              icon={<ArrowBigUp className="h-5 w-5" />}
              accent="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            />
            <InsightCard
              title="Food Spending Trend"
              value={data?.trendText ?? '—'}
              icon={<TrendingUp className="h-5 w-5" />}
              accent="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            />
          </>
        )}
      </motion.div>

      {/* Top category breakdown */}
      {!isLoading && data && (
        <motion.div variants={item}>
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Category Breakdown
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.categoryBreakdown
              .sort((a, b) => b.amount - a.amount)
              .map((item) => (
                <TopCategoryBadge
                  key={item.category}
                  category={item.category as Category}
                  amount={item.amount}
                />
              ))}
          </div>
        </motion.div>
      )}

      {/* Charts */}
      <motion.div variants={item} className="grid gap-6 lg:grid-cols-2">
        <MonthlyBarChart />
        <SpendingDonutChart />
      </motion.div>
    </motion.div>
  );
}
