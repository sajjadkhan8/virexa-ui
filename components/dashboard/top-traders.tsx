'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Trophy } from 'lucide-react'

const traders = [
  {
    id: 1,
    name: 'Alex Morgan',
    avatar: 'AM',
    roi: 52.3,
    followers: 4520,
    rank: 1,
  },
  {
    id: 2,
    name: 'Emma Wilson',
    avatar: 'EW',
    roi: 48.7,
    followers: 3890,
    rank: 2,
  },
  {
    id: 3,
    name: 'James Lee',
    avatar: 'JL',
    roi: 45.2,
    followers: 3210,
    rank: 3,
  },
  {
    id: 4,
    name: 'Sophie Chen',
    avatar: 'SC',
    roi: 42.8,
    followers: 2890,
    rank: 4,
  },
]

export function TopTraders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-gold" />
          <h3 className="text-lg font-semibold text-foreground">Top Traders</h3>
        </div>
        <Link href="/leaderboard">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1">
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {traders.map((trader) => (
          <Link
            key={trader.id}
            href={`/traders/${trader.id}`}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary text-sm font-bold text-muted-foreground">
              #{trader.rank}
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
              {trader.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{trader.name}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="w-3 h-3" />
                <span>{trader.followers.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-primary">+{trader.roi}%</p>
              <p className="text-xs text-muted-foreground">Monthly ROI</p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
