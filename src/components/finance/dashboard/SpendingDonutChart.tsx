import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useInsights } from '@/hooks/summary/useInsights';
import { CATEGORY_COLORS } from '@/constants/categories';
import { formatCurrency } from '@/lib/utils';
import type { Category } from '@/types/transaction.types';

/** Donut chart of expense spending breakdown by category. */
export function SpendingDonutChart() {
  const { data, isLoading } = useInsights();

  if (isLoading) {
    return <Skeleton className="h-72 w-full rounded-xl" />;
  }

  const chartData = data?.categoryBreakdown.map((item) => ({
    name: item.category,
    value: item.amount,
    percentage: item.percentage,
  })) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name as Category] ?? '#94a3b8'}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend formatter={(value) => <span className="text-xs">{value}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
