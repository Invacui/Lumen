import { cn } from '@/lib/utils';

export function MagicBadge({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-violet-200 shadow-[0_0_24px_-4px_rgba(139,92,246,0.45)]',
        className,
      )}
    >
      {title}
    </span>
  );
}
