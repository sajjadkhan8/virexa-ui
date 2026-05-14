'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TrendingUp, Users, ArrowRight, Trophy, Shield, Zap } from 'lucide-react'
import Link from 'next/link'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'

const strategies = [
  {
    id: 1,
    name: 'Alpha Momentum',
    trader: 'Michael Chen',
    avatar: 'MC',
    roi: 45.8,
    drawdown: 8.2,
    followers: 3420,
    risk: 'Medium' as const,
    badge: 'top-performer',
    chartData: [
      { value: 30 }, { value: 45 }, { value: 35 }, { value: 55 }, { value: 48 },
      { value: 65 }, { value: 58 }, { value: 72 }, { value: 68 }, { value: 85 }
    ],
    minInvestment: 500,
  },
  {
    id: 2,
    name: 'Safe Haven',
    trader: 'Sarah Williams',
    avatar: 'SW',
    roi: 22.4,
    drawdown: 3.1,
    followers: 5120,
    risk: 'Low' as const,
    badge: 'low-risk',
    chartData: [
      { value: 40 }, { value: 42 }, { value: 45 }, { value: 48 }, { value: 50 },
      { value: 52 }, { value: 55 }, { value: 58 }, { value: 60 }, { value: 65 }
    ],
    minInvestment: 250,
  },
  {
    id: 3,
    name: 'Scalp Master',
    trader: 'David Park',
    avatar: 'DP',
    roi: 68.3,
    drawdown: 15.4,
    followers: 1890,
    risk: 'High' as const,
    badge: 'trending',
    chartData: [
      { value: 20 }, { value: 35 }, { value: 25 }, { value: 55 }, { value: 40 },
      { value: 70 }, { value: 50 }, { value: 85 }, { value: 75 }, { value: 95 }
    ],
    minInvestment: 1000,
  },
]

const riskColors = {
  Low: { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  Medium: { text: 'text-gold', bg: 'bg-gold/10', border: 'border-gold/20' },
  High: { text: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/20' },
}

const badgeConfig = {
  'top-performer': { icon: Trophy, label: 'Top Performer', color: 'text-gold bg-gold/10' },
  'low-risk': { icon: Shield, label: 'Low Risk', color: 'text-primary bg-primary/10' },
  'trending': { icon: Zap, label: 'Trending', color: 'text-accent bg-accent/10' },
}

export function TopStrategies() {
  return (
    <section id="strategies" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Top Performing Strategies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our curated selection of professional trading strategies with proven track records
          </p>
        </motion.div>

        {/* Strategy Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {strategies.map((strategy, index) => {
            const BadgeIcon = badgeConfig[strategy.badge].icon
            return (
              <motion.div
                key={strategy.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-card border border-border rounded-2xl p-6 card-hover"
              >
                {/* Badge */}
                <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badgeConfig[strategy.badge].color}`}>
                  <BadgeIcon className="w-3 h-3" />
                  {badgeConfig[strategy.badge].label}
                </div>

                {/* Trader Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {strategy.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{strategy.name}</h3>
                    <p className="text-sm text-muted-foreground">{strategy.trader}</p>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="h-20 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={strategy.chartData}>
                      <defs>
                        <linearGradient id={`gradient-${strategy.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(0.7 0.18 160)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="oklch(0.7 0.18 160)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="oklch(0.7 0.18 160)"
                        strokeWidth={2}
                        fill={`url(#gradient-${strategy.id})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Monthly ROI</p>
                    <p className="text-lg font-bold text-primary">+{strategy.roi}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Drawdown</p>
                    <p className="text-lg font-bold text-foreground">{strategy.drawdown}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${riskColors[strategy.risk].bg} ${riskColors[strategy.risk].text}`}>
                      {strategy.risk}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{strategy.followers.toLocaleString()} followers</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Min: ${strategy.minInvestment}</p>
                </div>

                {/* CTA */}
                <Link href={`/strategies/${strategy.id}`} className="block mt-4">
                  <Button className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Copy Strategy
                  </Button>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/marketplace">
            <Button variant="outline" size="lg" className="gap-2">
              View All Strategies
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
