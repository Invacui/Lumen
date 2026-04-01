import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectFinanceIsAuthenticated } from '@/store/financeAuth.slice';
import { ROUTES } from '@/constants/routes';

/** Redirects unauthenticated finance users to the login page. */
export function FinanceProtectedRoute() {
  const isAuthenticated = useAppSelector(selectFinanceIsAuthenticated);
  if (!isAuthenticated) return <Navigate to={ROUTES.finance.login} replace />;
  return <Outlet />;
}
