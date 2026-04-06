import { Star } from '@phosphor-icons/react';
import { AnimationContainer } from '@/components/marketing/AnimationContainer';
import { MaxWidthWrapper } from '@/components/marketing/MaxWidthWrapper';
import { SparkPill } from '@/components/marketing/SparkPill';
import { testimonialsSection } from '@/constants/marketing/heroPage';
import { cn } from '@/lib/utils';

function TestimonialCard({
  quote,
  name,
  role,
  rating,
  className,
}: {
  quote: string;
  name: string;
  role: string;
  rating: number;
  className?: string;
}) {
  return (
    <blockquote
      className={cn(
        'flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md',
        className,
      )}
    >
      <div className="flex gap-0.5 text-amber-400" aria-hidden>
        {Array.from({ length: rating }).map((_, j) => (
          <Star key={j} className="size-4" weight="fill" />
        ))}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-300">&ldquo;{quote}&rdquo;</p>
      <footer className="mt-4 border-t border-white/10 pt-3">
        <p className="font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </footer>
    </blockquote>
  );
}

export function MarketingTestimonialsSection() {
  return (
    <section className="border-y border-white/5 bg-[#050505]/90 py-20 md:py-28">
      <MaxWidthWrapper>
        <AnimationContainer className="mx-auto max-w-2xl text-center" variant="reveal">
          <div className="flex justify-center">
            <SparkPill className="uppercase tracking-[0.18em]">
              <span className="text-[11px] font-semibold text-lumen-200/95">
                {testimonialsSection.eyebrow}
              </span>
            </SparkPill>
          </div>
          <h2 className="font-heading mt-4 text-3xl font-semibold text-foreground md:text-4xl">
            {testimonialsSection.title}
          </h2>
        </AnimationContainer>

        <div className="mt-10 space-y-4 md:hidden">
          {testimonialsSection.items.map((t, i) => (
            <AnimationContainer key={t.id} delay={0.03 * i} variant="reveal">
              <TestimonialCard
                quote={t.quote}
                name={t.name}
                role={t.role}
                rating={t.rating}
                className="opacity-[0.72]"
              />
            </AnimationContainer>
          ))}
        </div>

        <div
          className="relative mx-auto mt-14 hidden min-h-[960px] max-w-6xl overflow-visible md:block [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#fff_70%,transparent_110%)] [-webkit-mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#fff_70%,transparent_110%)]"
        >
          {testimonialsSection.items.map((t, i) => (
            <div
              key={t.id}
              className="absolute z-[2] w-[min(100%,260px)] opacity-[0.72] transition-opacity hover:opacity-90"
              style={{
                top: t.position.top,
                left: t.position.left,
                transform: t.position.rotate ? `rotate(${t.position.rotate})` : undefined,
              }}
            >
              <AnimationContainer delay={0.02 * i} variant="reveal">
                <TestimonialCard quote={t.quote} name={t.name} role={t.role} rating={t.rating} />
              </AnimationContainer>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
