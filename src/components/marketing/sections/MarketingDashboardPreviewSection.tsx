import { AnimationContainer } from '@/components/marketing/AnimationContainer';
import { MaxWidthWrapper } from '@/components/marketing/MaxWidthWrapper';
import { BorderBeam } from '@/components/ui/border-beam';

export function MarketingDashboardPreviewSection() {
  return (
    <section className="pb-24  pt-4 md:pb-32">
      <MaxWidthWrapper>
        <AnimationContainer delay={0.05} variant="reveal">
          <div className="  relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-2 shadow-xl ring-1 ring-inset ring-white/5 backdrop-blur-md">
            <div className="pointer-events-none absolute left-1/2 top-[10%] h-1/4 w-3/4 -translate-x-1/2 animate-image-glow bg-gradient-to-b from-lumen-500/35 to-transparent blur-[5rem] md:h-1/3" />
            <BorderBeam size={250} duration={12} delay={9} />
            <img
              src="/Lumen-dash.png"
              alt="Lumen dashboard interface preview"
              width={1300}
              height={720}
              decoding="async"
              loading="lazy"
              className="relative z-10 w-full rounded-xl bg-foreground/5 ring-1 ring-white/10"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/4 bg-gradient-to-t from-[#050505] to-transparent" />
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>
    </section>
  );
}
