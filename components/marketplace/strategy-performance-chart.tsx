'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Bar, BarChart } from 'recharts'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const timeframes = ['1M', '3M', '6M', '1Y', 'ALL']
const chartTypes = ['equity', 'drawdown', 'monthly']

const generateEquityData = (months: number) => {
  const data = []
  let value = 10000
  const now = new Date()
  
  for (let i = months; i >= 0; i--) {
    const date = new Date(now)
    date.setMonth(date.getMonth() - i)
    value = value * (1 + (Math.random() * 0.08 - 0.02))
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      value: Math.round(value),
      drawdown: -(Math.random() * 10).toFixed(1),
    })
  }
  return data
}

const monthlyReturns = [
  { month: 'Jan', return: 8.2 },
  { month: 'Feb', return: 5.4 },
  { month: 'Mar', return: -2.1 },
  { month: 'Apr', return: 12.3 },
  { month: 'May', return: 6.8 },
  { month: 'Jun', return: 9.1 },
  { month: 'Jul', return: -1.5 },
  { month: 'Aug', return: 7.4 },
  { month: 'Sep', return: 4.2 },
  { month: 'Oct', return: 11.6 },
  { month: 'Nov', return: 3.8 },
  { month: 'Dec', return: 8.9 },
]

export function StrategyPerformanceChart() {
  const [activeTimeframe, setActiveTimeframe] = useState('1Y')
  const [activeChart, setActiveChart] = useState<'equity' | 'drawdown' | 'monthly'>('equity')
  
  const monthsMap: Record<string, number> = { '1M': 1, '3M': 3, '6M': 6, '1Y': 12, 'ALL': 24 }
  const data = generateEquityData(monthsMap[activeTimeframe])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Performance Analysis</h3>
          <p className="text-sm text-muted-foreground">Track strategy performance over time</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Chart Type */}
          <div className="flex items-center gap-1 p-1 bg-secondary rounded-lg">
            {(['equity', 'drawdown', 'monthly'] as const).map((type) => (
              <Button
                key={type}
                variant="ghost"
                size="sm"
                onClick={() => setActiveChart(type)}
                className={cn(
                  'h-8 px-3 text-xs font-medium capitalize',
                  activeChart === type
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {type === 'equity' ? 'Equity Curve' : type === 'drawdown' ? 'Drawdown' : 'Monthly Returns'}
              </Button>
            ))}
          </div>

          {/* Timeframe */}
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
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {activeChart === 'monthly' ? (
            <BarChart data={monthlyReturns} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.01 240)" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'oklch(0.6 0 0)' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'oklch(0.6 0 0)' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(0.12 0.01 240)',
                  border: '1px solid oklch(0.22 0.01 240)',
                  borderRadius: '12px',
                  color: 'oklch(0.98 0 0)',
                }}
                formatter={(value: number) => [`${value}%`, 'Return']}
              />
              <Bar 
                dataKey="return" 
                fill="oklch(0.7 0.18 160)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeChart === 'drawdown' ? 'oklch(0.55 0.22 25)' : 'oklch(0.7 0.18 160)'} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={activeChart === 'drawdown' ? 'oklch(0.55 0.22 25)' : 'oklch(0.7 0.18 160)'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.01 240)" vertical={false} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'oklch(0.6 0 0)' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'oklch(0.6 0 0)' }}
                tickFormatter={(value) => activeChart === 'drawdown' ? `${value}%` : `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(0.12 0.01 240)',
                  border: '1px solid oklch(0.22 0.01 240)',
                  borderRadius: '12px',
                  color: 'oklch(0.98 0 0)',
                }}
                formatter={(value: number) => [
                  activeChart === 'drawdown' ? `${value}%` : `$${value.toLocaleString()}`,
                  activeChart === 'drawdown' ? 'Drawdown' : 'Equity'
                ]}
              />
              <Area
                type="monotone"
                dataKey={activeChart === 'drawdown' ? 'drawdown' : 'value'}
                stroke={activeChart === 'drawdown' ? 'oklch(0.55 0.22 25)' : 'oklch(0.7 0.18 160)'}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#equityGradient)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
