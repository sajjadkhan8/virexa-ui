"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3,
  PieChart,
  Activity,
  Calendar
} from "lucide-react"
import { PerformanceChart } from "@/components/analytics/performance-chart"
import { TradingStats } from "@/components/analytics/trading-stats"
import { ProfitBreakdown } from "@/components/analytics/profit-breakdown"
import { StrategyPerformance } from "@/components/analytics/strategy-performance"

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("30d")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track your trading performance and insights</p>
        </div>
        <div className="flex items-center gap-2">
          {["7d", "30d", "90d", "1y", "All"].map((period) => (
            <Button
              key={period}
              variant={timeframe === period ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(period)}
              className={timeframe === period ? "bg-accent hover:bg-accent/90" : ""}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      <TradingStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart timeframe={timeframe} />
        </div>
        <div>
          <ProfitBreakdown />
        </div>
      </div>

      <StrategyPerformance />
    </div>
  )
}
