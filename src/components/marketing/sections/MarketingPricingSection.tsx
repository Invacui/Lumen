import { CheckCircle } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { AnimationContainer } from '@/components/marketing/AnimationContainer';
import { MaxWidthWrapper } from '@/components/marketing/MaxWidthWrapper';
import { SparkPill } from '@/components/marketing/SparkPill';
import { Button } from '@/components/ui/button';
import { pricingSection } from '@/constants/marketing/heroPage';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

export function MarketingPricingSection() {
  return (
    <section id="pricing" className="scroll-mt-20 py-20 md:py-28">
      <MaxWidthWrapper>
        <AnimationContainer className="mx-auto max-w-2xl text-center" variant="reveal">
          <div className="flex justify-center">
            <SparkPill className="uppercase tracking-[0.18em]">
              <span className="text-[11px] font-semibold text-lumen-200/95">
                {pricingSection.eyebrow}
              </span>
            </SparkPill>
          </div>
          <h2 className="font-heading mt-4 text-3xl font-semibold text-foreground md:text-4xl">
            {pricingSection.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{pricingSection.description}</p>
        </AnimationContainer>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricingSection.plans.map((plan, i) => (
            <AnimationContainer key={plan.id} delay={0.08 * i} variant="reveal">
              <div
                className={cn(
                  'flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md',
                  plan.highlighted &&
                    'border-lumen-500/50 bg-lumen-500/[0.06] shadow-lumen-xl',
                )}
              >
                <p className="text-sm font-medium text-lumen-400/90">{plan.name}</p>
                <p className="font-heading mt-4 flex items-baseline gap-1 text-4xl font-bold text-foreground">
                  {plan.price}
                  <span className="text-base font-normal text-muted-foreground">{plan.cadence}</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{plan.blurb}</p>
                <ul className="mt-8 flex-1 space-y-3 text-sm text-muted-foreground">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle
                        className="mt-0.5 size-[18px] shrink-0 text-lumen-400"
                        weight="fill"
                        aria-hidden
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn(
                    'mt-8 w-full rounded-full',
                    plan.highlighted
                      ? 'bg-lumen-400 text-zinc-950 hover:bg-lumen-300'
                      : 'bg-white/10 text-white hover:bg-white/15',
                  )}
                  asChild
                >
                  <Link to={ROUTES.login}>{plan.cta}</Link>
                </Button>
              </div>
            </AnimationContainer>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
