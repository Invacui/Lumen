import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightning } from '@phosphor-icons/react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { MaxWidthWrapper } from '@/components/marketing/MaxWidthWrapper';
import { AnimationContainer } from '@/components/marketing/AnimationContainer';
import logoUrl from '@/assets/icons/logo.svg?url';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export function HeroNav() {
  const [scroll, setScroll] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 inset-x-0 z-[99999] h-14 w-full select-none border-b transition-colors duration-300',
        scroll ? 'border-border/80 bg-[#050505]/80 backdrop-blur-md' : 'border-transparent  bg-transparent',
      )}
    >
      <AnimationContainer className="size-full" delay={0.05}>
        <MaxWidthWrapper className="grid h-14 grid-cols-[1fr_auto_1fr] items-center px-2 md:px-0">
          <Link
            to={ROUTES.home}
            className="flex w-fit items-center gap-2.5 font-heading text-lg font-bold !leading-none tracking-tight text-foreground"
          >
            <img src={logoUrl} alt="" className="size-8 shrink-0 rounded-md object-cover" width={32} height={32} />
            Lumen
          </Link>

          <nav className="hidden justify-center lg:flex">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="hidden  justify-self-end lg:flex lg:items-center lg:gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to={ROUTES.login}>Sign in</Link>
            </Button>
            <Button size="sm" className="!btn-lumen-cta-sm !text-white" variant={'ghost'} asChild>
              <Link to={ROUTES.login} className="btn-lumen-hero flex items-center gap-1.5">
                Get Started
                <Lightning className="size-3.5" weight="fill" />
              </Link>
            </Button>
          </div>

          <div className="col-start-3 flex justify-end lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </MaxWidthWrapper>
      </AnimationContainer>

      {mobileOpen && (
        <div className="border-t border-border/60 bg-[#050505]/95 px-4 py-4 backdrop-blur-lg lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2.5 text-sm font-medium text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            to={ROUTES.login}
            className="mt-2 block py-2.5 text-sm font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Sign in
          </Link>
        </div>
      )}
    </header>
  );
}
