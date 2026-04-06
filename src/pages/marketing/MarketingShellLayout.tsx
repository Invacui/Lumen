import { Outlet } from 'react-router-dom';
import { MarketingNav } from '@/components/layout/MarketingNav';
import { MarketingFooter } from '@/components/layout/MarketingFooter';

/** Legacy LeadFlow marketing shell (nav + footer). Not used by the Lumen finance landing. */
export default function MarketingShellLayout() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  );
}
