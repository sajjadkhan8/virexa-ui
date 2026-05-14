'use client'

import { motion } from 'framer-motion'
import { Wallet, TrendingUp, Gift, Coins, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

const balances = [
  {
    title: 'Available Balance',
    amount: 8230.00,
    subtitle: 'Ready to trade or withdraw',
    icon: Wallet,
    color: 'from-primary/20 to-primary/5',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    title: 'Trading Balance',
    amount: 3420.00,
    subtitle: 'Allocated to strategies',
    icon: TrendingUp,
    color: 'from-accent/20 to-accent/5',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  {
    title: 'Bonus Balance',
    amount: 250.00,
    subtitle: 'Trading bonus credits',
    icon: Gift,
    color: 'from-gold/20 to-gold/5',
    iconBg: 'bg-gold/10',
    iconColor: 'text-gold',
  },
  {
    title: 'Referral Earnings',
    amount: 1240.00,
    subtitle: 'Commission earnings',
    icon: Coins,
    color: 'from-primary/20 to-primary/5',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
]

export function WalletBalances() {
  const [showBalances, setShowBalances] = useState(true)
  const totalBalance = balances.reduce((acc, b) => acc + b.amount, 0)

  return (
    <div className="space-y-4">
      {/* Total Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary/20 via-card to-accent/10 border border-border rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <span className="text-muted-foreground">Total Balance</span>
          </div>
          <button
            onClick={() => setShowBalances(!showBalances)}
            className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary"
          >
            {showBalances ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-4xl lg:text-5xl font-bold text-foreground">
          {showBalances ? `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••'}
        </p>
        <p className="text-sm text-muted-foreground mt-2">Last updated: Just now</p>
      </motion.div>

      {/* Balance Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {balances.map((balance, index) => (
          <motion.div
            key={balance.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${balance.color} border border-border rounded-2xl p-4`}
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${balance.iconBg} mb-3`}>
              <balance.icon className={`w-5 h-5 ${balance.iconColor}`} />
            </div>
            <p className="text-sm text-muted-foreground mb-1">{balance.title}</p>
            <p className="text-xl font-bold text-foreground">
              {showBalances ? `$${balance.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{balance.subtitle}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
