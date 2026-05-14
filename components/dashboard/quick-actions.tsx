'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Wallet, TrendingUp, Send, Users, ArrowRight } from 'lucide-react'

const actions = [
  {
    href: '/wallet/deposit',
    label: 'Deposit',
    description: 'Add funds to your wallet',
    icon: Wallet,
    color: 'bg-primary/10 text-primary hover:bg-primary/20',
  },
  {
    href: '/marketplace',
    label: 'Copy Trade',
    description: 'Start copying strategies',
    icon: TrendingUp,
    color: 'bg-accent/10 text-accent hover:bg-accent/20',
  },
  {
    href: '/wallet/withdraw',
    label: 'Withdraw',
    description: 'Withdraw your profits',
    icon: Send,
    color: 'bg-gold/10 text-gold hover:bg-gold/20',
  },
  {
    href: '/referrals',
    label: 'Invite Friends',
    description: 'Earn referral rewards',
    icon: Users,
    color: 'bg-primary/10 text-primary hover:bg-primary/20',
  },
]

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${action.color}`}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-background/50">
              <action.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{action.label}</p>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
