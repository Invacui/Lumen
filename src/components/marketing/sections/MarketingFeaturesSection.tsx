import {
  ChartLine,
  Export,
  ShieldCheck,
  Sparkle,
  UsersThree,
  Wallet,
} from '@phosphor-icons/react';
import { AnimationContainer } from '@/components/marketing/AnimationContainer';
import { MaxWidthWrapper } from '@/components/marketing/MaxWidthWrapper';
import { SparkPill } from '@/components/marketing/SparkPill';
import { featuresSection } from '@/constants/marketing/heroPage';
import { cn } from '@/lib/utils';

const iconMap = {
  unified: Wallet,
  budgets: ChartLine,
  exports: Export,
  roles: UsersThree,
  insights: Sparkle,
  security: ShieldCheck,
} as const;

export function MarketingFeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 py-20 md:py-28">
      <MaxWidthWrapper>
        <AnimationContainer className="mx-auto max-w-3xl text-center" variant="reveal">
          <div className="flex justify-center">
            <SparkPill className="uppercase tracking-[0.18em]">
              <span className="text-[11px] font-semibold text-lumen-200/95">
                {featuresSection.eyebrow}
              </span>
            </SparkPill>
          </div>
          <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            {featuresSection.title}{' '}
            <span className="text-glow-lumen bg-gradient-to-r from-lumen-300 to-lumen-500 bg-clip-text text-transparent">
              {featuresSection.titleAccent}
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{featuresSection.description}</p>
        </AnimationContainer>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-12">
          {featuresSection.items.map((item, i) => {
            const Icon = iconMap[item.id as keyof typeof iconMap];
            return (
              <AnimationContainer
                key={item.id}
                delay={0.06 * i}
                variant="reveal"
                className={cn(
                  'md:col-span-12 lg:col-span-4',
                  item.variant === 'wide' && 'lg:col-span-8',
                )}
              >
                <article
                  className={cn(
                    'flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur-md transition-shadow hover:shadow-lumen-lg',
                    item.variant === 'featured' &&
                      'min-h-[260px] border-lumen-500/35 bg-lumen-500/[0.06]',
                    item.variant === 'wide' && 'lg:flex-row lg:items-center lg:gap-8',
                  )}
                >
                  <div
                    className={cn(
                      'flex size-12 items-center justify-center rounded-xl bg-lumen-500/15 text-lumen-400',
                      item.variant === 'wide' && 'shrink-0',
                    )}
                  >
                    <Icon className="size-7" weight="duotone" />
                  </div>
                  <div className={cn('mt-4', item.variant === 'wide' && 'mt-0 lg:max-w-xl')}>
                    <h3 className="font-heading text-lg font-semibold text-foreground md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {item.description}
                    </p>
                  </div>
                </article>
              </AnimationContainer>
            );
          })}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
