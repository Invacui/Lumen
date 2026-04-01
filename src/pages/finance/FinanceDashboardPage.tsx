import { motion } from 'framer-motion';
import { SummaryGrid } from '@/components/finance/dashboard/SummaryGrid';
import { BalanceTrendChart } from '@/components/finance/dashboard/BalanceTrendChart';
import { SpendingDonutChart } from '@/components/finance/dashboard/SpendingDonutChart';
import { useAppSelector } from '@/store/hooks';
import { selectFinanceUser } from '@/store/financeAuth.slice';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/** Finance dashboard overview page with KPI cards and charts. */
export default function FinanceDashboardPage() {
  const user = useAppSelector(selectFinanceUser);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold">
          Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's an overview of your finances for March 2025.
        </p>
      </motion.div>

      {/* KPI cards */}
      <motion.div variants={item}>
        <SummaryGrid />
      </motion.div>

      {/* Charts row */}
      <motion.div variants={item} className="grid gap-6 lg:grid-cols-2">
        <BalanceTrendChart />
        <SpendingDonutChart />
      </motion.div>
    </motion.div>
  );
}
