'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, MoreHorizontal, ArrowRight } from 'lucide-react'

const strategies = [
  {
    id: 1,
    name: 'Alpha Momentum',
    trader: 'Michael Chen',
    avatar: 'MC',
    allocated: 2500,
    pnl: 456.80,
    pnlPercent: 18.27,
    isPositive: true,
  },
  {
    id: 2,
    name: 'Safe Haven',
    trader: 'Sarah Williams',
    avatar: 'SW',
    allocated: 1500,
    pnl: 189.50,
    pnlPercent: 12.63,
    isPositive: true,
  },
  {
    id: 3,
    name: 'Scalp Master',
    trader: 'David Park',
    avatar: 'DP',
    allocated: 3000,
    pnl: -124.30,
    pnlPercent: -4.14,
    isPositive: false,
  },
]

export function ActiveStrategies() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Active Strategies</h3>
        <Link href="/marketplace">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1">
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {strategies.map((strategy) => (
          <div
            key={strategy.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
              {strategy.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{strategy.name}</p>
              <p className="text-sm text-muted-foreground">{strategy.trader}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                {strategy.isPositive ? (
                  <TrendingUp className="w-4 h-4 text-primary" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
                <span className={strategy.isPositive ? 'text-primary font-medium' : 'text-destructive font-medium'}>
                  {strategy.isPositive ? '+' : ''}{strategy.pnlPercent.toFixed(2)}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                ${strategy.allocated.toLocaleString()} allocated
              </p>
            </div>
            <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-background">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {strategies.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No active strategies yet</p>
          <Link href="/marketplace">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Browse Strategies
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  )
}
