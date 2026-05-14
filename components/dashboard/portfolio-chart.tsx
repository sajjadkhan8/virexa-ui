'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL']

const generateData = (days: number) => {
  const data = []
  let value = 10000
  const now = new Date()
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    value = value + (Math.random() - 0.4) * 200
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(value),
      equity: Math.round(value * 0.8),
    })
  }
  return data
}

const dataByTimeframe: Record<string, ReturnType<typeof generateData>> = {
  '1D': generateData(1),
  '1W': generateData(7),
  '1M': generateData(30),
  '3M': generateData(90),
  '1Y': generateData(365),
  'ALL': generateData(730),
}

export function PortfolioChart() {
  const [activeTimeframe, setActiveTimeframe] = useState('1M')
  const data = dataByTimeframe[activeTimeframe]
  
  const startValue = data[0]?.value || 0
  const endValue = data[data.length - 1]?.value || 0
  const change = endValue - startValue
  const changePercent = ((change / startValue) * 100).toFixed(2)
  const isPositive = change >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Portfolio Growth</h3>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-2xl font-bold text-foreground">${endValue.toLocaleString()}</span>
            <span className={cn(
              'text-sm font-medium px-2 py-0.5 rounded-full',
              isPositive ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
            )}>
              {isPositive ? '+' : ''}{changePercent}%
            </span>
          </div>
        </div>
        
        {/* Timeframe Selector */}
        <div className="flex items-center gap-1 p-1 bg-secondary rounded-lg">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              variant="ghost"
              size="sm"
              onClick={() => setActiveTimeframe(tf)}
              className={cn(
                'h-8 px-3 text-xs font-medium',
                activeTimeframe === tf
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.7 0.18 160)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.7 0.18 160)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.01 240)" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'oklch(0.6 0 0)' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'oklch(0.6 0 0)' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'oklch(0.12 0.01 240)',
                border: '1px solid oklch(0.22 0.01 240)',
                borderRadius: '12px',
                color: 'oklch(0.98 0 0)',
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="oklch(0.7 0.18 160)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#portfolioGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
