# Lumen Expense Tracker

Lumen is a frontend finance dashboard that helps users track spending, income, savings trends, and transaction activity with a modern dark UI.

It includes: 
- Google/demo login flow and role-based access (`viewer` / `admin`)
- Dashboard analytics (ApexCharts + Recharts in feature pages)
- Insights and category analysis
- Transaction filtering, URL-synced filters, and CSV export
- Bank connect demo flow

---

## Tech Stack

### Core
- `react` + `react-dom` (React 18)
- `vite` (build/dev server)
- `typescript` (strict TS setup)

### State and Data
- `@reduxjs/toolkit` + `react-redux`
- `@tanstack/react-query`
- `axios` + `axios-mock-adapter` (mock API layer)

### UI and Styling
- `tailwindcss`
- `framer-motion`
- `lucide-react`
- `@radix-ui/*` primitives (via app UI components)
- `sonner` (toasts)

### Forms, Validation, Tables, Charts
- `react-hook-form`
- `zod` + `@hookform/resolvers`
- `@tanstack/react-table`
- `recharts`
- `apexcharts` + `react-apexcharts`

### Routing and Utilities
- `react-router-dom`
- `date-fns`
- `clsx`, `class-variance-authority`, `tailwind-merge`

---

## Quick Start

```bash
npm install
npm run dev
```

Local app: [http://localhost:5173](http://localhost:5173)

---

## Environment Variables

Create an env file (example: `.env.local`):

```bash
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_API_URL=http://localhost:3000
```

Notes:
- `VITE_GOOGLE_CLIENT_ID` enables Google Sign-In.
- Demo viewer/admin login still works without Google setup.
- Finance data is mocked in local files and served through the mock API layer.

---

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run test
npm run test:ui
```

---

## Project Structure

```txt
src/
  components/
    finance/                 # dashboard, transactions, insights, layout components
    marketing/               # landing/marketing components
    ui/                      # reusable UI primitives
  data/                      # mocked transactions and summary data
  hooks/
    transactions/            # transaction-related hooks (queries, URL filters)
    summary/                 # summary/insight hooks
  layouts/
    finance/                 # authenticated app shell
    marketing/               # landing shell
  pages/
    finance/                 # Dashboard, Transactions, Insights, Account, Bank Connect, Login
    marketing/               # landing page(s)
  services/                  # API service wrappers
  store/                     # Redux slices and store config
  constants/                 # routes, categories, roles
  lib/                       # shared utilities and API setup
  Routes.tsx                 # route tree
```

---

## Main Routes

- `/` marketing landing
- `/login`
- `/dashboard`
- `/transactions`
- `/insights`
- `/account`
- `/bank-connect`

---

## Roles

- `viewer`: read-only analytics and transaction browsing
- `admin`: can add/edit/delete transactions

Use the role switcher in the finance topbar for demo/testing.