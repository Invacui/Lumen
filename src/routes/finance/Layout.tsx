import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectFinanceIsAuthenticated } from '@/store/financeAuth.slice';
import { ROUTES } from '@/constants/routes';
import { FinanceSidebar } from '@/components/finance/layout/FinanceSidebar';
import { FinanceTopbar } from '@/components/finance/layout/FinanceTopbar';

/** Root layout for all authenticated finance routes. */
export default function FinanceLayout() {
  const isAuth = useAppSelector(selectFinanceIsAuthenticated);
  if (!isAuth) return <Navigate to={ROUTES.finance.login} replace />;

  return (
    <div className="flex h-screen overflow-hidden">
      <FinanceSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <FinanceTopbar />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
