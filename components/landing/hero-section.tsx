'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, TrendingUp, Users, Shield } from 'lucide-react'
import Link from 'next/link'
import { TradingChart } from './trading-chart'
import { TraderCard } from './trader-card'

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-20 lg:pt-32 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Brand Wordmark (auto-switches by system color scheme) */}
            <picture className="mx-auto mb-6 block w-fit lg:mx-0">
              <source media="(prefers-color-scheme: light)" srcSet="/Virexa_Light_Background.png" />
              <img
                src="/Virexa_Dark_Background.png"
                alt="Virexa"
                className="h-auto w-[220px] rounded-lg border border-border/60"
              />
            </picture>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm font-medium text-primary">Live Trading Platform</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 text-balance">
              Copy Professional{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Forex Strategies
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 text-pretty">
              Trade smarter with automated copy trading, transparent analytics, and team rewards. 
              Join thousands of traders growing their portfolios.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-12 px-8">
                  Start Trading
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#strategies">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 h-12 px-8 border-border hover:bg-secondary">
                  <Play className="w-4 h-4" />
                  Explore Strategies
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">$2.4B+</p>
                  <p className="text-xs text-muted-foreground">Trading Volume</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">50K+</p>
                  <p className="text-xs text-muted-foreground">Active Traders</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10">
                  <Shield className="w-5 h-5 text-gold" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">100%</p>
                  <p className="text-xs text-muted-foreground">Secure</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Main Chart Card */}
            <div className="relative rounded-2xl bg-card border border-border p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Portfolio Value</p>
                  <p className="text-2xl font-bold text-foreground">$124,532.00</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">+24.5%</span>
                </div>
              </div>
              <TradingChart />
            </div>

            {/* Floating Trader Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -left-8 top-1/2 -translate-y-1/2 hidden lg:block"
            >
              <TraderCard
                name="Alex Morgan"
                avatar="AM"
                roi={45.8}
                followers={2340}
                risk="Medium"
              />
            </motion.div>

            {/* ROI Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-4 -bottom-4 bg-card border border-border rounded-xl p-4 shadow-xl"
            >
              <p className="text-xs text-muted-foreground mb-1">Monthly ROI</p>
              <p className="text-xl font-bold text-primary">+18.4%</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-8 h-1 rounded-full bg-primary" />
                <div className="w-6 h-1 rounded-full bg-primary/60" />
                <div className="w-4 h-1 rounded-full bg-primary/30" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
