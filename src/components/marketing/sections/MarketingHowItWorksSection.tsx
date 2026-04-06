import { AnimationContainer } from '@/components/marketing/AnimationContainer';
import { MaxWidthWrapper } from '@/components/marketing/MaxWidthWrapper';
import { SparkPill } from '@/components/marketing/SparkPill';
import { howItWorksSection } from '@/constants/marketing/heroPage';

export function MarketingHowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-y border-white/5 bg-zinc-950/40 py-20 md:py-28"
    >
      <MaxWidthWrapper>
        <AnimationContainer className="mx-auto max-w-2xl text-center" variant="reveal">
          <div className="flex justify-center">
            <SparkPill className="uppercase tracking-[0.18em]">
              <span className="text-[11px] font-semibold text-lumen-200/95">
                {howItWorksSection.eyebrow}
              </span>
            </SparkPill>
          </div>
          <h2 className="font-heading mt-4 text-3xl font-semibold text-foreground md:text-4xl">
            {howItWorksSection.title}
          </h2>
        </AnimationContainer>

        <div className="mx-auto mt-5 max-w-5xl">
          <div className="grid gap-12 md:grid-cols-3 md:gap-2">
            {howItWorksSection.steps.map((step, index) => (
              <AnimationContainer key={step.id} delay={0.08 * index} variant="reveal">
                 <div className=" mb-0 -z-10 text-[120px] md:text-[180px] text-center font-bold font-base leading-none bg-gradient-to-b from-neutral-800 to-background bg-clip-text text-transparent select-none" style={{ opacity: 1, filter: 'blur(0px)' }}>
                {index + 1}
                </div>
              <div className="relative -top-12 md:-top-20 flex flex-col items-center text-center">
                <h3 className="z-10 font-heading mt-6 text-xl font-semibold text-foreground md:text-2xl">
                {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground md:text-base">
                {step.description}
                </p>
              </div>
              </AnimationContainer>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
