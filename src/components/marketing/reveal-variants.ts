import type { Transition, Variants } from 'framer-motion';

/** Card / section reveal — blur-up + rise (Design Notes + Framer Motion). */
export const revealTransition: Transition = {
  duration: 1,
  ease: [0.25, 0.1, 0.25, 1],
};

export const revealVariants: Variants = {
  hidden: {
    filter: 'blur(10px)',
    transform: 'translateY(20%)',
    opacity: 0,
  },
  visible: {
    filter: 'blur(0px)',
    transform: 'translateY(0)',
    opacity: 1,
  },
};
