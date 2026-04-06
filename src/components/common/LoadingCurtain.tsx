import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import wordmark from '@/assets/icons/wordmark.png'
interface LoadingCurtainProps {
  onComplete: () => void;
}

/**
 * Full-screen launch curtain.
 * Keeps the UI hidden until initial browser resource loading completes,
 * then animates upward like a stage curtain.
 */
export function LoadingCurtain({ onComplete }: LoadingCurtainProps) {
  const [progress, setProgress] = useState(8);
  const [isLoaded, setIsLoaded] = useState(document.readyState === 'complete');
  const [minDurationReached, setMinDurationReached] = useState(false);
  const canClose = isLoaded && minDurationReached;

  useEffect(() => {
    if (isLoaded) return;

    const onLoaded = () => setIsLoaded(true);
    window.addEventListener('load', onLoaded);

    return () => window.removeEventListener('load', onLoaded);
  }, [isLoaded]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMinDurationReached(true);
    },4000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (canClose) {
      setProgress(100);
      return;
    }

    const timer = window.setInterval(() => {
      setProgress((current) => Math.min(current + 2, 92));
    }, 50);

    return () => window.clearInterval(timer);
  }, [canClose]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: canClose ? '-100%' : '0%' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (canClose) onComplete();
      }}
      className="fixed inset-0 z-[9999] bg-[#050505]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.2),_transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(6,182,212,0.12),_transparent_55%)]" />
      <div className="relative flex h-full flex-col items-center justify-center px-6">
        <img src={wordmark} alt="Lumen" className=" h-20 w-auto" />
        <p className="mt-2 tracking-widest animate-pulse text-4xl text-white" style={{ fontFamily: '"Brush Script MT", "Lucida Handwriting", cursive' }}>
          Lumen is loading...
        </p>

        <div className="mt-8 h-2 w-full max-w-sm overflow-hidden rounded-full bg-white/10">
          <motion.div
        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-green-400"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
