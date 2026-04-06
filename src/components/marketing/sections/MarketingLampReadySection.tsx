import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { LampContainer } from '@/components/ui/lamp';
import { Button } from '@/components/ui/button';
import { revealTransition, revealVariants } from '@/components/marketing/reveal-variants';
import { lampReadySection } from '@/constants/marketing/heroPage';
import { ROUTES } from '@/constants/routes';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export function MarketingLampReadySection() {
  return (
    <section id="ready" className="relative scroll-mt-20">
      <LampContainer accent="lumen" className="min-h-[75vh] md:min-h-[85vh]">
        <motion.div
          className="mx-auto flex max-w-2xl flex-col items-center px-4 text-center"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2
            variants={revealVariants}
            transition={revealTransition}
            className="font-heading text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl"
          >
            {lampReadySection.title}
          </motion.h2>
          <motion.p
            variants={revealVariants}
            transition={revealTransition}
            className="mt-4 max-w-lg text-muted-foreground md:text-lg"
          >
            {lampReadySection.description}
          </motion.p>
          <motion.div variants={revealVariants} transition={revealTransition} className="mt-10">
            <Button size="lg" className="!btn-lumen-cta  text-white !rounded-full" variant="ghost" asChild>
              <Link to={ROUTES.login} className=" btn-lumen-cta inline-flex items-center gap-2">
                {lampReadySection.cta}
                <ArrowRight className="size-5" weight="bold" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </LampContainer>
    </section>
  );
}
