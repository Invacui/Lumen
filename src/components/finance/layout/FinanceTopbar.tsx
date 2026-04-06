import { useNavigate } from 'react-router-dom';
import { LogOut, ChevronDown, UserCog, UserRound, Menu, LayoutDashboard, ArrowLeftRight, TrendingUp, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearFinanceAuth, setFinanceRole, selectFinanceRole, selectFinanceUser } from '@/store/financeAuth.slice';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavLink } from 'react-router-dom';

const mobileNavItems = [
  { to: ROUTES.dashboard, icon: LayoutDashboard, label: 'Dashboard' },
  { to: ROUTES.transactions, icon: ArrowLeftRight, label: 'Transactions' },
  { to: ROUTES.insights, icon: TrendingUp, label: 'Insights' },
  { to: ROUTES.account, icon: UserRound, label: 'Account' },
  { to: ROUTES.bankConnect, icon: Landmark, label: 'Connect Bank' },
];

/** Top navigation bar for finance with role switcher and user menu. */
export function FinanceTopbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectFinanceUser);
  const role = useAppSelector(selectFinanceRole);

  const handleLogout = () => {
    dispatch(clearFinanceAuth());
    navigate(ROUTES.login);
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '??';

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#050505] px-6">
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 border-white/10 bg-[#050505] p-4">
            <nav className="mt-6 flex flex-col gap-2">
              {mobileNavItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 rounded-md px-3 py-2 text-sm',
                      isActive ? 'bg-white text-black' : 'text-zinc-300 hover:bg-white/10 hover:text-white',
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden lg:block" />
      <div className="flex items-center gap-3">
        {/* Role switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <UserCog className="h-3.5 w-3.5" />
              <Badge
                variant="secondary"
                className={cn(
                  'text-xs',
                  role === 'admin'
                    ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
                )}
              >
                {role === 'admin' ? 'Admin' : 'Viewer'}
              </Badge>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => dispatch(setFinanceRole('admin'))}>
              Switch to Admin
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => dispatch(setFinanceRole('viewer'))}>
              Switch to Viewer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 text-white hover:bg-white/10 hover:text-white">
              <Avatar className="h-7 w-7">
                <AvatarImage src={user?.picture ?? ''} />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:block">{user?.name ?? 'User'}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex-col items-start gap-0">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(ROUTES.account)}>
              <UserRound className="mr-2 h-4 w-4" />
              Account panel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
