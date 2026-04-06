import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFinanceAuth, selectFinanceIsAuthenticated } from '@/store/financeAuth.slice';
import { getRoleForEmail } from '@/constants/roles';
import { ROUTES } from '@/constants/routes';
import logoUrl from '@/assets/icons/logo.svg?url';

function decodeJwtPayload(token: string): Record<string, unknown> {
  const base64 = token.split('.')[1]?.replace(/-/g, '+').replace(/_/g, '/') ?? '';
  return JSON.parse(atob(base64)) as Record<string, unknown>;
}

/** Finance login page with Google OAuth and a demo login option. */
export default function FinanceLoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectFinanceIsAuthenticated);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.dashboard, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
      if (!clientId || !buttonRef.current || !window.google) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: ({ credential }) => {
          if (!credential) return;
          try {
            const payload = decodeJwtPayload(credential);
            const user = {
              name: String(payload.name ?? ''),
              email: String(payload.email ?? ''),
              picture: String(payload.picture ?? ''),
            };
            const role = getRoleForEmail(user.email);
            dispatch(setFinanceAuth({ user, token: credential, role }));
            toast.success(`Welcome, ${user.name}`);
            navigate(ROUTES.dashboard);
          } catch {
            toast.error('Google sign-in failed');
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        width: '320',
      });
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [dispatch, navigate]);

  const handleDemoLogin = () => {
    dispatch(
      setFinanceAuth({
        user: { name: 'Demo User', email: 'viewer@demo.com', picture: '' },
        token: 'demo-token',
        role: 'viewer',
      }),
    );
    toast.success('Signed in as Demo User');
    navigate(ROUTES.dashboard);
  };

  const handleAdminDemo = () => {
    dispatch(
      setFinanceAuth({
        user: { name: 'Admin User', email: 'admin@demo.com', picture: '' },
        token: 'admin-token',
        role: 'admin',
      }),
    );
    toast.success('Signed in as Admin');
    navigate(ROUTES.dashboard);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <img src={logoUrl} alt="Lumen Logo" className="h-12 w-12 rounded-2xl object-cover shadow-lg" />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Lumen</h1>
            <p className="text-sm text-zinc-400">Track your income & expenses</p>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Access your personal finance dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google OAuth button (renders if VITE_GOOGLE_CLIENT_ID is set) */}
            <div ref={buttonRef} className="flex justify-center" />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Demo login buttons */}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleDemoLogin}
              >
                Demo Login (Viewer)
              </Button>
              <Button
                variant="outline"
                className="w-full border-violet-300 text-violet-700 hover:bg-violet-50 dark:border-violet-700 dark:text-violet-400 dark:hover:bg-violet-900/20"
                onClick={handleAdminDemo}
              >
                Demo Login (Admin)
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Admin role can add, edit and delete transactions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
