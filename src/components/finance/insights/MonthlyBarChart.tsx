import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useSummary } from '@/hooks/summary/useSummary';
import { formatCurrency } from '@/lib/utils';

/** Bar chart comparing monthly income vs expenses. */
export function MonthlyBarChart() {
  const { data, isLoading } = useSummary();

  if (isLoading) {
    return <Skeleton className="h-72 w-full rounded-xl" />;
  }

  return (
    <Card className='bg-[#11131a] border-white/10'>
      <CardHeader>
        <CardTitle className="text-base">Income vs Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data ?? []} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} name="Income" />
            <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
