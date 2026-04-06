import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MinusCircle, PlusCircle } from '@phosphor-icons/react';
import { AnimationContainer } from '@/components/marketing/AnimationContainer';
import { MaxWidthWrapper } from '@/components/marketing/MaxWidthWrapper';
import { SparkPill } from '@/components/marketing/SparkPill';
import { faqSection } from '@/constants/marketing/heroPage';

export function MarketingFaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqSection.items[0]?.id ?? null);

  return (
    <section id="faq" className="scroll-mt-20 py-20 md:py-28">
      <MaxWidthWrapper className="max-w-3xl">
        <AnimationContainer className="text-center" variant="reveal">
          <div className="flex justify-center">
            <SparkPill className="uppercase tracking-[0.18em]">
              <span className="text-[11px] font-semibold text-lumen-200/95">{faqSection.eyebrow}</span>
            </SparkPill>
          </div>
          <h2 className="font-heading mt-4 text-3xl font-semibold text-foreground md:text-4xl">
            {faqSection.title}
          </h2>
        </AnimationContainer>

        <div className="mt-12 space-y-2">
          {faqSection.items.map((item, i) => {
            const open = openId === item.id;
            return (
              <AnimationContainer key={item.id} delay={0.04 * i} variant="reveal">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpenId(open ? null : item.id)}
                    aria-expanded={open}
                  >
                    <span className="font-medium text-foreground">{item.q}</span>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-lumen-400">
                      {open ? (
                        <MinusCircle className="size-5" weight="fill" aria-hidden />
                      ) : (
                        <PlusCircle className="size-5" weight="fill" aria-hidden />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <p className="border-t border-white/5 px-5 pb-4 pt-0 text-sm leading-relaxed text-muted-foreground">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimationContainer>
            );
          })}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
