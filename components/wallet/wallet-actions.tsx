'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight, Download } from 'lucide-react'

const actions = [
  {
    href: '/wallet/deposit',
    label: 'Deposit',
    description: 'Add funds to your wallet',
    icon: ArrowDownLeft,
    color: 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/20',
  },
  {
    href: '/wallet/withdraw',
    label: 'Withdraw',
    description: 'Withdraw your profits',
    icon: ArrowUpRight,
    color: 'bg-gold/10 text-gold hover:bg-gold/20 border-gold/20',
  },
  {
    href: '/wallet/transfer',
    label: 'Transfer',
    description: 'Transfer between wallets',
    icon: ArrowLeftRight,
    color: 'bg-accent/10 text-accent hover:bg-accent/20 border-accent/20',
  },
  {
    href: '/transactions',
    label: 'Export',
    description: 'Download transaction history',
    icon: Download,
    color: 'bg-secondary text-muted-foreground hover:bg-secondary/80 border-border',
  },
]

export function WalletActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-colors ${action.color}`}
        >
          <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center">
            <action.icon className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground">{action.label}</p>
            <p className="text-xs text-muted-foreground">{action.description}</p>
          </div>
        </Link>
      ))}
    </motion.div>
  )
}
