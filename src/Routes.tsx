import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RouteErrorElement } from '@/components/common/RouteErrorElement';
import HeroLayout from '@/layouts/marketing/HeroLayout';
import FinanceLayout from '@/layouts/finance/FinanceLayout';
import HeroPage from '@/pages/marketing/HeroPage';
import FinanceLoginPage from '@/pages/finance/FinanceLoginPage';
import FinanceDashboardPage from '@/pages/finance/FinanceDashboardPage';
import FinanceTransactionsPage from '@/pages/finance/FinanceTransactionsPage';
import FinanceInsightsPage from '@/pages/finance/FinanceInsightsPage';
import FinanceAccountPage from '@/pages/finance/FinanceAccountPage';
import FinanceBankConnectPage from '@/pages/finance/FinanceBankConnectPage';

/**
 * Central route tree (worko-style): `createBrowserRouter` + nested `children`,
 * layouts in `element`, pages as leaf `element`s, `errorElement` for router-level failures.
 *
 * Flow: `App.tsx` → `RouterProvider` → this file → `@/layouts/*` → `@/pages/*` → components.
 */
const AppRoutes = createBrowserRouter(
  [
    {
      path: '/',
      errorElement: <RouteErrorElement />,
      element: <HeroLayout />,
      children: [{ index: true, element: <HeroPage /> }],
    },
    {
      path: '/login',
      errorElement: <RouteErrorElement />,
      element: <FinanceLoginPage />,
    },
    {
      errorElement: <RouteErrorElement />,
      element: <FinanceLayout />,
      children: [
        { path: 'dashboard', element: <FinanceDashboardPage /> },
        { path: 'transactions', element: <FinanceTransactionsPage /> },
        { path: 'insights', element: <FinanceInsightsPage /> },
        { path: 'account', element: <FinanceAccountPage /> },
        { path: 'bank-connect', element: <FinanceBankConnectPage /> },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ],
);

export default AppRoutes;
