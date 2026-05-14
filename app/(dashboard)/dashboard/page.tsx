'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const BalanceCards = dynamic(() => import('@/components/dashboard/balance-cards').then((m) => m.BalanceCards), {
  loading: () => <Skeleton className="h-36 w-full rounded-2xl" />,
})
const PortfolioChart = dynamic(() => import('@/components/dashboard/portfolio-chart').then((m) => m.PortfolioChart), {
  loading: () => <Skeleton className="h-80 w-full rounded-2xl" />,
})
const ActiveStrategies = dynamic(() => import('@/components/dashboard/active-strategies').then((m) => m.ActiveStrategies), {
  loading: () => <Skeleton className="h-72 w-full rounded-2xl" />,
})
const RecentTrades = dynamic(() => import('@/components/dashboard/recent-trades').then((m) => m.RecentTrades), {
  loading: () => <Skeleton className="h-96 w-full rounded-2xl" />,
})
const TopTraders = dynamic(() => import('@/components/dashboard/top-traders').then((m) => m.TopTraders), {
  loading: () => <Skeleton className="h-72 w-full rounded-2xl" />,
})
const QuickActions = dynamic(() => import('@/components/dashboard/quick-actions').then((m) => m.QuickActions), {
  loading: () => <Skeleton className="h-80 w-full rounded-2xl" />,
})

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
