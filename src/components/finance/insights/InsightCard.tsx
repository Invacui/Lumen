import { type ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface InsightCardProps {
  title: string;
  value: string;
  description?: string;
  icon: ReactNode;
  accent?: string;
}

/** Insight tile showing a key metric with an icon and description. */
export function InsightCard({ title, value, description, icon, accent = 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400' }: InsightCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow bg-[#11131a] border-white/10">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`rounded-xl p-3 ${accent}`}>{icon}</div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 text-xl font-bold leading-tight">{value}</p>
            {description && (
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
