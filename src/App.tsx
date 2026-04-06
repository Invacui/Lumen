import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LoadingCurtain } from '@/components/common/LoadingCurtain';
import AppRoutes from './Routes';

/**
 * Shell only: provides the data router (same pattern as worko-ui-react `App` + `Routes.tsx`).
 * Smooth scroll and global providers live in `main.tsx`.
 */
export default function App() {
  const [showCurtain, setShowCurtain] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showCurtain && <LoadingCurtain onComplete={() => setShowCurtain(false)} />}
      </AnimatePresence>
      <RouterProvider router={AppRoutes} />
    </>
  );
}
