"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp, TrendingDown } from "lucide-react"

const strategies = [
  {
    id: 1,
    name: "Alpha Scalper Pro",
    trader: "Marcus Chen",
    avatar: "/avatars/trader1.jpg",
    invested: 5000,
    currentValue: 6250,
    pnl: 1250,
    pnlPercent: 25.0,
    winRate: 72,
    trades: 145
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
    winRate: 68,
    trades: 42
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
    winRate: 45,
    trades: 28
  },
  {
    id: 4,
    name: "Trend Rider",
    trader: "Sarah Kim",
    avatar: "/avatars/trader4.jpg",
    invested: 4000,
    currentValue: 4680,
    pnl: 680,
    pnlPercent: 17.0,
    winRate: 65,
    trades: 67
  }
]

export function StrategyPerformance() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Strategy Performance</CardTitle>
        <CardDescription>
          Performance breakdown of your active copy trading strategies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className="p-4 rounded-lg border border-border bg-background/50 hover:bg-background transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Strategy Info */}
                <div className="flex items-center gap-3 min-w-[200px]">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={strategy.avatar} />
                    <AvatarFallback className="bg-accent/20 text-accent">
                      {strategy.trader.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{strategy.name}</p>
                    <p className="text-sm text-muted-foreground">{strategy.trader}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Invested</p>
                    <p className="font-medium text-foreground">
                      ${strategy.invested.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Current Value</p>
                    <p className="font-medium text-foreground">
                      ${strategy.currentValue.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                    <div className="flex items-center gap-2">
                      <Progress value={strategy.winRate} className="h-1.5 flex-1" />
                      <span className="text-sm font-medium text-foreground">
                        {strategy.winRate}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">P&L</p>
                    <div className="flex items-center gap-1">
                      {strategy.pnl >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`font-medium ${strategy.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {strategy.pnl >= 0 ? '+' : ''}${strategy.pnl.toLocaleString()}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          strategy.pnl >= 0 
                            ? 'border-green-500/30 text-green-500' 
                            : 'border-red-500/30 text-red-500'
                        }`}
                      >
                        {strategy.pnlPercent >= 0 ? '+' : ''}{strategy.pnlPercent}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
