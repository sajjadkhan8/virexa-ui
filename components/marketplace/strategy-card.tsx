'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Users, TrendingUp, Trophy, Shield, Zap } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'

interface Strategy {
  id: number
  name: string
  trader: string
  avatar: string
  roi: number
  drawdown: number
  followers: number
  risk: 'Low' | 'Medium' | 'High'
  badge: 'top-performer' | 'low-risk' | 'trending' | null
  assets: string[]
  minInvestment: number
  winRate: number
}

const riskColors = {
  Low: { text: 'text-primary', bg: 'bg-primary/10' },
  Medium: { text: 'text-gold', bg: 'bg-gold/10' },
  High: { text: 'text-destructive', bg: 'bg-destructive/10' },
}

const badgeConfig = {
  'top-performer': { icon: Trophy, label: 'Top Performer', color: 'text-gold bg-gold/10' },
  'low-risk': { icon: Shield, label: 'Low Risk', color: 'text-primary bg-primary/10' },
  'trending': { icon: Zap, label: 'Trending', color: 'text-accent bg-accent/10' },
}

const generateChartData = () => {
  const data = []
  let value = 50
  for (let i = 0; i < 20; i++) {
    value = Math.max(20, Math.min(100, value + (Math.random() - 0.4) * 15))
    data.push({ value })
  }
  return data
}

export function StrategyCard({ strategy }: { strategy: Strategy }) {
  const chartData = generateChartData()
  const BadgeIcon = strategy.badge ? badgeConfig[strategy.badge].icon : null

  return (
    <div className="bg-card border border-border rounded-2xl p-6 card-hover">
      {/* Badge */}
      {strategy.badge && BadgeIcon && (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badgeConfig[strategy.badge].color} mb-4`}>
          <BadgeIcon className="w-3 h-3" />
          {badgeConfig[strategy.badge].label}
        </div>
      )}

      {/* Trader Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
          {strategy.avatar}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{strategy.name}</h3>
          <p className="text-sm text-muted-foreground">{strategy.trader}</p>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="h-16 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-card-${strategy.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.7 0.18 160)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.7 0.18 160)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="oklch(0.7 0.18 160)"
              strokeWidth={2}
              fill={`url(#gradient-card-${strategy.id})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Monthly ROI</p>
          <p className="text-lg font-bold text-primary">+{strategy.roi}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Drawdown</p>
          <p className="text-lg font-bold text-foreground">{strategy.drawdown}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Win Rate</p>
          <p className="text-lg font-bold text-foreground">{strategy.winRate}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${riskColors[strategy.risk].bg} ${riskColors[strategy.risk].text}`}>
            {strategy.risk}
          </span>
        </div>
      </div>

      {/* Assets */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {strategy.assets.map((asset) => (
          <span key={asset} className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
            {asset}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-sm">{strategy.followers.toLocaleString()}</span>
        </div>
        <p className="text-xs text-muted-foreground">Min: ${strategy.minInvestment}</p>
      </div>

      {/* CTA */}
      <Link href={`/marketplace/${strategy.id}`} className="block mt-4">
        <Button className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20">
          <TrendingUp className="w-4 h-4 mr-2" />
          View Strategy
        </Button>
      </Link>
    </div>
  )
}
