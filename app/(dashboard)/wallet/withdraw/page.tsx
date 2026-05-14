'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Wallet, AlertTriangle, Clock, Shield } from 'lucide-react'

export default function WithdrawPage() {
  const [amount, setAmount] = useState('')
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const availableBalance = 8230.00
  const minWithdrawal = 50
  const withdrawalFee = 2

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const netAmount = Number(amount) ? Number(amount) - withdrawalFee : 0

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/wallet" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" />
        Back to Wallet
      </Link>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Withdraw Funds</h1>
        <p className="text-muted-foreground">Withdraw your profits securely</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Withdrawal Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-card border border-border rounded-2xl p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Available Balance */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="text-2xl font-bold text-foreground">${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Withdrawal Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder={`Min $${minWithdrawal}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 bg-secondary border-border"
                min={minWithdrawal}
                max={availableBalance}
              />
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Min: ${minWithdrawal}</span>
                <button
                  type="button"
                  onClick={() => setAmount(availableBalance.toString())}
                  className="text-primary hover:underline"
                >
                  Withdraw All
                </button>
              </div>
            </div>

            {/* Destination Address */}
            <div className="space-y-2">
              <Label htmlFor="address">USDT Address (TRC20)</Label>
              <Input
                id="address"
                type="text"
                placeholder="Enter your USDT TRC20 address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="h-12 bg-secondary border-border font-mono text-sm"
              />
            </div>

            {/* Fee Breakdown */}
            <div className="space-y-3 p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Withdrawal Amount</span>
                <span className="text-foreground">${Number(amount || 0).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Network Fee</span>
                <span className="text-foreground">-${withdrawalFee.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="font-medium text-foreground">You&apos;ll Receive</span>
                <span className="text-lg font-bold text-primary">${Math.max(netAmount, 0).toFixed(2)}</span>
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gold/5 border border-gold/20">
              <AlertTriangle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Please double-check the withdrawal address. Transactions cannot be reversed once processed.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading || !amount || !address || Number(amount) < minWithdrawal}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                'Submit Withdrawal Request'
              )}
            </Button>
          </form>
        </motion.div>

        {/* Info Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Processing Info */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Withdrawal Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Processing Time</p>
                  <p className="text-xs text-muted-foreground">Typically within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Security Check</p>
                  <p className="text-xs text-muted-foreground">All withdrawals are manually reviewed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Withdrawals */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Pending Withdrawals</h3>
            <div className="p-4 rounded-xl bg-gold/5 border border-gold/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">$500.00</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-gold">
                  Pending
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Submitted Dec 10, 2024</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
