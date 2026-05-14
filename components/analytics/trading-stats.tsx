"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3,
  Target,
  Percent
} from "lucide-react"

const stats = [
  {
    label: "Total P&L",
    value: "+$14,892.50",
    change: "+23.5%",
    isPositive: true,
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    label: "Win Rate",
    value: "68.4%",
    change: "+2.1%",
    isPositive: true,
    icon: Target,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    label: "Total Trades",
    value: "342",
    change: "+45 this month",
    isPositive: true,
    icon: BarChart3,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    label: "Avg. Return",
    value: "4.8%",
    change: "per trade",
    isPositive: true,
    icon: Percent,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    label: "Best Trade",
    value: "+$2,450",
    change: "EUR/USD",
    isPositive: true,
    icon: TrendingUp,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    label: "Worst Trade",
    value: "-$890",
    change: "GBP/JPY",
    isPositive: false,
    icon: TrendingDown,
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  }
]

export function TradingStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-md ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-lg font-bold ${stat.isPositive ? 'text-foreground' : 'text-red-500'}`}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
