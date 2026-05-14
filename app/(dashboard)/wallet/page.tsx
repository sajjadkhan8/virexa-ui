'use client'

import { motion } from 'framer-motion'
import { WalletBalances } from '@/components/wallet/wallet-balances'
import { TransactionHistory } from '@/components/wallet/transaction-history'
import { WalletActions } from '@/components/wallet/wallet-actions'

export default function WalletPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Wallet</h1>
        <p className="text-muted-foreground">Manage your funds and view transactions</p>
      </motion.div>

      {/* Wallet Balances */}
      <WalletBalances />

      {/* Quick Actions */}
      <WalletActions />

      {/* Transaction History */}
      <TransactionHistory />
    </div>
  )
}
