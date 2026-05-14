'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Copy, Check, Upload, QrCode, CreditCard, Building, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'

const depositMethods = [
  {
    id: 'usdt',
    name: 'USDT TRC20',
    icon: QrCode,
    description: 'Deposit using Tether on TRON network',
    fee: '0%',
    time: 'Instant',
    min: 10,
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: Building,
    description: 'Direct bank wire transfer',
    fee: '1%',
    time: '1-3 days',
    min: 100,
  },
  {
    id: 'easypaisa',
    name: 'Easypaisa',
    icon: Smartphone,
    description: 'Pakistan mobile wallet',
    fee: '2%',
    time: 'Instant',
    min: 20,
  },
  {
    id: 'jazzcash',
    name: 'JazzCash',
    icon: CreditCard,
    description: 'Pakistan mobile payment',
    fee: '2%',
    time: 'Instant',
    min: 20,
  },
]

export default function DepositPage() {
  const [selectedMethod, setSelectedMethod] = useState('usdt')
  const [amount, setAmount] = useState('')
  const [copied, setCopied] = useState(false)

  const walletAddress = 'TXqHVnMQp6w9K1j8z3v5xGhF2nRtLw9pYm'

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Deposit Funds</h1>
        <p className="text-muted-foreground">Add funds to your trading wallet</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Deposit Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 space-y-4"
        >
          <h2 className="text-lg font-semibold text-foreground">Select Method</h2>
          {depositMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={cn(
                'w-full flex items-center gap-4 p-4 rounded-2xl border transition-colors text-left',
                selectedMethod === method.id
                  ? 'bg-primary/10 border-primary/30'
                  : 'bg-card border-border hover:bg-secondary'
              )}
            >
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center',
                selectedMethod === method.id ? 'bg-primary/20' : 'bg-secondary'
              )}>
                <method.icon className={cn(
                  'w-6 h-6',
                  selectedMethod === method.id ? 'text-primary' : 'text-muted-foreground'
                )} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{method.name}</p>
                <p className="text-xs text-muted-foreground">{method.description}</p>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Deposit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-card border border-border rounded-2xl p-6"
        >
          {selectedMethod === 'usdt' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">USDT TRC20 Deposit</h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">Fee: <span className="text-primary font-medium">0%</span></span>
                  <span className="text-muted-foreground">Min: <span className="text-foreground font-medium">$10</span></span>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-secondary/50">
                <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center">
                  <div className="w-40 h-40 bg-[linear-gradient(to_right,#0a0f1a_1px,transparent_1px),linear-gradient(to_bottom,#0a0f1a_1px,transparent_1px)] bg-[size:8px_8px]" />
                </div>
                <p className="text-sm text-muted-foreground">Scan QR code to deposit USDT</p>
              </div>

              {/* Wallet Address */}
              <div className="space-y-2">
                <Label>Deposit Address (TRC20)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={walletAddress}
                    readOnly
                    className="h-12 bg-secondary border-border font-mono text-sm"
                  />
                  <Button
                    onClick={handleCopy}
                    className="h-12 px-4 shrink-0"
                    variant="outline"
                  >
                    {copied ? <Check className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              {/* Important Notice */}
              <div className="p-4 rounded-xl bg-gold/5 border border-gold/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-gold">Important:</strong> Only send USDT on the TRC20 network to this address. 
                  Sending other tokens or using different networks may result in permanent loss of funds.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground">
                {depositMethods.find(m => m.id === selectedMethod)?.name} Deposit
              </h2>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 bg-secondary border-border"
                />
              </div>

              {/* Quick Amount Buttons */}
              <div className="flex flex-wrap gap-2">
                {[100, 250, 500, 1000, 2500, 5000].map((amt) => (
                  <Button
                    key={amt}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(amt.toString())}
                    className="h-9"
                  >
                    ${amt}
                  </Button>
                ))}
              </div>

              {/* Upload Proof */}
              <div className="space-y-2">
                <Label>Upload Payment Proof</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!amount}
              >
                Submit Deposit Request
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
