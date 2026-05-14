"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, TrendingUp, TrendingDown, Download } from "lucide-react"

type Trade = {
  id: string
  pair: string
  type: "Buy" | "Sell"
  strategy: string
  openPrice: number
  closePrice: number | null
  volume: number
  pnl: number
  status: "Open" | "Closed"
  openTime: string
  closeTime: string | null
}

const trades: Trade[] = [
  {
    id: "T-001234",
    pair: "EUR/USD",
    type: "Buy",
    strategy: "Alpha Scalper Pro",
    openPrice: 1.0852,
    closePrice: 1.0891,
    volume: 1.5,
    pnl: 58.50,
    status: "Closed",
    openTime: "2024-02-20 14:32:15",
    closeTime: "2024-02-20 16:45:30"
  },
  {
    id: "T-001235",
    pair: "GBP/USD",
    type: "Sell",
    strategy: "Swing Master",
    openPrice: 1.2654,
    closePrice: 1.2612,
    volume: 2.0,
    pnl: 84.00,
    status: "Closed",
    openTime: "2024-02-20 10:15:00",
    closeTime: "2024-02-20 14:20:45"
  },
  {
    id: "T-001236",
    pair: "USD/JPY",
    type: "Buy",
    strategy: "Alpha Scalper Pro",
    openPrice: 150.25,
    closePrice: null,
    volume: 1.0,
    pnl: 32.10,
    status: "Open",
    openTime: "2024-02-20 09:00:00",
    closeTime: null
  },
  {
    id: "T-001237",
    pair: "XAU/USD",
    type: "Sell",
    strategy: "Gold Rush Strategy",
    openPrice: 2025.50,
    closePrice: 2032.80,
    volume: 0.5,
    pnl: -36.50,
    status: "Closed",
    openTime: "2024-02-19 15:30:00",
    closeTime: "2024-02-19 22:15:00"
  },
  {
    id: "T-001238",
    pair: "EUR/GBP",
    type: "Buy",
    strategy: "Swing Master",
    openPrice: 0.8542,
    closePrice: 0.8568,
    volume: 2.5,
    pnl: 65.00,
    status: "Closed",
    openTime: "2024-02-19 08:45:00",
    closeTime: "2024-02-19 14:30:00"
  },
  {
    id: "T-001239",
    pair: "USD/CAD",
    type: "Sell",
    strategy: "Alpha Scalper Pro",
    openPrice: 1.3521,
    closePrice: null,
    volume: 1.0,
    pnl: -12.40,
    status: "Open",
    openTime: "2024-02-20 11:00:00",
    closeTime: null
  }
]

export default function TradesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const openTrades = trades.filter(t => t.status === "Open")
  const closedTrades = trades.filter(t => t.status === "Closed")
  const totalPnl = trades.reduce((sum, t) => sum + t.pnl, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Trade History</h1>
          <p className="text-muted-foreground">View all your copied trades and performance</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Open Trades</p>
            <p className="text-2xl font-bold text-foreground">{openTrades.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Closed Trades</p>
            <p className="text-2xl font-bold text-foreground">{closedTrades.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total P&L</p>
            <p className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Win Rate</p>
            <p className="text-2xl font-bold text-foreground">68.4%</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search trades..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Strategies</SelectItem>
                  <SelectItem value="alpha">Alpha Scalper Pro</SelectItem>
                  <SelectItem value="swing">Swing Master</SelectItem>
                  <SelectItem value="gold">Gold Rush Strategy</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Pair" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pairs</SelectItem>
                  <SelectItem value="eurusd">EUR/USD</SelectItem>
                  <SelectItem value="gbpusd">GBP/USD</SelectItem>
                  <SelectItem value="usdjpy">USD/JPY</SelectItem>
                  <SelectItem value="xauusd">XAU/USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="bg-background border border-border">
              <TabsTrigger value="all">All Trades</TabsTrigger>
              <TabsTrigger value="open">Open ({openTrades.length})</TabsTrigger>
              <TabsTrigger value="closed">Closed ({closedTrades.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <TradesTable trades={trades} />
            </TabsContent>
            <TabsContent value="open">
              <TradesTable trades={openTrades} />
            </TabsContent>
            <TabsContent value="closed">
              <TradesTable trades={closedTrades} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function TradesTable({ trades }: { trades: Trade[] }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead>Trade ID</TableHead>
            <TableHead>Pair</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Strategy</TableHead>
            <TableHead className="text-right">Open Price</TableHead>
            <TableHead className="text-right">Close Price</TableHead>
            <TableHead className="text-right">Volume</TableHead>
            <TableHead className="text-right">P&L</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id} className="border-border">
              <TableCell className="font-mono text-sm text-foreground">
                {trade.id}
              </TableCell>
              <TableCell className="font-medium text-foreground">
                {trade.pair}
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline"
                  className={
                    trade.type === "Buy"
                      ? "border-green-500/30 bg-green-500/10 text-green-500"
                      : "border-red-500/30 bg-red-500/10 text-red-500"
                  }
                >
                  {trade.type}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {trade.strategy}
              </TableCell>
              <TableCell className="text-right font-mono text-foreground">
                {trade.openPrice.toFixed(trade.pair.includes("JPY") ? 2 : 4)}
              </TableCell>
              <TableCell className="text-right font-mono text-foreground">
                {trade.closePrice ? trade.closePrice.toFixed(trade.pair.includes("JPY") ? 2 : 4) : "-"}
              </TableCell>
              <TableCell className="text-right text-foreground">
                {trade.volume.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {trade.pnl >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`font-medium ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline"
                  className={
                    trade.status === "Open"
                      ? "border-blue-500/30 bg-blue-500/10 text-blue-500"
                      : "border-gray-500/30 bg-gray-500/10 text-gray-500"
                  }
                >
                  {trade.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
