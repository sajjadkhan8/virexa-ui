"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, DollarSign, TrendingUp, UserPlus } from "lucide-react"

const stats = [
  {
    label: "Total Referrals",
    value: "47",
    change: "+12 this month",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    label: "Active Traders",
    value: "32",
    change: "68% conversion",
    icon: UserPlus,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    label: "Total Earnings",
    value: "$4,892.50",
    change: "+$847.20 this month",
    icon: DollarSign,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    label: "Pending Payout",
    value: "$1,245.80",
    change: "Next payout in 3 days",
    icon: TrendingUp,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  }
]

export function ReferralStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
