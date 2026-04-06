import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { ScrollMouseIndicator } from '@/components/marketing/ScrollMouseIndicator';
import { SparkPill } from '@/components/marketing/SparkPill';
import { revealTransition, revealVariants } from '@/components/marketing/reveal-variants';
import { heroSection } from '@/constants/marketing/heroPage';
import { ROUTES } from '@/constants/routes';

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

export function MarketingHeroSection() {
  const [showScrollCue, setShowScrollCue] = useState(true);

  const scrollToTrusted = useCallback(() => {
    document.getElementById('trusted')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 120) setShowScrollCue(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#050505]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/sectionone_bg.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/55 to-[#050505]" />
      {/* <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--lumen-radial-hero),transparent)]" /> */}

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 pb-28 pt-24 md:px-8 md:pb-32 md:pt-28">
        <motion.div
          className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={revealVariants} transition={revealTransition}>
            <SparkPill className="uppercase tracking-[0.18em]">
              <span className="text-[11px] font-semibold text-lumen-200/95">
                {heroSection.badge}
              </span>
            </SparkPill>
          </motion.div>

          <motion.h1
            variants={revealVariants}
            transition={revealTransition}
            className="font-heading mt-8 w-full text-balance text-5xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[120px]"
          >
            {heroSection.titleLine1}
            <br />
            <span className="text-glow-lumen bg-gradient-to-r from-lumen-200 via-lumen-400 to-lumen-500 bg-clip-text text-transparent">
              {heroSection.titleLine2}
            </span>
          </motion.h1>

          <motion.p
            variants={revealVariants}
            transition={revealTransition}
            className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-zinc-400 md:text-lg"
          >
            {heroSection.subtitle}
          </motion.p>

          <motion.div
            variants={revealVariants}
            transition={revealTransition}
            className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          >
            <Button size="lg" className="btn-lumen-hero h-12 rounded-full border-white/25 bg-green-500/100 px-8 text-base font-medium text-white backdrop-blur-sm hover:bg-green-400/75" asChild>
              <Link to={ROUTES.login} className="inline-flex items-center justify-center gap-2">
                {heroSection.primaryCta}
                <ArrowRight className="size-5" weight="bold" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/25 bg-white/5 px-8 text-base font-medium text-white backdrop-blur-sm hover:bg-white/10"
              asChild
            >
              <a href="#features" className="inline-flex items-center justify-center gap-2">
                <Play className="size-5" weight="fill" />
                {heroSection.secondaryCta}
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={revealVariants}
            transition={revealTransition}
            className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-10 md:gap-8"
          >
            {heroSection.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-2xl font-semibold text-white md:text-3xl">
                  {s.value}
                  {'suffix' in s && s.suffix ? (
                    <span className="text-amber-400">{s.suffix}</span>
                  ) : null}
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500 md:text-xs">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {showScrollCue && (
        <ScrollMouseIndicator
          variant="lumen"
          onActivate={() => {
            scrollToTrusted();
          }}
        />
      )}
    </section>
  );
}
