import { useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [pathname, setPathname] = useState<string>(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setPathname(window.location.pathname);

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function pushState(...args) {
      const result = originalPushState.apply(this, args);
      window.dispatchEvent(new Event('locationchange'));
      return result;
    };

    window.history.replaceState = function replaceState(...args) {
      const result = originalReplaceState.apply(this, args);
      window.dispatchEvent(new Event('locationchange'));
      return result;
    };

    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('locationchange', onLocationChange);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('locationchange', onLocationChange);
    };
  }, []);

  const shouldEnableSmoothScroll = useMemo(() => {
    // Keep smooth scroll for marketing/landing only.
    return pathname === '/';
  }, [pathname]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !shouldEnableSmoothScroll) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    if (lenisRef.current) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.15,
    });
    lenisRef.current = lenis;

    let raf = 0;
    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [shouldEnableSmoothScroll]);

  return <>{children}</>;
}
