import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  ChevronLeft,
  Landmark,
  UserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSidebar, selectSidebarOpen } from '@/store/ui.slice';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import logoUrl from '@/assets/icons/logo.svg?url';

const navItems = [
  { to: ROUTES.dashboard, icon: LayoutDashboard, label: 'Dashboard' },
  { to: ROUTES.transactions, icon: ArrowLeftRight, label: 'Transactions' },
  { to: ROUTES.insights, icon: TrendingUp, label: 'Insights' },
  { to: ROUTES.account, icon: UserRound, label: 'Account' },
  { to: ROUTES.bankConnect, icon: Landmark, label: 'Connect Bank' },
];

/** Finance section sidebar with collapsible navigation. */
export function FinanceSidebar() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectSidebarOpen);
  const navigate = useNavigate();

  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-white/10 bg-[#050505] text-white transition-all duration-200',
        isOpen ? 'w-56' : 'w-16',
      )}
    >
      {!isOpen && (
        <button
          onClick={() => navigate(ROUTES.dashboard)}
          className="mx-auto mt-4 flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10"
          title="Lumen Log"
        >
          <img src={logoUrl} alt="Lumen Log" className="h-7 w-7 rounded-md object-cover" />
        </button>
      )}
      <div className="flex mt-4 h-10 items-center justify-between px-4">
        {isOpen ? (
          <button
            onClick={() => navigate(ROUTES.home)}
            className="flex items-center gap-2 font-bold text-white"
          >
            <img src={logoUrl} alt="Lumen Logo" className="h-7 w-7 rounded-md object-cover" />
            <span>Lumen</span>
          </button>
        ) : (
          null
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(toggleSidebar())}
          className="ml-auto shrink-0 text-white hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft
            className={cn('h-4 w-4 font-extrabold transition-transform', !isOpen && 'rotate-180')}
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
                'flex items-center gap-3 rounded-md px-3.5 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-white text-black'
                  : 'text-zinc-300 hover:bg-white/10 hover:text-white',
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
