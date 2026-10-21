import { LandingHeader } from "@/components/landing-header";
import { HeroSection } from "@/features/landing/components/hero-section";
import { FeaturesGrid } from "@/features/landing/components/features-grid";
import { CtaBanner } from "@/features/landing/components/cta-banner";
import { LandingFooter } from "@/features/landing/components/landing-footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface antialiased selection:bg-primary-container selection:text-on-primary">
      {/* Navigation Header */}
      <LandingHeader />

      <main className="w-full pt-16 flex-1">
        {/* Hero Section & Interactive Preview Mockup */}
        <HeroSection />

        {/* Core Philosophy & Features Grid */}
        <FeaturesGrid />

        {/* Call to Action Banner */}
        <CtaBanner />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
