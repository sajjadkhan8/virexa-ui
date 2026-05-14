"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"

const performanceData = [
  { date: "Jan 1", profit: 1200, loss: -400, balance: 10000 },
  { date: "Jan 5", profit: 1800, loss: -200, balance: 11600 },
  { date: "Jan 10", profit: 900, loss: -600, balance: 11900 },
  { date: "Jan 15", profit: 2200, loss: -300, balance: 13800 },
  { date: "Jan 20", profit: 1500, loss: -800, balance: 14500 },
  { date: "Jan 25", profit: 2800, loss: -400, balance: 16900 },
  { date: "Feb 1", profit: 1100, loss: -500, balance: 17500 },
  { date: "Feb 5", profit: 1900, loss: -300, balance: 19100 },
  { date: "Feb 10", profit: 2400, loss: -700, balance: 20800 },
  { date: "Feb 15", profit: 1700, loss: -400, balance: 22100 },
  { date: "Feb 20", profit: 3100, loss: -600, balance: 24600 },
]

interface PerformanceChartProps {
  timeframe: string
}

export function PerformanceChart({ timeframe }: PerformanceChartProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
        <CardDescription>
          Track your overall trading performance over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="balance" className="space-y-4">
          <TabsList className="bg-background border border-border">
            <TabsTrigger value="balance">Balance</TabsTrigger>
            <TabsTrigger value="pnl">P&L</TabsTrigger>
          </TabsList>

          <TabsContent value="balance" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))"
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Balance"]}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  fill="url(#balanceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="pnl" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))"
                  }}
                />
                <Bar dataKey="profit" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="loss" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
