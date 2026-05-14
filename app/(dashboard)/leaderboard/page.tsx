"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Trophy, 
  Medal, 
  Crown,
  TrendingUp,
  Users,
  Star,
  ArrowUp,
  ArrowDown,
  Filter
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const topTraders = [
  {
    rank: 1,
    name: "Alexander Knight",
    avatar: "AK",
    profit: 847.32,
    winRate: 94.2,
    copiers: 12847,
    totalProfit: 2847320,
    change: 2,
    badge: "Elite",
    verified: true,
  },
  {
    rank: 2,
    name: "Sarah Chen",
    avatar: "SC",
    profit: 723.18,
    winRate: 91.8,
    copiers: 9432,
    totalProfit: 1923180,
    change: -1,
    badge: "Pro",
    verified: true,
  },
  {
    rank: 3,
    name: "Marcus Williams",
    avatar: "MW",
    profit: 612.45,
    winRate: 89.5,
    copiers: 7821,
    totalProfit: 1512450,
    change: 1,
    badge: "Pro",
    verified: true,
  },
  {
    rank: 4,
    name: "Elena Rodriguez",
    avatar: "ER",
    profit: 567.89,
    winRate: 88.3,
    copiers: 6543,
    totalProfit: 1267890,
    change: 0,
    badge: "Expert",
    verified: true,
  },
  {
    rank: 5,
    name: "James Morrison",
    avatar: "JM",
    profit: 498.76,
    winRate: 87.1,
    copiers: 5432,
    totalProfit: 998760,
    change: 3,
    badge: "Expert",
    verified: false,
  },
  {
    rank: 6,
    name: "Lisa Park",
    avatar: "LP",
    profit: 456.23,
    winRate: 86.4,
    copiers: 4876,
    totalProfit: 856230,
    change: -2,
    badge: "Expert",
    verified: true,
  },
  {
    rank: 7,
    name: "David Kim",
    avatar: "DK",
    profit: 423.67,
    winRate: 85.2,
    copiers: 4231,
    totalProfit: 723670,
    change: 1,
    badge: "Advanced",
    verified: true,
  },
  {
    rank: 8,
    name: "Maria Santos",
    avatar: "MS",
    profit: 389.45,
    winRate: 84.7,
    copiers: 3987,
    totalProfit: 689450,
    change: 0,
    badge: "Advanced",
    verified: false,
  },
  {
    rank: 9,
    name: "Robert Taylor",
    avatar: "RT",
    profit: 356.12,
    winRate: 83.9,
    copiers: 3654,
    totalProfit: 556120,
    change: -1,
    badge: "Advanced",
    verified: true,
  },
  {
    rank: 10,
    name: "Anna White",
    avatar: "AW",
    profit: 312.89,
    winRate: 82.5,
    copiers: 3210,
    totalProfit: 412890,
    change: 2,
    badge: "Rising Star",
    verified: true,
  },
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-5 h-5 text-yellow-500" />
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />
    case 3:
      return <Medal className="w-5 h-5 text-amber-600" />
    default:
      return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
  }
}

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "Elite":
      return "bg-gradient-to-r from-yellow-500 to-amber-500 text-white"
    case "Pro":
      return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
    case "Expert":
      return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
    case "Advanced":
      return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
    default:
      return "bg-gradient-to-r from-orange-500 to-red-500 text-white"
  }
}

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("monthly")
  const [category, setCategory] = useState("profit")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground">Top performing traders on the platform</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32 bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Second Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="order-2 md:order-1"
        >
          <Card className="bg-card border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 to-gray-300" />
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-400/20 mb-4">
                <Medal className="w-6 h-6 text-gray-400" />
              </div>
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-xl font-bold text-white mb-3">
                {topTraders[1].avatar}
              </div>
              <h3 className="font-semibold text-foreground">{topTraders[1].name}</h3>
              <Badge className={`${getBadgeColor(topTraders[1].badge)} mt-2`}>{topTraders[1].badge}</Badge>
              <p className="text-2xl font-bold text-green-500 mt-3">+{topTraders[1].profit}%</p>
              <p className="text-sm text-muted-foreground">{topTraders[1].copiers.toLocaleString()} copiers</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* First Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="order-1 md:order-2"
        >
          <Card className="bg-card border-border relative overflow-hidden ring-2 ring-yellow-500/50">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-amber-500" />
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/20 mb-4">
                <Crown className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center text-2xl font-bold text-white mb-3 ring-4 ring-yellow-500/30">
                {topTraders[0].avatar}
              </div>
              <h3 className="font-semibold text-foreground text-lg">{topTraders[0].name}</h3>
              <Badge className={`${getBadgeColor(topTraders[0].badge)} mt-2`}>{topTraders[0].badge}</Badge>
              <p className="text-3xl font-bold text-green-500 mt-3">+{topTraders[0].profit}%</p>
              <p className="text-sm text-muted-foreground">{topTraders[0].copiers.toLocaleString()} copiers</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Third Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="order-3"
        >
          <Card className="bg-card border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 to-amber-500" />
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-600/20 mb-4">
                <Medal className="w-6 h-6 text-amber-600" />
              </div>
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-xl font-bold text-white mb-3">
                {topTraders[2].avatar}
              </div>
              <h3 className="font-semibold text-foreground">{topTraders[2].name}</h3>
              <Badge className={`${getBadgeColor(topTraders[2].badge)} mt-2`}>{topTraders[2].badge}</Badge>
              <p className="text-2xl font-bold text-green-500 mt-3">+{topTraders[2].profit}%</p>
              <p className="text-sm text-muted-foreground">{topTraders[2].copiers.toLocaleString()} copiers</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="profit" className="w-full">
        <TabsList className="bg-secondary">
          <TabsTrigger value="profit">By Profit</TabsTrigger>
          <TabsTrigger value="winrate">By Win Rate</TabsTrigger>
          <TabsTrigger value="copiers">By Copiers</TabsTrigger>
        </TabsList>

        <TabsContent value="profit" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Top Traders by Profit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topTraders.map((trader, index) => (
                  <motion.div
                    key={trader.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 flex justify-center">
                        {getRankIcon(trader.rank)}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                        {trader.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{trader.name}</p>
                          {trader.verified && (
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getBadgeColor(trader.badge)} text-xs`}>{trader.badge}</Badge>
                          <span className="text-xs text-muted-foreground">{trader.winRate}% win rate</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Copiers</p>
                        <p className="font-medium text-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {trader.copiers.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Profit</p>
                        <p className="font-bold text-green-500">+{trader.profit}%</p>
                      </div>
                      <div className="w-16 text-right">
                        {trader.change > 0 ? (
                          <span className="text-green-500 flex items-center justify-end gap-1">
                            <ArrowUp className="w-4 h-4" />
                            {trader.change}
                          </span>
                        ) : trader.change < 0 ? (
                          <span className="text-red-500 flex items-center justify-end gap-1">
                            <ArrowDown className="w-4 h-4" />
                            {Math.abs(trader.change)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="winrate" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Top Traders by Win Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[...topTraders].sort((a, b) => b.winRate - a.winRate).map((trader, index) => (
                  <motion.div
                    key={trader.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 text-center text-sm font-bold text-muted-foreground">
                        #{index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                        {trader.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{trader.name}</p>
                        <Badge className={`${getBadgeColor(trader.badge)} text-xs`}>{trader.badge}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-bold text-primary">{trader.winRate}%</p>
                        <p className="text-xs text-muted-foreground">Win Rate</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="copiers" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Top Traders by Copiers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[...topTraders].sort((a, b) => b.copiers - a.copiers).map((trader, index) => (
                  <motion.div
                    key={trader.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 text-center text-sm font-bold text-muted-foreground">
                        #{index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                        {trader.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{trader.name}</p>
                        <Badge className={`${getBadgeColor(trader.badge)} text-xs`}>{trader.badge}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-bold text-foreground">{trader.copiers.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Copiers</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
