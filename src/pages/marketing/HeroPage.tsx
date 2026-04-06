import { Helmet } from 'react-helmet-async';
import {
  MarketingDashboardPreviewSection,
  MarketingFaqSection,
  MarketingFeaturesSection,
  MarketingHeroSection,
  MarketingHowItWorksSection,
  MarketingLampReadySection,
  MarketingPricingSection,
  MarketingTestimonialsSection,
  MarketingTrustedBySection,
} from '@/components/marketing/sections';

export default function HeroPage() {
  return (
    <>
      <Helmet>
        <title>Lumen — Finance clarity, beautifully simple</title>
        <meta
          name="description"
          content="Track expenses, balances, and insights. Lumen is your calm finance workspace."
        />
        <link rel="preload" as="image" href="/sectionone_bg.png" />
        <link rel="preload" as="image" href="/zorvyn-hero-preview.svg" type="image/svg+xml" />
      </Helmet>

      <div className="overflow-x-hidden">
        <MarketingHeroSection />
        <MarketingDashboardPreviewSection />
        <MarketingTrustedBySection />
        <MarketingFeaturesSection />
        <MarketingHowItWorksSection />
        <MarketingPricingSection />
        <MarketingTestimonialsSection />
        <MarketingFaqSection />
        <MarketingLampReadySection />
      </div>
    </>
  );
}
