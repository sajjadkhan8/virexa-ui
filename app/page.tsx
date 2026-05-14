'use client'

import { HeroSection } from '@/components/landing/hero-section'
import { StatsBar } from '@/components/landing/stats-bar'
import { TopStrategies } from '@/components/landing/top-strategies'
import { HowItWorks } from '@/components/landing/how-it-works'
import { ReferralProgram } from '@/components/landing/referral-program'
import { TrustSecurity } from '@/components/landing/trust-security'
import { Testimonials } from '@/components/landing/testimonials'
import { Footer } from '@/components/landing/footer'
import { LandingNavbar } from '@/components/landing/landing-navbar'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        <HeroSection />
        <StatsBar />
        <TopStrategies />
        <HowItWorks />
        <ReferralProgram />
        <TrustSecurity />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
