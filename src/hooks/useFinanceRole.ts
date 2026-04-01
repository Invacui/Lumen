import { useAppSelector } from '@/store/hooks';
import { selectFinanceRole } from '@/store/financeAuth.slice';

/** Returns role flags for the current finance user. */
export function useFinanceRole() {
  const role = useAppSelector(selectFinanceRole);
  return { role, isAdmin: role === 'admin', isViewer: role === 'viewer' };
}
