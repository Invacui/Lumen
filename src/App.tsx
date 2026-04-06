import { RouterProvider } from 'react-router-dom';
import AppRoutes from './Routes';

/**
 * Shell only: provides the data router (same pattern as worko-ui-react `App` + `Routes.tsx`).
 * Smooth scroll and global providers live in `main.tsx`.
 */
export default function App() {
  return <RouterProvider router={AppRoutes} />;
}
