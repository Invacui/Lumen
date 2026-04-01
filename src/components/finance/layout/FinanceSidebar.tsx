import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, TrendingUp, ChevronLeft, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSidebar, selectSidebarOpen } from '@/store/ui.slice';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

const navItems = [
  { to: ROUTES.finance.dashboard, icon: LayoutDashboard, label: 'Dashboard' },
  { to: ROUTES.finance.transactions, icon: ArrowLeftRight, label: 'Transactions' },
  { to: ROUTES.finance.insights, icon: TrendingUp, label: 'Insights' },
];

/** Finance section sidebar with collapsible navigation. */
export function FinanceSidebar() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectSidebarOpen);
  const navigate = useNavigate();

  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r bg-background transition-all duration-200',
        isOpen ? 'w-56' : 'w-16',
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {isOpen ? (
          <button
            onClick={() => navigate(ROUTES.finance.dashboard)}
            className="flex items-center gap-2 font-bold text-primary"
          >
            <Wallet className="h-5 w-5" />
            <span>Zorvyn</span>
          </button>
        ) : (
          <button
            onClick={() => navigate(ROUTES.finance.dashboard)}
            className="mx-auto"
          >
            <Wallet className="h-5 w-5 text-primary" />
          </button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(toggleSidebar())}
          className="ml-auto shrink-0"
        >
          <ChevronLeft
            className={cn('h-4 w-4 transition-transform', !isOpen && 'rotate-180')}
          />
        </Button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-2 py-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {isOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
