import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const accents = {
  violet: {
    from: 'from-violet-500',
    to: 'to-violet-500',
    glow: 'bg-violet-400/90',
    line: 'bg-violet-400',
  },
  /** Lumen brand — uses `src/styles/tokens.css` via Tailwind `lumen` palette */
  emerald: {
    from: 'from-lumen-400',
    to: 'to-lumen-400',
    glow: 'bg-lumen-400/90',
    line: 'bg-lumen-400',
  },
  lumen: {
    from: 'from-lumen-400',
    to: 'to-lumen-400',
    glow: 'bg-lumen-400/90',
    line: 'bg-lumen-400',
  },
} as const;

export type LampAccent = keyof typeof accents;

export function LampContainer({
  children,
  className,
  accent = 'lumen',
}: {
  children: React.ReactNode;
  className?: string;
  accent?: LampAccent;
}) {
  const a = accents[accent];
  return (
    <div
      className={cn(
        'relative z-0 flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden rounded-md md:min-h-screen',
        className,
      )}
    >
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className={cn(
            'absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible bg-gradient-conic via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]',
            a.from,
          )}
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-background [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-background [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className={cn(
            'absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent text-white [--conic-position:from_290deg_at_center_top]',
            a.to,
          )}
        >
          <div className="absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-background [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-background [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-background blur-[8rem]" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '16rem' }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className={cn(
            'absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl',
            a.glow,
          )}
        />
        <motion.div
          initial={{ width: '15rem' }}
          whileInView={{ width: '30rem' }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className={cn('absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]', a.line)}
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-background" />
      </div>

      <div className="relative z-50 flex -translate-y-48 flex-col items-center px-5 md:-translate-y-72 lg:-translate-y-80">
        {children}
      </div>
    </div>
  );
}
