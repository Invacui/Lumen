import { type ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn, formatCurrency } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  isCurrency?: boolean;
  trend?: number; // percentage change
  color?: 'default' | 'green' | 'red' | 'blue' | 'purple';
}

const colorMap = {
  default: 'bg-muted text-foreground',
  green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  purple: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
};

/** KPI card displaying a title, value, optional trend percentage and icon. */
export function SummaryCard({ title, value, icon, isCurrency = true, trend, color = 'default' }: SummaryCardProps) {
  const displayValue = isCurrency && typeof value === 'number' ? formatCurrency(value) : String(value);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={cn('rounded-lg p-2', colorMap[color])}>
            {icon}
          </div>
        </div>
        <p className="mt-3 text-2xl font-bold tracking-tight">{displayValue}</p>
        {trend !== undefined && (
          <div className="mt-2 flex items-center gap-1 text-xs">
            {trend >= 0 ? (
              <TrendingUp className="h-3 w-3 text-green-600" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className={trend >= 0 ? 'text-green-600' : 'text-red-500'}>
              {trend >= 0 ? '+' : ''}{trend.toFixed(1)}% vs last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
