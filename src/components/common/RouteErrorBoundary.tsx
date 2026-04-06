import { Component, type ErrorInfo, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type RouteErrorBoundaryProps = {
  children: ReactNode;
};

type RouteErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

/**
 * ## Why a class component?
 * React only supports error boundaries as **class components** (or via libraries that wrap one).
 * There is no `useErrorBoundary` hook in core React; `getDerivedStateFromError` / `componentDidCatch`
 * are the supported API for catching render errors in the subtree.
 *
 * ## What gets caught?
 * - Errors thrown **during render** in any descendant.
 * - Errors in **lifecycle methods** of class children.
 * - Errors in **event handlers are NOT caught** (handle those with try/catch).
 * - Errors in **async code** (e.g. `setTimeout`, failed `fetch`) are NOT caught unless they
 *   trigger a failing re-render.
 *
 * ## “Router level”
 * Prefer `errorElement` on `createBrowserRouter` routes (`RouteErrorElement`) for the same UX.
 * Use this class boundary when you need to wrap a specific subtree outside the data router API.
 *
 * ## Recovery
 * `reset()` clears local error state so React can try rendering `children` again. For fatal
 * route bugs you may still need a full reload — the UI offers both “Try again” and “Go home”.
 */
export class RouteErrorBoundary extends Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
  state: RouteErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): Partial<RouteErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[RouteErrorBoundary]', error, errorInfo.componentStack);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <RouterErrorFallback error={this.state.error} onReset={this.reset} />
      );
    }
    return this.props.children;
  }
}

function RouterErrorFallback({ error, onReset }: { error: Error; onReset: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="font-heading text-2xl font-semibold text-foreground">Something went wrong</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        This page hit an unexpected error. You can try rendering the route again or return home.
      </p>
      <pre className="max-h-40 max-w-full overflow-auto rounded-lg border border-border bg-muted/40 p-3 text-left text-xs text-muted-foreground">
        {error.message}
      </pre>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button type="button" variant="default" onClick={onReset}>
          Try again
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            onReset();
            navigate('/', { replace: true });
          }}
        >
          Go home
        </Button>
      </div>
    </div>
  );
}
