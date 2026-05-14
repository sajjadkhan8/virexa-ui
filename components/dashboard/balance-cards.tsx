'use client'

import { motion } from 'framer-motion'
import { Wallet, TrendingUp, DollarSign, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const cards = [
  {
    title: 'Total Balance',
    value: '$12,450.00',
    change: '+$1,234.50',
    changePercent: '+11.2%',
    isPositive: true,
    icon: Wallet,
    color: 'from-primary/20 to-primary/5',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    title: 'Trading Equity',
    value: '$8,230.00',
    change: '+$856.20',
    changePercent: '+11.6%',
    isPositive: true,
    icon: TrendingUp,
    color: 'from-accent/20 to-accent/5',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  {
    title: 'Monthly PnL',
    value: '+$2,180.00',
    change: '+$320.00',
    changePercent: '+17.2%',
    isPositive: true,
    icon: DollarSign,
    color: 'from-primary/20 to-primary/5',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    title: 'Referral Earnings',
    value: '$1,240.00',
    change: '+$180.00',
    changePercent: '+16.9%',
    isPositive: true,
    icon: Users,
    color: 'from-gold/20 to-gold/5',
    iconBg: 'bg-gold/10',
    iconColor: 'text-gold',
  },
]

export function BalanceCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gradient-to-br ${card.color} border border-border rounded-2xl p-4 lg:p-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${card.iconBg}`}>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${card.isPositive ? 'text-primary' : 'text-destructive'}`}>
              {card.isPositive ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              {card.changePercent}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
          <p className="text-xl lg:text-2xl font-bold text-foreground">{card.value}</p>
          <p className={`text-xs mt-1 ${card.isPositive ? 'text-primary' : 'text-destructive'}`}>
            {card.change} this month
          </p>
        </motion.div>
      ))}
    </div>
  )
}
