'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'

const trades = [
  {
    id: 1,
    pair: 'EUR/USD',
    type: 'BUY',
    strategy: 'Alpha Momentum',
    openPrice: 1.0842,
    closePrice: 1.0896,
    pnl: 54.00,
    isPositive: true,
    time: '2 hours ago',
    status: 'closed',
  },
  {
    id: 2,
    pair: 'GBP/JPY',
    type: 'SELL',
    strategy: 'Scalp Master',
    openPrice: 186.45,
    closePrice: 186.12,
    pnl: 33.00,
    isPositive: true,
    time: '4 hours ago',
    status: 'closed',
  },
  {
    id: 3,
    pair: 'USD/CAD',
    type: 'BUY',
    strategy: 'Safe Haven',
    openPrice: 1.3542,
    closePrice: 1.3498,
    pnl: -44.00,
    isPositive: false,
    time: '6 hours ago',
    status: 'closed',
  },
  {
    id: 4,
    pair: 'AUD/USD',
    type: 'BUY',
    strategy: 'Alpha Momentum',
    openPrice: 0.6542,
    closePrice: null,
    pnl: 22.50,
    isPositive: true,
    time: '8 hours ago',
    status: 'open',
  },
  {
    id: 5,
    pair: 'XAU/USD',
    type: 'SELL',
    strategy: 'Scalp Master',
    openPrice: 2024.50,
    closePrice: null,
    pnl: -18.00,
    isPositive: false,
    time: '12 hours ago',
    status: 'open',
  },
]

export function RecentTrades() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Trades</h3>
        <Link href="/transactions">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1">
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-muted-foreground border-b border-border">
              <th className="pb-4 font-medium">Pair</th>
              <th className="pb-4 font-medium">Type</th>
              <th className="pb-4 font-medium hidden sm:table-cell">Strategy</th>
              <th className="pb-4 font-medium hidden md:table-cell">Entry</th>
              <th className="pb-4 font-medium hidden md:table-cell">Exit</th>
              <th className="pb-4 font-medium text-right">PnL</th>
              <th className="pb-4 font-medium text-right hidden lg:table-cell">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {trades.map((trade) => (
              <tr key={trade.id} className="border-b border-border last:border-0">
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      trade.isPositive ? 'bg-primary/10' : 'bg-destructive/10'
                    }`}>
                      {trade.isPositive ? (
                        <TrendingUp className="w-4 h-4 text-primary" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    <span className="font-medium text-foreground">{trade.pair}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    trade.type === 'BUY' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-destructive/10 text-destructive'
                  }`}>
                    {trade.type}
                  </span>
                </td>
                <td className="py-4 text-muted-foreground hidden sm:table-cell">{trade.strategy}</td>
                <td className="py-4 text-muted-foreground hidden md:table-cell">{trade.openPrice}</td>
                <td className="py-4 text-muted-foreground hidden md:table-cell">
                  {trade.closePrice || '—'}
                </td>
                <td className={`py-4 text-right font-medium ${
                  trade.isPositive ? 'text-primary' : 'text-destructive'
                }`}>
                  {trade.isPositive ? '+' : ''}${Math.abs(trade.pnl).toFixed(2)}
                </td>
                <td className="py-4 text-right hidden lg:table-cell">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    trade.status === 'open' 
                      ? 'bg-gold/10 text-gold' 
                      : 'bg-secondary text-muted-foreground'
                  }`}>
                    {trade.status === 'open' ? 'Open' : 'Closed'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
