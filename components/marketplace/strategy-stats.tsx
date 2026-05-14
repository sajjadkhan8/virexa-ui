'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Target, Clock, BarChart3, Shield } from 'lucide-react'

interface Strategy {
  roi: number
  monthlyReturn: number
  drawdown: number
  winRate: number
  totalTrades: number
  avgTradeTime: string
  profitFactor: number
  sharpeRatio: number
}

const monthlyROI = [
  { month: 'Jan', roi: 8.2 },
  { month: 'Feb', roi: 5.4 },
  { month: 'Mar', roi: -2.1 },
  { month: 'Apr', roi: 12.3 },
  { month: 'May', roi: 6.8 },
  { month: 'Jun', roi: 9.1 },
  { month: 'Jul', roi: -1.5 },
  { month: 'Aug', roi: 7.4 },
  { month: 'Sep', roi: 4.2 },
  { month: 'Oct', roi: 11.6 },
  { month: 'Nov', roi: 3.8 },
  { month: 'Dec', roi: 8.9 },
]

export function StrategyStats({ strategy }: { strategy: Strategy }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6 space-y-6"
    >
      <h3 className="text-lg font-semibold text-foreground">Detailed Statistics</h3>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-secondary/50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Total Return</span>
          </div>
          <p className="text-2xl font-bold text-primary">+{strategy.roi}%</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <span className="text-sm text-muted-foreground">Max Drawdown</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{strategy.drawdown}%</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/50">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Win Rate</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{strategy.winRate}%</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/50">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Trades</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{strategy.totalTrades.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/50">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Avg Duration</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{strategy.avgTradeTime}</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/50">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{strategy.sharpeRatio}</p>
        </div>
      </div>

      {/* Monthly ROI Table */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-4">Monthly Returns (Last 12 Months)</h4>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
          {monthlyROI.map((month) => (
            <div
              key={month.month}
              className={`p-2 rounded-lg text-center ${
                month.roi >= 0 ? 'bg-primary/10' : 'bg-destructive/10'
              }`}
            >
              <p className="text-xs text-muted-foreground mb-1">{month.month}</p>
              <p className={`text-sm font-bold ${month.roi >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {month.roi > 0 ? '+' : ''}{month.roi}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4">Risk Metrics</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Profit Factor</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${Math.min(strategy.profitFactor * 30, 100)}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground w-12 text-right">{strategy.profitFactor}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Risk/Reward Ratio</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: '65%' }} />
              </div>
              <span className="text-sm font-medium text-foreground w-12 text-right">1:2.5</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Recovery Factor</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gold rounded-full" style={{ width: '75%' }} />
              </div>
              <span className="text-sm font-medium text-foreground w-12 text-right">3.2</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
