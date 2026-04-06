# Finance Dashboard — Frontend Architecture Plan

> React 18 · Vite · TypeScript · Tailwind · shadcn/ui · Redux Toolkit · React Hook Form · OAuth (Google)

---

## 1. What We Are Building

A frontend-only finance dashboard that lets users track their financial activity — balance overview,
transaction history, spending patterns, and basic insights. The stack and conventions follow the
LeadFlow frontend reference exactly, with three deliberate changes: **Vite** replaces Next.js
(React SPA, no SSR), **Redux Toolkit** replaces Zustand for application state, and **Google OAuth**
replaces email/password as the authentication entry point. All data is mocked locally — no
real backend is required.

The goal is a clean, professional submission that demonstrates component architecture, state
management discipline, role-based UI, and design quality. An evaluator who has read the LeadFlow
docs will recognise the same patterns and conventions throughout.

---

## 2. Tech Stack

| Category | Library | Version | Reason |
|---|---|---|---|
| Framework | React | 18 | Component model, hooks |
| Build Tool | Vite | 5 | Fast HMR, no SSR overhead needed |
| Language | TypeScript | 5.x strict | Same as LeadFlow — strict mode on |
| Styling | Tailwind CSS | 3.x | Utility-first, dark mode via `dark:` |
| Component Library | shadcn/ui | latest | Radix primitives + Tailwind, owned code |
| Global State | Redux Toolkit (RTK) | 2.x | Auth state, UI state, transaction state |
| Server State / Cache | TanStack Query | v5 | Query caching over mock service layer |
| Forms | React Hook Form + Zod | latest | Same as LeadFlow — RHF + zodResolver |
| Routing | React Router | v6 | Client-side routing, protected routes |
| HTTP / Mock | Axios + mock adapter | v1 | Mirrors LeadFlow service layer shape |
| Auth | Google OAuth (react-oauth/google) | latest | `useGoogleLogin`, token stored in Redux |
| Tables | TanStack Table | v8 | Transactions table |
| Charts | Recharts | v2 | Balance trend, spending donut, monthly bar |
| Notifications | Sonner | latest | Toast system |
| Date Handling | date-fns | v3 | Format timestamps, relative dates |
| Icons | Lucide React | latest | Consistent icon set |
| Animation | Framer Motion | v11 | Page transitions, card reveals |

---

## 3. Data Strategy

All data lives in `src/data/` as typed TypeScript files. A mock service layer in `src/services/`
wraps that data and returns it through async functions — so the hooks look identical to a real API
integration. Axios with `axios-mock-adapter` intercepts every request and returns the mock data.
Swapping to a real API later means only changing the service layer.

### Mock data seed

- ~50 transactions spread across 6 categories over 3 months
- 6 categories: Food, Transport, Utilities, Entertainment, Health, Income
- 2 user roles seeded: `viewer@demo.com` (Viewer) and `admin@demo.com` (Admin)
- Monthly summary pre-computed from transactions

### Mock service shape (mirrors LeadFlow `services/`)

```ts
// src/services/transaction.service.ts
import { api } from '@/lib/axios';

export const transactionService = {
  list:   (filters?: TransactionFilters) => api.get('/transactions', { params: filters }),
  get:    (id: string)                   => api.get(`/transactions/${id}`),
  create: (dto: CreateTransactionDto)    => api.post('/transactions', dto),
  update: (id: string, dto: UpdateTransactionDto) => api.patch(`/transactions/${id}`, dto),
  remove: (id: string)                   => api.delete(`/transactions/${id}`),
};
```

---

## 4. OAuth Setup (Google)

Since this is a Vite SPA (no Next.js server), OAuth is handled fully client-side via
`@react-oauth/google`. The Google ID token returned after login is decoded client-side to extract
`name`, `email`, and `picture`. The token and user object are stored in Redux. No backend token
exchange is performed — this is a frontend demonstration.

### Flow

```
User clicks "Sign in with Google"
  └── GoogleOAuthProvider wraps the app (main.tsx)
        └── useGoogleLogin() triggers the Google popup
              └── onSuccess receives { credential } (JWT ID token)
                    └── jwtDecode(credential) → { name, email, picture, sub }
                          └── dispatch(setAuth({ user, token: credential }))
                                └── Redux auth slice stores user + token
                                      └── ProtectedRoute reads isAuthenticated → allow
```

### Role assignment (demo only)

Because there is no real backend, role is assigned on the frontend by matching the Google email
against a hard-coded role map in `src/constants/roles.ts`. In a real system this comes from the
API.

```ts
// src/constants/roles.ts
export const ROLE_MAP: Record<string, Role> = {
  'admin@demo.com':  'admin',
};
// Everyone else defaults to 'viewer'
export const DEFAULT_ROLE: Role = 'viewer';
```

A **Role Switcher** dropdown in the topbar lets the evaluator toggle roles without logging out,
for easy demonstration.

---

## 5. Folder Structure

```
finance-dashboard/
│
├── public/
│   └── favicon.ico
│
├── src/
│   │
│   ├── app/                         # App entry and providers
│   │   ├── App.tsx                  # Router, layout switch
│   │   ├── main.tsx                 # ReactDOM.render, GoogleOAuthProvider, Redux Provider
│   │   └── providers.tsx            # QueryClientProvider, Toaster, ThemeProvider
│   │
│   ├── pages/                       # Route-level page components
│   │   ├── LoginPage.tsx            # Google OAuth sign-in screen
│   │   ├── DashboardPage.tsx        # Overview: summary cards + charts
│   │   ├── TransactionsPage.tsx     # Transactions table + filters
│   │   ├── InsightsPage.tsx         # Spending breakdown + monthly comparison
│   │   └── NotFoundPage.tsx         # 404
│   │
│   ├── components/                  # All UI components
│   │   │
│   │   ├── ui/                      # shadcn/ui generated (never edit manually)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── select.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ...
│   │   │
│   │   ├── common/                  # Reusable cross-feature components
│   │   │   ├── PageHeader.tsx       # Title + subtitle + optional action button
│   │   │   ├── DataTable.tsx        # TanStack Table wrapper with pagination
│   │   │   ├── EmptyState.tsx       # Empty list illustration + CTA
│   │   │   ├── ErrorBoundary.tsx    # Client error boundary
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ConfirmDialog.tsx    # "Are you sure?" dialog
│   │   │   └── StatusBadge.tsx      # Coloured type/category chips
│   │   │
│   │   ├── layout/                  # App shell components
│   │   │   ├── DashboardSidebar.tsx # Nav links, logo, collapse toggle
│   │   │   ├── DashboardTopbar.tsx  # User avatar, role switcher, dark mode toggle
│   │   │   ├── MobileNav.tsx        # Bottom nav / drawer for mobile
│   │   │   └── ProtectedRoute.tsx   # Reads Redux isAuthenticated, redirects to /login
│   │   │
│   │   ├── dashboard/               # Feature: overview page
│   │   │   ├── SummaryCard.tsx      # Single KPI card (balance / income / expenses)
│   │   │   ├── SummaryGrid.tsx      # 4-card responsive grid
│   │   │   ├── BalanceTrendChart.tsx # Recharts LineChart — monthly balance
│   │   │   └── SpendingDonutChart.tsx # Recharts PieChart — category breakdown
│   │   │
│   │   ├── transactions/            # Feature: transactions page
│   │   │   ├── TransactionTable.tsx # TanStack Table, sortable columns
│   │   │   ├── FilterBar.tsx        # Type / category / date range / search filters
│   │   │   ├── AddTransactionModal.tsx  # RHF form — admin only
│   │   │   └── EditTransactionModal.tsx # RHF form — admin only
│   │   │
│   │   └── insights/                # Feature: insights page
│   │       ├── InsightCard.tsx      # Single insight tile
│   │       ├── MonthlyBarChart.tsx  # Recharts BarChart — income vs expense per month
│   │       └── TopCategoryBadge.tsx # Highest spend category callout
│   │
│   ├── hooks/                       # TanStack Query hooks (one file per query/mutation)
│   │   ├── transactions/
│   │   │   ├── useTransactions.ts   # GET /transactions (filtered list)
│   │   │   ├── useTransaction.ts    # GET /transactions/:id
│   │   │   ├── useCreateTransaction.ts  # POST /transactions (admin)
│   │   │   ├── useUpdateTransaction.ts  # PATCH /transactions/:id (admin)
│   │   │   └── useDeleteTransaction.ts  # DELETE /transactions/:id (admin)
│   │   └── summary/
│   │       ├── useSummary.ts        # Computed totals from mock data
│   │       └── useInsights.ts       # Category breakdown + MoM comparison
│   │
│   ├── store/                       # Redux Toolkit slices
│   │   ├── index.ts                 # configureStore — combines all slices
│   │   ├── auth.slice.ts            # user, token, role, isAuthenticated
│   │   ├── ui.slice.ts              # sidebarOpen, activeModal, theme
│   │   └── filters.slice.ts         # activeFilters (type, category, dateRange, search)
│   │
│   ├── services/                    # Axios call functions — components never call api directly
│   │   ├── transaction.service.ts
│   │   └── summary.service.ts
│   │
│   ├── data/                        # Mock data — replaces a real DB
│   │   ├── transactions.mock.ts     # ~50 typed Transaction records
│   │   ├── summary.mock.ts          # Pre-computed monthly summaries
│   │   └── categories.mock.ts       # Category list with colours
│   │
│   ├── lib/                         # Shared utilities
│   │   ├── axios.ts                 # Axios instance + mock adapter setup
│   │   ├── queryClient.ts           # TanStack Query client config
│   │   ├── queryKeys.ts             # Centralised query key factory
│   │   └── utils.ts                 # cn(), formatCurrency(), formatDate(), getRole()
│   │
│   ├── schemas/                     # Zod validation schemas (used with RHF)
│   │   └── transaction.schema.ts    # CreateTransactionSchema, UpdateTransactionSchema
│   │
│   ├── types/                       # TypeScript types
│   │   ├── transaction.types.ts
│   │   ├── auth.types.ts            # User, Role, AuthState
│   │   └── api.types.ts             # ApiResponse<T> wrapper shape
│   │
│   └── constants/
│       ├── routes.ts                # Route path strings
│       ├── categories.ts            # Category enum + colour map
│       └── roles.ts                 # ROLE_MAP, DEFAULT_ROLE, Role type
│
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── .env
```

---

## 6. Redux Slices

All global application state lives in Redux Toolkit. TanStack Query owns server/async state.
The two never overlap.

### `store/auth.slice.ts`

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User, Role } from '@/types/auth.types';

interface AuthState {
  user:            User | null;
  token:           string | null;
  role:            Role;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user:            null,
  token:           null,
  role:            'viewer',
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: User; token: string; role: Role }>) => {
      state.user            = action.payload.user;
      state.token           = action.payload.token;
      state.role            = action.payload.role;
      state.isAuthenticated = true;
    },
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;        // demo role switcher
    },
    clearAuth: (state) => {
      state.user            = null;
      state.token           = null;
      state.role            = 'viewer';
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, setRole, clearAuth } = authSlice.actions;
```

### `store/ui.slice.ts`

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  activeModal: string | null;
  theme:       'light' | 'dark';
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: { sidebarOpen: true, activeModal: null, theme: 'light' } as UIState,
  reducers: {
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen; },
    openModal:     (state, action: PayloadAction<string>) => { state.activeModal = action.payload; },
    closeModal:    (state) => { state.activeModal = null; },
    setTheme:      (state, action: PayloadAction<'light' | 'dark'>) => { state.theme = action.payload; },
  },
});
```

### `store/filters.slice.ts`

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TransactionType, Category } from '@/types/transaction.types';

interface FiltersState {
  type:      TransactionType | 'all';
  category:  Category | 'all';
  dateFrom:  string | null;
  dateTo:    string | null;
  search:    string;
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: { type: 'all', category: 'all', dateFrom: null, dateTo: null, search: '' } as FiltersState,
  reducers: {
    setFilter:    (state, action: PayloadAction<Partial<FiltersState>>) => ({ ...state, ...action.payload }),
    resetFilters: () => ({ type: 'all', category: 'all', dateFrom: null, dateTo: null, search: '' }),
  },
});
```

---

## 7. React Hook Form + Zod Pattern

All forms (Add Transaction, Edit Transaction) use React Hook Form with Zod resolver — exactly the
LeadFlow convention.

```ts
// src/schemas/transaction.schema.ts
import { z } from 'zod';

export const createTransactionSchema = z.object({
  description: z.string().min(2, 'Required').max(120),
  amount:      z.number({ invalid_type_error: 'Must be a number' }).positive('Must be positive'),
  type:        z.enum(['income', 'expense']),
  category:    z.enum(['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Income']),
  date:        z.string().min(1, 'Required'),
});

export type CreateTransactionDto = z.infer<typeof createTransactionSchema>;
```

```tsx
// inside AddTransactionModal.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTransactionSchema, type CreateTransactionDto } from '@/schemas/transaction.schema';

const { register, handleSubmit, formState: { errors } } = useForm<CreateTransactionDto>({
  resolver: zodResolver(createTransactionSchema),
});
```

---

## 8. TanStack Query — Hooks Pattern

The hook layer wraps the service layer. Components never call `transactionService` directly.

### Query key factory (`lib/queryKeys.ts`)

```ts
export const queryKeys = {
  transactions: {
    all:    ()                         => ['transactions'] as const,
    list:   (filters: object)          => ['transactions', 'list', filters] as const,
    detail: (id: string)               => ['transactions', 'detail', id] as const,
  },
  summary: {
    totals:   ()                       => ['summary', 'totals'] as const,
    insights: ()                       => ['summary', 'insights'] as const,
  },
};
```

### Hook example (`hooks/transactions/useTransactions.ts`)

```ts
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { queryKeys } from '@/lib/queryKeys';
import { transactionService } from '@/services/transaction.service';
import type { RootState } from '@/store';

/**
 * Fetches the filtered transaction list.
 * Filters come from Redux filters slice — query re-runs automatically when they change.
 */
export function useTransactions() {
  const filters = useSelector((s: RootState) => s.filters);

  return useQuery({
    queryKey: queryKeys.transactions.list(filters),
    queryFn:  () => transactionService.list(filters).then(r => r.data),
  });
}
```

### Mutation example (`hooks/transactions/useCreateTransaction.ts`)

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { transactionService } from '@/services/transaction.service';

export function useCreateTransaction() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: transactionService.create,
    onSuccess:  () => qc.invalidateQueries({ queryKey: queryKeys.transactions.all() }),
    onError:    (err) => console.error('[useCreateTransaction]', err),
  });
}
```

---

## 9. Route Structure

```ts
// src/constants/routes.ts
export const ROUTES = {
  login:        '/login',
  dashboard:    '/dashboard',
  transactions: '/transactions',
  insights:     '/insights',
} as const;
```

```tsx
// src/app/App.tsx
<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route element={<ProtectedRoute />}>
    <Route element={<DashboardLayout />}>
      <Route path="/dashboard"    element={<DashboardPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/insights"     element={<InsightsPage />} />
    </Route>
  </Route>
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

`ProtectedRoute` reads `isAuthenticated` from Redux. If false, it redirects to `/login`.
After Google OAuth succeeds, the app redirects to `/dashboard`.

---

## 10. App Modules

### 10.1 Dashboard Overview

Page: `DashboardPage.tsx`

- **SummaryGrid** — 4 cards: Total Balance, Monthly Income, Monthly Expenses, Savings Rate
- **BalanceTrendChart** — Recharts `LineChart` — last 3 months of running balance
- **SpendingDonutChart** — Recharts `PieChart` — spending by category
- Data comes from `useSummary()` hook

### 10.2 Transactions

Page: `TransactionsPage.tsx`

- **FilterBar** — dropdowns for Type (income/expense/all), Category, Date range; text search
- Filters are stored in Redux `filters` slice — not local state
- **TransactionTable** — TanStack Table with pagination, column sort on Date and Amount
- **Admin only** — Add button (opens `AddTransactionModal`), edit icon per row, delete icon per row
- **Viewer** — all action buttons hidden; table is read-only
- Empty state and loading skeleton always handled

### 10.3 Insights

Page: `InsightsPage.tsx`

- **MonthlyBarChart** — Recharts `BarChart` — income vs expense stacked per month
- **Top Category card** — highest spending category this month
- **Biggest Transaction card** — single largest expense
- **Trend sentence** — auto-generated string e.g. "You spent 12% more on Food this month"
- Data from `useInsights()` hook

### 10.4 Role-Based UI

| UI Element | Viewer | Admin |
|---|---|---|
| Add Transaction button | Hidden | Visible |
| Edit icon per row | Hidden | Visible |
| Delete icon per row | Hidden | Visible |
| Role badge in topbar | "Viewer" chip | "Admin" chip |
| All charts and tables | Visible | Visible |
| Role Switcher dropdown | Visible (demo) | Visible (demo) |

Role is read from Redux `auth.role`. A `useRole()` helper hook returns `{ isAdmin, isViewer }`.

```ts
// src/lib/utils.ts
export function useRole() {
  const role = useSelector((s: RootState) => s.auth.role);
  return { isAdmin: role === 'admin', isViewer: role === 'viewer' };
}
```

---

## 11. Component Code Convention

Every component follows this exact import order and structure — same as LeadFlow:

```tsx
'use client'; // omit in Vite — not needed

// 1. React
import { useState, useCallback } from 'react';

// 2. Third-party
import { useForm }       from 'react-hook-form';
import { zodResolver }   from '@hookform/resolvers/zod';
import { useDispatch }   from 'react-redux';

// 3. Internal — aliases only, ordered: components → hooks → store → lib → types
import { DataTable }     from '@/components/common/DataTable';
import { useTransactions } from '@/hooks/transactions/useTransactions';
import { openModal }     from '@/store/ui.slice';
import { cn }            from '@/lib/utils';
import type { Transaction } from '@/types/transaction.types';

// 4. Local schema / constants
import { createTransactionSchema } from '@/schemas/transaction.schema';

// ── Types ──────────────────────────────────────────────────────────────────
interface AddTransactionModalProps {
  onClose: () => void;
}

// ── Component ──────────────────────────────────────────────────────────────
/**
 * AddTransactionModal
 *
 * RHF form for creating a new transaction. Admin-only.
 * On success, invalidates the transactions list cache via useCreateTransaction.
 */
export function AddTransactionModal({ onClose }: AddTransactionModalProps) {
  const dispatch = useDispatch();
  const { mutate, isPending } = useCreateTransaction();

  const { register, handleSubmit, formState: { errors } } = useForm<CreateTransactionDto>({
    resolver: zodResolver(createTransactionSchema),
  });

  const onSubmit = useCallback((data: CreateTransactionDto) => {
    mutate(data, { onSuccess: onClose });
  }, [mutate, onClose]);

  return (
    <div className={cn('flex flex-col gap-4')}>
      {/* form fields */}
    </div>
  );
}
```

### Defensive rendering — always handle all four states

```tsx
function TransactionList() {
  const { data, isLoading, isError, error } = useTransactions();

  if (isLoading) return <TransactionTableSkeleton />;
  if (isError)   return <ErrorBoundary message={error.message} />;
  if (!data?.length) return <EmptyState title="No transactions" cta="Add your first transaction" />;

  return <TransactionTable data={data} />;
}
```

---

## 12. Import Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*":            ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/hooks/*":      ["src/hooks/*"],
      "@/store/*":      ["src/store/*"],
      "@/lib/*":        ["src/lib/*"],
      "@/services/*":   ["src/services/*"],
      "@/types/*":      ["src/types/*"],
      "@/schemas/*":    ["src/schemas/*"],
      "@/constants/*":  ["src/constants/*"],
      "@/data/*":       ["src/data/*"]
    }
  }
}
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

---

## 13. Data Flow

### Query flow (read)

```
Page component
  └── useTransactions() / useSummary() / useInsights()   ← TanStack Query hook
        └── transactionService.list(filters)              ← service function
              └── api.get('/transactions', { params })    ← Axios + mock adapter
                    └── transactions.mock.ts              ← static TypeScript data
```

### Mutation flow (write — admin only)

```
User submits RHF form
  └── useCreateTransaction().mutate(dto)
        └── onSuccess → queryClient.invalidateQueries(['transactions'])
        └── onError   → toast.error(message)
        └── transactionService.create(dto)
              └── api.post('/transactions', dto)          ← mock adapter intercepts
                    └── pushes to in-memory mock array   ← survives until page refresh
```

### Auth flow

```
LoginPage mounts
  └── GoogleOAuthProvider wraps entire app (main.tsx)
        └── User clicks "Sign in with Google"
              └── useGoogleLogin() → Google popup
                    └── onSuccess({ credential })
                          └── jwtDecode(credential) → { name, email, picture }
                                └── dispatch(setAuth({ user, token, role }))
                                      └── navigate('/dashboard')
```

---

## 14. TypeScript — Strict Config

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

---

## 15. Environment Variables

```env
# .env
VITE_GOOGLE_CLIENT_ID=<your-google-client-id>
```

All `VITE_` prefixed variables are exposed to the browser by Vite. No server-only secrets exist
because there is no backend.

---

## 16. Build Order

| Phase | What gets built |
|---|---|
| 01 | Vite + React + TypeScript setup, Tailwind, shadcn/ui init, path aliases |
| 02 | Types (`transaction.types.ts`, `auth.types.ts`, `api.types.ts`) |
| 03 | Mock data seed (`transactions.mock.ts`, `summary.mock.ts`, `categories.mock.ts`) |
| 04 | Axios instance + mock adapter (`lib/axios.ts`) + service layer |
| 05 | Redux store (`auth.slice`, `ui.slice`, `filters.slice`, `store/index.ts`) |
| 06 | Google OAuth — `main.tsx` provider, `LoginPage.tsx`, `useGoogleLogin` flow |
| 07 | `ProtectedRoute.tsx`, routing (`App.tsx`), `DashboardLayout.tsx` |
| 08 | Layout shell — `DashboardSidebar`, `DashboardTopbar`, `MobileNav`, `RoleSwitcher` |
| 09 | Zod schemas + RHF wiring (`transaction.schema.ts`) |
| 10 | TanStack Query hooks (`useTransactions`, `useSummary`, `useInsights`, mutations) |
| 11 | Dashboard page — `SummaryGrid`, `BalanceTrendChart`, `SpendingDonutChart` |
| 12 | Transactions page — `FilterBar`, `TransactionTable`, `AddTransactionModal`, `EditTransactionModal` |
| 13 | Insights page — `MonthlyBarChart`, `InsightCard`, `TopCategoryBadge` |
| 14 | RBAC polish — gate all admin actions behind `isAdmin` check, role badge |
| 15 | Responsive + dark mode — mobile sidebar drawer, Tailwind `dark:` variants |
| 16 | Optional: CSV export, Framer Motion transitions, localStorage persistence |

---

## 17. Optional Enhancements

| Enhancement | Approach |
|---|---|
| Dark mode | Tailwind `dark:` + `setTheme` Redux action + `class` strategy on `<html>` |
| Data persistence | Serialize in-memory mock array to `localStorage` on every mutation |
| CSV export | `Array.map` transactions → CSV string, trigger `<a download>` |
| Framer Motion | `AnimatePresence` on route change, `motion.div` on card mount |
| Advanced filtering | Date range picker (shadcn Calendar), amount range slider |

---

## 18. Evaluation Criteria — Coverage

| Criterion | How it is addressed |
|---|---|
| Design and creativity | shadcn/ui + Tailwind, consistent spacing, colour-coded categories, dark mode |
| Responsiveness | Mobile-first Tailwind classes, sidebar collapses to drawer on small screens |
| Functionality | Dashboard, Transactions, Insights, RBAC, filters, sort, add/edit/delete |
| User experience | Empty states, loading skeletons, toast notifications, role switcher for demo |
| Technical quality | Strict TypeScript, LeadFlow conventions, layered architecture |
| State management | Redux for global state, TanStack Query for async data, RHF for forms — clear separation |
| Documentation | This document + README with setup instructions |
| Attention to detail | LFT rendering checks (loading → error → empty → data), JSDoc on all exports |

---

*Finance Dashboard Frontend Plan v1.0*