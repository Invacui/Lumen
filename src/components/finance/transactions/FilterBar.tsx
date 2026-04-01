import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilter, resetFilters, selectFilters } from '@/store/filters.slice';
import { CATEGORIES } from '@/constants/categories';

/** Filter bar with type, category, date-range and search controls. */
export function FilterBar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative min-w-[180px] flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search transactions…"
          value={filters.search}
          onChange={(e) => dispatch(setFilter({ search: e.target.value }))}
          className="pl-9"
        />
      </div>

      {/* Type filter */}
      <Select
        value={filters.type}
        onValueChange={(v) => dispatch(setFilter({ type: v as typeof filters.type }))}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
        </SelectContent>
      </Select>

      {/* Category filter */}
      <Select
        value={filters.category}
        onValueChange={(v) => dispatch(setFilter({ category: v as typeof filters.category }))}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date from */}
      <Input
        type="date"
        value={filters.dateFrom ?? ''}
        onChange={(e) => dispatch(setFilter({ dateFrom: e.target.value || null }))}
        className="w-36"
      />

      {/* Date to */}
      <Input
        type="date"
        value={filters.dateTo ?? ''}
        onChange={(e) => dispatch(setFilter({ dateTo: e.target.value || null }))}
        className="w-36"
      />

      {/* Reset */}
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 text-muted-foreground"
        onClick={() => dispatch(resetFilters())}
      >
        <X className="h-3.5 w-3.5" />
        Reset
      </Button>
    </div>
  );
}
