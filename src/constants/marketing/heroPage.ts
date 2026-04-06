/**
 * Marketing landing (`HeroPage`) — copy, stats, and section data.
 */

export const heroSection = {
  badge: "Now in public beta",
  titleLine1: "Your Money.",
  titleLine2: "Fully Tracked.",
  subtitle:
    "Lumen gives you crystal-clear visibility into every dollar. Smart budgets, live categorization, and actionable insights — all in one disciplined dashboard.",
  primaryCta: "Get Started Free",
  secondaryCta: "Watch Demo",
  stats: [
    { value: "50K+", label: "Active users" },
    { value: "$2.4B", label: "Tracked monthly" },
    { value: "4.9", label: "App rating", suffix: "★" },
  ],
} as const;

export const trustedBySection = {
  title: "Trusted by teams who take cash flow seriously",
  companies: [
    "Northwind",
    "Vertex Labs",
    "Apex Ledger",
    "Meridian",
    "Catalyst",
    "Harborline",
    "Brightcap",
    "Keystone",
  ],
} as const;

export const featuresSection = {
  eyebrow: "Features",
  title: "Everything you need to",
  titleAccent: "master your finances",
  description:
    "A complete surface for tracking, planning, and reporting — designed for clarity under pressure.",
  items: [
    {
      id: "unified",
      title: "Unified ledger",
      description: "Accounts, cards, and cash in one timeline with reconciliation cues.",
      variant: "default" as const,
    },
    {
      id: "budgets",
      title: "Budget guardrails",
      description: "Rolling budgets with alerts before you drift off plan.",
      variant: "featured" as const,
    },
    {
      id: "exports",
      title: "Exports that audit",
      description: "CSV and scheduled exports with immutable snapshots for finance review.",
      variant: "default" as const,
    },
    {
      id: "roles",
      title: "Role-aware views",
      description: "Viewer and admin paths so sensitive actions stay gated.",
      variant: "wide" as const,
    },
    {
      id: "insights",
      title: "Insight cards",
      description: "Variance and trend cards that surface what changed, not noise.",
      variant: "default" as const,
    },
  ],
} as const;

export const howItWorksSection = {
  eyebrow: "How it works",
  title: "Up and running in three steps",
  steps: [
    {
      id: "manage",
      title: "Connect & manage",
      description: "Link accounts or import activity. Lumen normalizes merchants and categories.",
    },
    {
      id: "calculate",
      title: "Calculate & categorize",
      description: "Rules and suggestions keep the ledger accurate without busywork.",
    },
    {
      id: "export",
      title: "Report & export",
      description: "Share dashboards or export with a clear audit trail for stakeholders.",
    },
  ],
} as const;

export const pricingSection = {
  eyebrow: "Pricing",
  title: "Plans that scale with your books",
  description: "Start free. Upgrade when you need deeper controls and export volume.",
  plans: [
    {
      id: "starter",
      name: "Starter",
      price: "$0",
      cadence: "/mo",
      blurb: "For individuals getting organized.",
      features: [
        "Core dashboard & balances",
        "30-day transaction history",
        "CSV export",
        "Single user",
        "Email support",
        "Mobile-friendly views",
        "Basic categorization rules",
        "Spending summaries by week",
      ],
      cta: "Start free",
      highlighted: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: "$24",
      cadence: "/mo",
      blurb: "For operators who live in the numbers.",
      features: [
        "Unlimited history",
        "Scheduled exports",
        "Role management & audit views",
        "Priority in-app support",
        "Custom categories & rules",
        "Budget alerts & variance tracking",
        "API access (beta)",
        "Shared workspaces",
        "Multi-currency support",
        "Webhook notifications",
        "Variance drill-down reports",
      ],
      cta: "Start Pro trial",
      highlighted: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      cadence: "",
      blurb: "For finance teams with compliance needs.",
      features: [
        "SSO & directory sync (roadmap)",
        "Immutable audit trails",
        "Dedicated success manager",
        "Custom retention policies",
        "SLA options",
        "Security review support",
        "Private deployment options",
        "Custom integrations & data residency",
      ],
      cta: "Talk to sales",
      highlighted: false,
    },
  ],
} as const;

export type TestimonialPosition = {
  top: string;
  left: string;
  rotate?: string;
};

export const testimonialsSection = {
  eyebrow: "Testimonials",
  title: "Loved by thousands of users",
  items: [
    {
      id: "1",
      quote:
        "We replaced three spreadsheets and a brittle script. Lumen is the first tool our CFO actually opens daily.",
      name: "Sarah Chen",
      role: "VP Finance, Vertex Labs",
      rating: 5,
      position: { top: "3%", left: "4%", rotate: "-1deg" } satisfies TestimonialPosition,
    },
    {
      id: "2",
      quote:
        "Clear categorization and exports that auditors can follow. That alone saved us a full week each quarter.",
      name: "Marcus Webb",
      role: "Controller, Harborline",
      rating: 5,
      position: { top: "24%", left: "68%", rotate: "-9.5deg" } satisfies TestimonialPosition,
    },
    {
      id: "3",
      quote:
        "Fast, calm interface. My team finally trusts the numbers because they can see how they were derived.",
      name: "Elena Rossi",
      role: "COO, Brightcap",
      rating: 5,
      position: { top: "22%", left: "8%", rotate: "9.5deg" } satisfies TestimonialPosition,
    },
    {
      id: "4",
      quote:
        "Rolling close is shorter because everyone works from the same ledger. No more reconciliation drift.",
      name: "James Okonkwo",
      role: "Head of FP&A, Meridian",
      rating: 5,
      position: { top: "2%", left: "72%", rotate: "-1deg" } satisfies TestimonialPosition,
    },
    {
      id: "5",
      quote:
        "The insight cards surface variance without noise. We catch issues before they hit the board deck.",
      name: "Priya Natarajan",
      role: "Finance Director, Catalyst",
      rating: 5,
      position: { top: "62%", left: "8%", rotate: "1deg" } satisfies TestimonialPosition,
    },
    {
      id: "6",
      quote:
        "Exports match how our auditors expect to see data. That credibility matters for our next round.",
      name: "Daniel Frost",
      role: "Founder, Keystone",
      rating: 5,
      position: { top: "58%", left: "52%", rotate: "-0.5deg" } satisfies TestimonialPosition,
    },
    {
      id: "7",
      quote:
        "Role-based access is tight. Admins can move money; viewers see exactly what they need.",
      name: "Amelia Ortiz",
      role: "Controller, Apex Ledger",
      rating: 5,
      position: { top: "78%", left: "22%", rotate: "0deg" } satisfies TestimonialPosition,
    },
    {
      id: "8",
      quote:
        "Onboarding was painless. We had real categories on day two instead of fighting spreadsheets for a month.",
      name: "Noah Patel",
      role: "Ops Lead, Northwind",
      rating: 5,
      position: { top: "8%", left: "38%", rotate: "-0.8deg" } satisfies TestimonialPosition,
    },
    {
      id: "9",
      quote:
        "The dashboard stays fast even with years of history. That reliability is non-negotiable for us.",
      name: "Riley Brooks",
      role: "Finance Manager, Brightcap",
      rating: 5,
      position: { top: "52%", left: "72%", rotate: "1.2deg" } satisfies TestimonialPosition,
    },
    {
      id: "10",
      quote:
        "We demo Lumen to investors now. It is the clearest picture of burn we have ever had in one place.",
      name: "Taylor Kim",
      role: "CEO, Harborline",
      rating: 5,
      position: { top: "38%", left: "38%", rotate: "-1.2deg" } satisfies TestimonialPosition,
    },
  ],
} as const;

export const faqSection = {
  eyebrow: "FAQ",
  title: "Answers before you commit",
  items: [
    {
      id: "q1",
      q: "Is my data stored securely?",
      a: "We follow modern application security practices. For production deployments you control keys, retention, and access policies.",
    },
    {
      id: "q2",
      q: "Can I import historical transactions?",
      a: "Yes. CSV import is supported out of the box with column mapping for common bank formats.",
    },
    {
      id: "q3",
      q: "Do you support multiple users?",
      a: "Role-based access lets admins manage viewers and operators without sharing credentials.",
    },
    {
      id: "q4",
      q: "What is included in Pro?",
      a: "Extended history, scheduled exports, and advanced controls for teams that operate continuously on the ledger.",
    },
    {
      id: "q5",
      q: "Can I cancel anytime?",
      a: "Yes. Subscriptions are billed monthly and can be canceled without penalty.",
    },
    {
      id: "q6",
      q: "Do you offer demos for teams?",
      a: "Enterprise plans include onboarding sessions and success check-ins tailored to your workflow.",
    },
  ],
} as const;

export const lampReadySection = {
  title: "Ready when you are",
  description:
    "Open the app on your terms — explore the demo environment with no credit card required.",
  cta: "Open Lumen",
} as const;
