import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectFinanceIsAuthenticated } from '@/store/financeAuth.slice';
import { ROUTES } from '@/constants/routes';
import { FinanceSidebar } from '@/components/finance/layout/FinanceSidebar';
import { FinanceTopbar } from '@/components/finance/layout/FinanceTopbar';

/** Root layout for all authenticated finance routes. */
export default function FinanceLayout() {
  const isAuth = useAppSelector(selectFinanceIsAuthenticated);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  if (!isAuth) return <Navigate to={ROUTES.login} replace />;

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]">
      <div className="hidden lg:flex">
        <FinanceSidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <FinanceTopbar />
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#0b0b0f] to-[#13131b] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
