'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

const trades = [
  { id: 1, pair: 'EUR/USD', type: 'BUY', entry: 1.0842, exit: 1.0896, pnl: 54.00, pips: 54, time: '4h 23m', date: 'Dec 12, 2024' },
  { id: 2, pair: 'GBP/USD', type: 'SELL', entry: 1.2645, exit: 1.2598, pnl: 47.00, pips: 47, time: '2h 15m', date: 'Dec 11, 2024' },
  { id: 3, pair: 'USD/JPY', type: 'BUY', entry: 149.85, exit: 150.32, pnl: 32.50, pips: 47, time: '6h 42m', date: 'Dec 10, 2024' },
  { id: 4, pair: 'EUR/USD', type: 'SELL', entry: 1.0912, exit: 1.0945, pnl: -33.00, pips: -33, time: '3h 18m', date: 'Dec 9, 2024' },
  { id: 5, pair: 'AUD/USD', type: 'BUY', entry: 0.6542, exit: 0.6598, pnl: 56.00, pips: 56, time: '5h 30m', date: 'Dec 8, 2024' },
  { id: 6, pair: 'GBP/JPY', type: 'SELL', entry: 186.45, exit: 185.98, pnl: 47.00, pips: 47, time: '1h 45m', date: 'Dec 7, 2024' },
  { id: 7, pair: 'EUR/GBP', type: 'BUY', entry: 0.8534, exit: 0.8498, pnl: -36.00, pips: -36, time: '4h 12m', date: 'Dec 6, 2024' },
  { id: 8, pair: 'USD/CAD', type: 'SELL', entry: 1.3542, exit: 1.3498, pnl: 44.00, pips: 44, time: '3h 55m', date: 'Dec 5, 2024' },
]

export function StrategyTradeHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Trade History</h3>
        <span className="text-sm text-muted-foreground">Last 8 trades</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-muted-foreground border-b border-border">
              <th className="pb-4 font-medium">Pair</th>
              <th className="pb-4 font-medium">Type</th>
              <th className="pb-4 font-medium hidden sm:table-cell">Entry</th>
              <th className="pb-4 font-medium hidden sm:table-cell">Exit</th>
              <th className="pb-4 font-medium hidden md:table-cell">Duration</th>
              <th className="pb-4 font-medium text-right">Pips</th>
              <th className="pb-4 font-medium text-right">PnL</th>
              <th className="pb-4 font-medium text-right hidden lg:table-cell">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {trades.map((trade) => {
              const isPositive = trade.pnl > 0
              return (
                <tr key={trade.id} className="border-b border-border last:border-0">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isPositive ? 'bg-primary/10' : 'bg-destructive/10'
                      }`}>
                        {isPositive ? (
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
                  <td className="py-4 text-muted-foreground hidden sm:table-cell">{trade.entry}</td>
                  <td className="py-4 text-muted-foreground hidden sm:table-cell">{trade.exit}</td>
                  <td className="py-4 text-muted-foreground hidden md:table-cell">{trade.time}</td>
                  <td className={`py-4 text-right font-medium ${isPositive ? 'text-primary' : 'text-destructive'}`}>
                    {isPositive ? '+' : ''}{trade.pips}
                  </td>
                  <td className={`py-4 text-right font-medium ${isPositive ? 'text-primary' : 'text-destructive'}`}>
                    {isPositive ? '+' : ''}${Math.abs(trade.pnl).toFixed(2)}
                  </td>
                  <td className="py-4 text-right text-muted-foreground hidden lg:table-cell">{trade.date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
