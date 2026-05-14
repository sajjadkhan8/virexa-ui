'use client'

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  { date: 'Jan', value: 4000 },
  { date: 'Feb', value: 3000 },
  { date: 'Mar', value: 5000 },
  { date: 'Apr', value: 4500 },
  { date: 'May', value: 6000 },
  { date: 'Jun', value: 5500 },
  { date: 'Jul', value: 7000 },
  { date: 'Aug', value: 8500 },
  { date: 'Sep', value: 8000 },
  { date: 'Oct', value: 9500 },
  { date: 'Nov', value: 11000 },
  { date: 'Dec', value: 12453 },
]

export function TradingChart() {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(0.7 0.18 160)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="oklch(0.7 0.18 160)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: 'oklch(0.6 0 0)' }}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              backgroundColor: 'oklch(0.12 0.01 240)',
              border: '1px solid oklch(0.22 0.01 240)',
              borderRadius: '8px',
              color: 'oklch(0.98 0 0)',
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="oklch(0.7 0.18 160)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
