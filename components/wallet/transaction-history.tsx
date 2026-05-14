'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowDownLeft, ArrowUpRight, TrendingUp, Users, ArrowLeftRight, Download, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

const filters = ['All', 'Deposits', 'Withdrawals', 'Commissions', 'Trading']

const transactions = [
  {
    id: 1,
    type: 'deposit',
    description: 'USDT Deposit',
    amount: 1000,
    status: 'completed',
    date: 'Dec 12, 2024',
    time: '14:32',
    method: 'USDT TRC20',
  },
  {
    id: 2,
    type: 'commission',
    description: 'Referral Commission',
    amount: 85.50,
    status: 'completed',
    date: 'Dec 11, 2024',
    time: '09:15',
    method: 'Level 1 Commission',
  },
  {
    id: 3,
    type: 'trading',
    description: 'Trading Profit',
    amount: 234.80,
    status: 'completed',
    date: 'Dec 10, 2024',
    time: '18:45',
    method: 'Alpha Momentum',
  },
  {
    id: 4,
    type: 'withdrawal',
    description: 'Withdrawal Request',
    amount: -500,
    status: 'pending',
    date: 'Dec 10, 2024',
    time: '12:20',
    method: 'Bank Transfer',
  },
  {
    id: 5,
    type: 'transfer',
    description: 'Wallet Transfer',
    amount: -250,
    status: 'completed',
    date: 'Dec 9, 2024',
    time: '10:00',
    method: 'To Trading Balance',
  },
  {
    id: 6,
    type: 'trading',
    description: 'Trading Loss',
    amount: -45.20,
    status: 'completed',
    date: 'Dec 8, 2024',
    time: '16:30',
    method: 'Scalp Master',
  },
  {
    id: 7,
    type: 'deposit',
    description: 'Bank Transfer',
    amount: 2500,
    status: 'completed',
    date: 'Dec 7, 2024',
    time: '11:45',
    method: 'Bank Transfer',
  },
  {
    id: 8,
    type: 'commission',
    description: 'Level 2 Commission',
    amount: 42.00,
    status: 'completed',
    date: 'Dec 6, 2024',
    time: '08:30',
    method: 'Team Volume',
  },
]

const typeConfig = {
  deposit: { icon: ArrowDownLeft, color: 'text-primary bg-primary/10' },
  withdrawal: { icon: ArrowUpRight, color: 'text-destructive bg-destructive/10' },
  trading: { icon: TrendingUp, color: 'text-accent bg-accent/10' },
  commission: { icon: Users, color: 'text-gold bg-gold/10' },
  transfer: { icon: ArrowLeftRight, color: 'text-muted-foreground bg-secondary' },
}

const statusConfig = {
  completed: { label: 'Completed', color: 'bg-primary/10 text-primary' },
  pending: { label: 'Pending', color: 'bg-gold/10 text-gold' },
  failed: { label: 'Failed', color: 'bg-destructive/10 text-destructive' },
}

export function TransactionHistory() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredTransactions = transactions.filter((tx) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Deposits') return tx.type === 'deposit'
    if (activeFilter === 'Withdrawals') return tx.type === 'withdrawal'
    if (activeFilter === 'Commissions') return tx.type === 'commission'
    if (activeFilter === 'Trading') return tx.type === 'trading'
    return true
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold text-foreground">Transaction History</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant="ghost"
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              'shrink-0 h-9 px-4 rounded-full',
              activeFilter === filter
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            )}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.map((tx) => {
          const config = typeConfig[tx.type as keyof typeof typeConfig]
          const status = statusConfig[tx.status as keyof typeof statusConfig]
          const Icon = config.icon

          return (
            <div
              key={tx.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground truncate">{tx.description}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{tx.method}</p>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${tx.amount >= 0 ? 'text-primary' : 'text-foreground'}`}>
                  {tx.amount >= 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
            </div>
          )
        })}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No transactions found</p>
        </div>
      )}
    </motion.div>
  )
}
