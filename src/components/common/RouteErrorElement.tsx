import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

/**
 * Used as `errorElement` on `createBrowserRouter` routes (same idea as worko `ErrorFallback`).
 * React Router passes route/loader errors here; call `useRouteError()` to read them.
 */
export function RouteErrorElement() {
  const error = useRouteError();
  let message = 'An unexpected error occurred';
  if (isRouteErrorResponse(error)) {
    message = error.statusText || String(error.data ?? error.status);
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="font-heading text-2xl font-semibold text-foreground">Something went wrong</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        This route hit an error. You can return home and try again.
      </p>
      <pre className="max-h-40 max-w-full overflow-auto rounded-lg border border-border bg-muted/40 p-3 text-left text-xs text-muted-foreground">
        {message}
      </pre>
      <Button asChild>
        <Link to={ROUTES.home} replace>
          Go home
        </Link>
      </Button>
    </div>
  );
}
