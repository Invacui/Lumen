import type { CSSProperties } from 'react';
import { trustedBySection } from '@/constants/marketing/heroPage';

export function MarketingTrustedBySection() {
  const doubled = [...trustedBySection.companies, ...trustedBySection.companies];

  return (
    <section
      id="trusted"
      className="border-y border-white/5 bg-zinc-950/80 py-10 backdrop-blur-sm"
    >
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
        {trustedBySection.title}
      </p>
      <div className="relative mt-8 overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div
          className="flex w-max gap-16 md:gap-24 animate-marquee-x"
          style={{ '--marquee-duration': '40s' } as CSSProperties}
        >
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-heading text-lg font-semibold text-zinc-600 md:text-xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
