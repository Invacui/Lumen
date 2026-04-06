import { Outlet } from 'react-router-dom';
import { HeroNav } from '@/components/marketing/HeroNav';
import { HeroFooter } from '@/components/marketing/HeroFooter';

/**
 * Marketing shell: Linkify-style header/footer; children are the scrollable page.
 * Dark palette matches Linkify landing aesthetics.
 */
export default function HeroLayout() {
  return (
    <div className="dark min-h-screen bg-[#050505] text-foreground antialiased">
      <HeroNav />
      <main className="min-h-[60vh]">
        <Outlet />
      </main>
      <HeroFooter />
    </div>
  );
}
