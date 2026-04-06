import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Providers } from '@/components/common/Providers';
import { SmoothScrollProvider } from '@/components/marketing/SmoothScrollProvider';
import App from './App';
import 'lenis/dist/lenis.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <SmoothScrollProvider>
        <App />
      </SmoothScrollProvider>
    </Providers>
  </StrictMode>,
);
