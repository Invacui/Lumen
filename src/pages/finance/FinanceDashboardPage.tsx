import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { Download, Filter, MoreHorizontal, Users, Wallet, PiggyBank, ReceiptText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';
import { selectFinanceUser } from '@/store/financeAuth.slice';
import { useSummary } from '@/hooks/summary/useSummary';
import { useInsights } from '@/hooks/summary/useInsights';
import { transactionService } from '@/services/transaction.service';
import { formatCurrency, formatDate } from '@/lib/utils';
import Pyramid from '@/assets/images/pyramid.jpg'
import type { Transaction } from '@/types/transaction.types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function FinanceDashboardPage() {
  const [rangeFilter, setRangeFilter] = useState<'30d' | '90d' | '1y'>('90d');
  const user = useAppSelector(selectFinanceUser);
  const { data: summary = [] } = useSummary();
  const { data: insights } = useInsights();
  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ['transactions', 'dashboard-overview'],
    queryFn: () => transactionService.list().then((response) => response.data.data as Transaction[]),
  });

  const latestSummary = summary[summary.length - 1];
  const totalBalance = latestSummary?.balance ?? 0;
  const totalExpenses = latestSummary?.expenses ?? 0;
  const monthlyIncome = latestSummary?.income ?? 0;
  const savingsValue = Math.max(monthlyIncome - totalExpenses, 0);
  const savingsRate = monthlyIncome > 0 ? Math.max((savingsValue / monthlyIncome) * 100, 0) : 0;

  const filteredTransactions = useMemo(() => {
    const days = rangeFilter === '30d' ? 30 : rangeFilter === '90d' ? 90 : 365;
    const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));
    const latestDate = sorted[0]?.date ? new Date(sorted[0].date) : new Date();
    const minDate = new Date(latestDate);
    minDate.setDate(minDate.getDate() - days);
    return transactions.filter((transaction) => new Date(transaction.date) >= minDate);
  }, [rangeFilter, transactions]);

  const expenseTransactions = useMemo(
    () => filteredTransactions.filter((transaction) => transaction.type === 'expense'),
    [filteredTransactions],
  );
  const topExpenses = useMemo(
    () => [...expenseTransactions].sort((a, b) => b.amount - a.amount).slice(0, 5),
    [expenseTransactions],
  );
  const recentTransactions = useMemo(
    () => [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6),
    [transactions],
  );

  const monthlyLabels = summary.map((entry) => entry.month);
  const incomeSeries = summary.map((entry) => entry.income);
  const expenseSeries = summary.map((entry) => entry.expenses);
  const savingsSeries = summary.map((entry) => entry.income - entry.expenses);

  const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const weeklyExpenseMap = expenseTransactions.reduce(
    (acc: Record<string, number>, transaction: Transaction) => {
      const weekday = new Date(transaction.date).toLocaleDateString('en-US', { weekday: 'short' });
      acc[weekday] = (acc[weekday] ?? 0) + transaction.amount;
      return acc;
    },
    {} as Record<string, number>,
  );
  const weeklyExpenseSeries = dayMap.map((day) => weeklyExpenseMap[day] ?? 0);
  const weeklySeriesCap = Math.max(
    2000,
    ...weeklyExpenseSeries.filter((value) => value > 0).sort((a, b) => a - b).slice(-2),
  );
  const weeklyExpenseDisplay = weeklyExpenseSeries.map((value) => Math.min(value, weeklySeriesCap));
  const weeklyYAxisMax = Math.ceil(weeklySeriesCap / 2000) * 2000;

  const sortedTransactions = [...transactions].sort((a, b) => b.date.localeCompare(a.date));
  const latestMonthPrefix = sortedTransactions[0]?.date ? sortedTransactions[0].date.slice(0, 7) : '';
  const totalTransactionsMonth = latestMonthPrefix
    ? transactions.filter((transaction) => transaction.date.startsWith(latestMonthPrefix)).length
    : transactions.length;
  const totalAccounts = new Set(transactions.map((transaction) => transaction.category)).size;

  const categorySeries = insights?.categoryBreakdown.map((item) => item.amount) ?? [];
  const categoryLabels = insights?.categoryBreakdown.map((item) => item.category) ?? [];

  const budgetTotal = Math.max(monthlyIncome, 1);
  const onTrack = Math.min((savingsValue / budgetTotal) * 100, 100);
  const overBudget = Math.max((totalExpenses - monthlyIncome) / budgetTotal, 0) * 100;
  const pending = Math.max(15, 100 - onTrack - overBudget - 20);
  const upcoming = Math.max(5, 100 - onTrack - overBudget - pending);

  const exportDashboardData = () => {
    const header = ['Date', 'Title', 'Category', 'Type', 'Amount'];
    const rows = filteredTransactions.map((transaction) => [
      formatDate(transaction.date),
      transaction.title,
      transaction.category,
      transaction.type,
      String(transaction.amount),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dashboard-export-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const sparklineBase: ApexOptions = {
    chart: { sparkline: { enabled: true }, toolbar: { show: false } },
    stroke: { curve: 'smooth', width: 1.6 },
    tooltip: { enabled: false },
    grid: { show: false },
    xaxis: { labels: { show: false } },
    yaxis: { labels: { show: false } },
  };

  const savingsRadialOptions: ApexOptions = {
    chart: { type: 'radialBar', sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        hollow: { size: '50%' },
        track: { background: 'rgba(255,255,255,0.12)' },
        dataLabels: {
          name: { show: false },
          value: {
            color: '#f4f4f5',
            fontSize: '18px',
            offsetY: 8,
            formatter: (value) => `${value.toFixed(0)}%`,
          },
        },
      },
    },
    colors: ['#8b5cf6'],
  };

  const balanceAnalyticsOptions: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      background: 'transparent',
      zoom: { enabled: false },
    },
    title: {
      text: 'Balance analytics with income & spending (USD)',
      align: 'left',
      style: { fontSize: '11px', fontWeight: '400', color: '#8892a4' },
    },
    stroke: { curve: 'smooth', width: [2, 2, 0], dashArray: [0, 5, 0] },
    fill: { type: ['solid', 'solid', 'solid'], opacity: [1, 1, 0.05] },
    xaxis: { categories: monthlyLabels, labels: { style: { colors: '#9ca3af' } } },
    yaxis: {
      min: 0,
      max: 10000,
      tickAmount: 5,
      labels: {
        style: { colors: '#9ca3af' },
        formatter: (value) => `$${value}`,
      },
    },
    legend: { labels: { colors: '#d1d5db' } },
    grid: { borderColor: 'rgba(255,255,255,0.08)' },
    tooltip: { theme: 'dark' },
    colors: ['rgba(132,90,223,0.85)', 'rgba(35,183,229,0.85)', 'rgba(119,119,142,0.3)'],
    dataLabels: { enabled: false },
    markers: { size: 0 },
  };

  const donutOptions: ApexOptions = {
    labels: categoryLabels,
    stroke: { colors: ['rgba(255,255,255,0.12)'] }, 
    legend: { position: 'bottom', labels: { colors: '#d1d5db' } ,fontSize: '9px'},
    chart: { background: 'transparent' },
    dataLabels: { enabled: true },
    tooltip: { theme: 'dark' },
    plotOptions: { pie: { donut: { size: '50%' } } },
    colors: ['#f59e0b', '#06b6d4', '#a855f7', '#10b981', '#f97316', '#22c55e'],
  };

  const weeklyBarOptions: ApexOptions = {
    chart: { toolbar: { show: false }, background: 'transparent' },
    xaxis: { categories: weekdayLabels, labels: { style: { colors: '#9ca3af' } } },
    yaxis: {
      min: 0,
      max: weeklyYAxisMax,
      tickAmount: 4,
      labels: { style: { colors: '#9ca3af' } },
    },
    grid: { borderColor: 'rgba(255,255,255,0.08)' },
    tooltip: { theme: 'dark' },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '48%' } },
    colors: ['#8b5cf6'],
  };

  const quickTrend = monthlyLabels.map((_, index) => index + 1);
  const accountsSparkSeries = quickTrend.map((point) => totalAccounts + (point % 2));
  const balanceSparkSeries = summary.map((entry) => entry.balance);
  const savingsSparkSeries = summary.map((entry) =>
    entry.income > 0 ? ((entry.income - entry.expenses) / entry.income) * 100 : 0,
  );
  const transactionSparkSeries = quickTrend.map((point) => totalTransactionsMonth - (quickTrend.length - point));

  const headerText = user?.name ? `Welcome back, ${user.name} !` : 'Welcome back !';

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4 pb-2">
      <motion.div variants={item} className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-white">{headerText}</h1>
          <p className="mt-1 text-xs text-zinc-400">Track your sales, activity, leads and deals here.</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="gap-1 text-white  bg-violet-600 hover:bg-violet-500">
                <Filter className="h-3.5 w-3.5" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setRangeFilter('30d')}>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRangeFilter('90d')}>Last 90 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRangeFilter('1y')}>Last 1 year</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            size="sm"
            variant="outline"
            onClick={exportDashboardData}
            className="gap-1 border-cyan-500/40 bg-transparent text-cyan-300 hover:bg-cyan-500/10"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid gap-4 xl:grid-cols-[23%_53%_24%]">
        <div className="space-y-4">
            <Card style={{ backgroundImage: `url(${Pyramid})` }} className="flex justify-evenly bg-cover pt-6 border-white/10 bg-[#11131a]">
            <CardContent className="py-2 flex-row items-center justify-between mt-0  ">
            <CardTitle className="text-sm text-white">Your savings are lacking</CardTitle>
              <div className="space-y-1 mt-0 ">
                <p className="text-xs text-zinc-400">
                  You have saved {savingsRate.toFixed(2)}% of your monthly goal.
                </p>
                <p className="text-xs  text-violet-300">Check your progress</p>
              </div>
            </CardContent>
            <CardHeader className="p-0  flex items-start justify-start ">
            <ReactApexChart
                type="radialBar"
                width={100}
                height={100}
                // className="bc "
                series={[Math.min(savingsRate, 100)]}
                options={savingsRadialOptions}
              />
            </CardHeader>
          </Card>

          <Card className="border-white/10 bg-[#11131a]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-white">Top Expenses</CardTitle>
              <MoreHorizontal className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent className="space-y-3">
              {topExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-100">{expense.title}</p>
                    <p className="text-xs text-zinc-500">
                      {expense.title.toLowerCase().replaceAll(' ', '')}@expensemail.com
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-zinc-100">{formatCurrency(expense.amount)}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-[#11131a]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white">Spending This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <ReactApexChart
                type="bar"
                height={180}
                options={weeklyBarOptions}
                series={[{ name: 'Spent', data: weeklyExpenseDisplay }]}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-white/10 bg-[#11131a]">
              <CardHeader className="pb-1">
                <CardTitle className="flex items-center gap-2 text-xs text-zinc-300">
                  <span className="rounded-full bg-violet-500 p-1.5 text-white"><Users className="h-3.5 w-3.5" /></span>
                  Total Accounts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-2xl font-semibold text-zinc-100">{Number(totalAccounts).toLocaleString()}</p>
                <ReactApexChart
                  type="line"
                  height={45}
                  series={[{ name: 'accounts', data: accountsSparkSeries }]}
                  options={{ ...sparklineBase, colors: ['#8b5cf6'] }}
                />
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-violet-400">View All -&gt;</span>
                  <span className="text-emerald-400">+40% <span className="text-zinc-500">this month</span></span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-[#11131a]">
              <CardHeader className="pb-1">
                <CardTitle className="flex items-center gap-2 text-xs text-zinc-300">
                  <span className="rounded-full bg-cyan-500 p-1.5 text-white"><Wallet className="h-3.5 w-3.5" /></span>
                  Total Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-2xl font-semibold text-zinc-100">{formatCurrency(totalBalance)}</p>
                <ReactApexChart
                  type="line"
                  height={45}
                  series={[{ name: 'balance', data: balanceSparkSeries }]}
                  options={{ ...sparklineBase, colors: ['#06b6d4'] }}
                />
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-violet-400">View All -&gt;</span>
                  <span className="text-emerald-400">+25% <span className="text-zinc-500">this month</span></span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-[#11131a]">
              <CardHeader className="pb-1">
                <CardTitle className="flex items-center gap-2 text-xs text-zinc-300">
                  <span className="rounded-full bg-emerald-500 p-1.5 text-white"><PiggyBank className="h-3.5 w-3.5" /></span>
                  Savings Rate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-2xl font-semibold text-zinc-100">{savingsRate.toFixed(2)}%</p>
                <ReactApexChart
                  type="line"
                  height={45}
                  series={[{ name: 'rate', data: savingsSparkSeries }]}
                  options={{ ...sparklineBase, colors: ['#22c55e'] }}
                />
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-violet-400">View All -&gt;</span>
                  <span className="text-rose-400">-12% <span className="text-zinc-500">this month</span></span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-[#11131a]">
              <CardHeader className="pb-1">
                <CardTitle className="flex items-center gap-2 text-xs text-zinc-300">
                  <span className="rounded-full bg-amber-500 p-1.5 text-white"><ReceiptText className="h-3.5 w-3.5" /></span>
                  Total Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-2xl font-semibold text-zinc-100">{totalTransactionsMonth}</p>
                <ReactApexChart
                  type="line"
                  height={45}
                  series={[{ name: 'transactions', data: transactionSparkSeries }]}
                  options={{ ...sparklineBase, colors: ['#f59e0b'] }}
                />
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-violet-400">View All -&gt;</span>
                  <span className="text-amber-400">+19% <span className="text-zinc-500">this month</span></span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-white/10 bg-[#11131a]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-white">Balance Analytics</CardTitle>
              <p className="text-xs text-zinc-400">View all</p>
            </CardHeader>
            <CardContent>
              <ReactApexChart
                type="line"
                height={280}
                options={balanceAnalyticsOptions}
                series={[
                  { name: 'Savings', type: 'line', data: savingsSeries },
                  { name: 'Income', type: 'line', data: incomeSeries },
                  { name: 'Spending', type: 'area', data: expenseSeries },
                ]}
              />
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-[#11131a]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-white">Transaction History</CardTitle>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value="Search Here"
                  className="h-7 w-28 rounded-md border border-white/10 bg-[#232533] px-2 text-[11px] text-zinc-400"
                />
                <Button size="sm" className="h-7 text-white bg-violet-600 px-2 text-[11px] hover:bg-violet-500">
                  Sort by
                </Button>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="text-xs text-zinc-500">
                  <tr>
                    <th className="py-2">Merchant</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">Mail</th>
                    <th className="py-2">Location</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-t border-white/10">
                      <td className="py-2 text-zinc-100">{transaction.title}</td>
                      <td className="py-2 text-zinc-400">{transaction.category}</td>
                      <td className="py-2 text-zinc-500">
                        {transaction.title.toLowerCase().replaceAll(' ', '')}@expensemail.com
                      </td>
                      <td className="py-2 text-zinc-500">Online</td>
                      <td className="py-2 text-zinc-500">{formatDate(transaction.date)}</td>
                      <td className={transaction.type === 'expense' ? 'py-2 text-red-400' : 'py-2 text-emerald-400'}>
                        {transaction.type === 'expense' ? '-' : '+'}
                        {formatCurrency(transaction.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-white/10 bg-[#11131a]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white">Spending By Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ReactApexChart type="donut" height={260} options={donutOptions} series={categorySeries} />
              <div className="grid grid-cols-4 divide-x divide-dashed divide-white/10 border-t border-dashed border-white/10 pt-2">
                {(insights?.categoryBreakdown ?? []).slice(0, 4).map((item) => (
                  <div key={item.category} className="px-2 text-center">
                    <p className="text-[10px] text-zinc-400">{item.category}</p>
                    <p className="text-xs font-medium text-zinc-200">{item.amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-[#11131a]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white">Budget Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs text-zinc-400">
                  <span>On Track</span>
                  <span>{onTrack.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full bg-emerald-400" style={{ width: `${Math.min(onTrack, 100)}%` }} />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs text-zinc-400">
                  <span>Over Budget</span>
                  <span>{overBudget.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full bg-rose-400" style={{ width: `${Math.min(overBudget, 100)}%` }} />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs text-zinc-400">
                  <span>Pending</span>
                  <span>{pending.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full bg-cyan-400" style={{ width: `${Math.min(pending, 100)}%` }} />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs text-zinc-400">
                  <span>Upcoming</span>
                  <span>{upcoming.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full bg-violet-400" style={{ width: `${Math.min(upcoming, 100)}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-[#11131a]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-start gap-2 border-b border-white/5 pb-2 last:border-0">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-400" />
                  <div>
                    <p className="text-sm text-zinc-100">
                      {transaction.type === 'expense' ? 'Expense recorded' : 'Income recorded'}: {transaction.title}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {formatDate(transaction.date)} • {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
