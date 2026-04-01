import { Badge } from '@/components/ui/badge';
import { CATEGORY_BG, CATEGORY_COLORS } from '@/constants/categories';
import { formatCurrency } from '@/lib/utils';
import type { Category } from '@/types/transaction.types';

interface TopCategoryBadgeProps {
  category: Category;
  amount: number;
}

/** Badge displaying the highest-spend category with its color and total amount. */
export function TopCategoryBadge({ category, amount }: TopCategoryBadgeProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: CATEGORY_COLORS[category] }}
      />
      <Badge variant="outline" className={CATEGORY_BG[category]}>
        {category}
      </Badge>
      <span className="text-sm font-semibold">{formatCurrency(amount)}</span>
    </div>
  );
}
