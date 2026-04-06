import { Link } from 'react-router-dom';
import { AnimationContainer } from '@/components/marketing/AnimationContainer';
import { TextHoverEffect } from '@/components/marketing/TextHoverEffect';
import { ROUTES } from '@/constants/routes';
import logoUrl from '@/assets/icons/logo.svg?url';

const product = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const resources = [
  { label: 'Documentation', href: '#' },
  { label: 'Support', href: '#' },
];

const company = [
  { label: 'Sign in', href: ROUTES.login },
  { label: 'Dashboard', href: ROUTES.dashboard },
];

export function HeroFooter() {
  return (
    <footer className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center border-t border-border bg-[radial-gradient(35%_128px_at_50%_0%,hsl(var(--foreground)/0.08),transparent)] px-6 pb-8 pt-16 md:pb-0 lg:px-8 lg:pt-32">
      <div className="absolute left-1/2 right-1/2 top-0 h-1.5 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimationContainer delay={0.1} variant="reveal">
          <div className="flex max-w-[240px] flex-col items-start justify-start">
            <span className="flex items-center gap-2.5 font-heading text-lg font-bold">
              <img src={logoUrl} alt="" className="size-8 rounded-md object-cover" width={32} height={32} />
              Lumen
            </span>
            <p className="mt-4 text-start text-sm text-muted-foreground">
              Personal finance clarity — track spending, balances, and insights in one calm workspace.
            </p>
          </div>
        </AnimationContainer>

        <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div className="grid gap-8 md:grid-cols-2">
            <AnimationContainer delay={0.15} variant="reveal">
              <div>
                <h3 className="text-base font-medium text-foreground">Product</h3>
                <ul className="mt-4 text-sm text-muted-foreground">
                  {product.map((item) => (
                    <li key={item.label} className="mt-2">
                      <a
                        href={item.href}
                        className="transition-colors duration-300 hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimationContainer>
            <AnimationContainer delay={0.2} variant="reveal">
              <div className="mt-10 md:mt-0">
                <h3 className="text-base font-medium text-foreground">Resources</h3>
                <ul className="mt-4 text-sm text-muted-foreground">
                  {resources.map((item) => (
                    <li key={item.label} className="mt-2">
                      <a
                        href={item.href}
                        className="transition-colors duration-300 hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimationContainer>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <AnimationContainer delay={0.25} variant="reveal">
              <div>
                <h3 className="text-base font-medium text-foreground">App</h3>
                <ul className="mt-4 text-sm text-muted-foreground">
                  {company.map((item) => (
                    <li key={item.label} className="mt-2">
                      <Link
                        to={item.href}
                        className="transition-colors duration-300 hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimationContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 w-full border-t border-border/40 pt-4 md:flex md:items-center md:justify-between md:pt-8">
        <AnimationContainer delay={0.3} variant="reveal">
          <p className="mt-8 text-sm text-muted-foreground md:mt-0">
            © {new Date().getFullYear()} Lumen. All rights reserved.
          </p>
        </AnimationContainer>
      </div>

      <div className="hidden h-[14rem] items-center justify-center md:flex lg:h-[16rem]">
        <TextHoverEffect text="LUMEN" />
      </div>
    </footer>
  );
}
