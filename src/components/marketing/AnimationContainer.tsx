import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { revealTransition, revealVariants } from '@/components/marketing/reveal-variants';

type AnimationContainerProps = {
  children: React.ReactNode;
  delay?: number;
  reverse?: boolean;
  className?: string;
  /** Use blur-rise reveal (Design Notes); default is light spring fade. */
  variant?: 'spring' | 'reveal';
};

export function AnimationContainer({
  children,
  className,
  reverse,
  delay = 0,
  variant = 'spring',
}: AnimationContainerProps) {
  if (variant === 'reveal') {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-48px' }}
        variants={revealVariants}
        transition={{ ...revealTransition, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: reverse ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{
        duration: 0.35,
        delay,
        ease: 'easeInOut',
        type: 'spring',
        stiffness: 260,
        damping: 26,
      }}
    >
      {children}
    </motion.div>
  );
}
