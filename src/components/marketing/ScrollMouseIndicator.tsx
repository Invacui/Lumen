import { motion } from 'framer-motion';

type ScrollMouseIndicatorProps = {
  onActivate?: () => void;
  label?: string;
  variant?: 'default' | 'lumen';
};

/** Scroll cue — mouse outline with animated wheel (Linkify-style hero affordance). */
export function ScrollMouseIndicator({
  onActivate,
  label = 'Scroll',
  variant = 'default',
}: ScrollMouseIndicatorProps) {
  const lumen = variant === 'lumen';
  return (
    <motion.button
      type="button"
      aria-label={`${label} to explore`}
      className="group fixed bottom-8 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground md:bottom-10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={() => onActivate?.()}
    >
      <span
        className={
          lumen
            ? 'text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500'
            : 'text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80'
        }
      >
        {label}
      </span>
      <span
        className={
          lumen
            ? 'relative flex h-10 w-6 justify-center rounded-full border border-lumen-500/45 bg-black/30 backdrop-blur-sm'
            : 'relative flex h-10 w-6 justify-center rounded-full border border-muted-foreground/40 bg-background/40 backdrop-blur-sm'
        }
      >
        <motion.span
          className={
            lumen
              ? 'mt-2 h-1.5 w-0.5 rounded-full bg-lumen-400 shadow-lumen-sm'
              : 'mt-2 h-1.5 w-0.5 rounded-full bg-muted-foreground/70'
          }
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
    </motion.button>
  );
}
