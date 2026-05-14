'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BalanceCards } from '@/components/dashboard/balance-cards'
import { PortfolioChart } from '@/components/dashboard/portfolio-chart'
import { ActiveStrategies } from '@/components/dashboard/active-strategies'
import { RecentTrades } from '@/components/dashboard/recent-trades'
import { TopTraders } from '@/components/dashboard/top-traders'
import { QuickActions } from '@/components/dashboard/quick-actions'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here&apos;s your trading overview.</p>
        </div>
        <Link href="/onboarding">
          <Button variant="outline">Complete Onboarding</Button>
        </Link>
      </motion.div>

      {/* Balance Cards */}
      <BalanceCards />

      {/* Charts & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioChart />
        </div>
        <QuickActions />
      </div>

      {/* Active Strategies & Top Traders */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ActiveStrategies />
        <TopTraders />
      </div>

      {/* Recent Trades */}
      <RecentTrades />
    </div>
  )
}
