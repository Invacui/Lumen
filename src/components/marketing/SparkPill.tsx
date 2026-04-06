import { ArrowRight } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

type SparkPillProps = {
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
};

/** Linkify-style pill: conic spark + masks (see linkify `page.tsx` ~25–36). */
export function SparkPill({ children, className, showArrow }: SparkPillProps) {
  return (
    <span
      className={cn(
        'group relative inline-grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_3%)_inset] transition-colors duration-200',
        className,
      )}
    >
      <span>
        <span
          className="absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]"
          aria-hidden
        />
      </span>
      <span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
      <span className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-tr from-lumen-500/20 blur-md" />
      <span className="relative z-10 flex items-center justify-center gap-1 py-0.5 text-sm font-medium text-neutral-100">
        {children}
        {showArrow ? (
          <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" weight="bold" />
        ) : null}
      </span>
    </span>
  );
}
