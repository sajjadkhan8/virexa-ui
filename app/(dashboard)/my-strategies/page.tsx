"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  TrendingDown, 
  Settings, 
  Pause,
  Play,
  Trash2,
  MoreHorizontal,
  Eye
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const activeStrategies = [
  {
    id: 1,
    name: "Alpha Scalper Pro",
    trader: "Marcus Chen",
    avatar: "/avatars/trader1.jpg",
    invested: 5000,
    currentValue: 6250,
    pnl: 1250,
    pnlPercent: 25.0,
    copyAmount: 500,
    status: "Active",
    winRate: 72,
    totalTrades: 145,
    startDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Swing Master",
    trader: "Elena Rodriguez",
    avatar: "/avatars/trader2.jpg",
    invested: 3000,
    currentValue: 3540,
    pnl: 540,
    pnlPercent: 18.0,
    copyAmount: 300,
    status: "Active",
    winRate: 68,
    totalTrades: 42,
    startDate: "2024-01-20"
  },
  {
    id: 3,
    name: "Gold Rush Strategy",
    trader: "James Wilson",
    avatar: "/avatars/trader3.jpg",
    invested: 2500,
    currentValue: 2250,
    pnl: -250,
    pnlPercent: -10.0,
    copyAmount: 250,
    status: "Paused",
    winRate: 45,
    totalTrades: 28,
    startDate: "2024-02-01"
  }
]

export default function MyStrategiesPage() {
  const totalInvested = activeStrategies.reduce((sum, s) => sum + s.invested, 0)
  const totalCurrentValue = activeStrategies.reduce((sum, s) => sum + s.currentValue, 0)
  const totalPnl = totalCurrentValue - totalInvested

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Strategies</h1>
          <p className="text-muted-foreground">Manage your active copy trading strategies</p>
        </div>
        <Link href="/marketplace">
          <Button className="bg-accent hover:bg-accent/90">
            Browse Marketplace
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Invested</p>
            <p className="text-2xl font-bold text-foreground">${totalInvested.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Current Value</p>
            <p className="text-2xl font-bold text-foreground">${totalCurrentValue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total P&L</p>
            <p className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalPnl >= 0 ? '+' : ''}${totalPnl.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Strategies List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Active Strategies</CardTitle>
          <CardDescription>
            You are currently copying {activeStrategies.length} strategies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeStrategies.map((strategy, index) => (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg border border-border bg-background/50"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Strategy Info */}
                <div className="flex items-center gap-4 min-w-[250px]">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={strategy.avatar} />
                    <AvatarFallback className="bg-accent/20 text-accent">
                      {strategy.trader.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{strategy.name}</p>
                      <Badge 
                        variant="outline"
                        className={
                          strategy.status === "Active"
                            ? "border-green-500/30 bg-green-500/10 text-green-500"
                            : "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                        }
                      >
                        {strategy.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">by {strategy.trader}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Invested</p>
                    <p className="font-semibold text-foreground">
                      ${strategy.invested.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Current Value</p>
                    <p className="font-semibold text-foreground">
                      ${strategy.currentValue.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">P&L</p>
                    <div className="flex items-center gap-1">
                      {strategy.pnl >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`font-semibold ${strategy.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {strategy.pnl >= 0 ? '+' : ''}${strategy.pnl.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                    <div className="flex items-center gap-2">
                      <Progress value={strategy.winRate} className="h-1.5 flex-1" />
                      <span className="text-sm font-medium text-foreground">{strategy.winRate}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Trades</p>
                    <p className="font-semibold text-foreground">{strategy.totalTrades}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link href={`/marketplace/${strategy.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Edit Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {strategy.status === "Active" ? (
                          <>
                            <Pause className="mr-2 h-4 w-4" />
                            Pause Copying
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Resume Copying
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Stop & Close
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
