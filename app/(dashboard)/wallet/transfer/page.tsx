'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeftRight, ArrowLeft, Wallet, TrendingUp } from 'lucide-react'

export default function WalletTransferPage() {
  const [amount, setAmount] = useState('')
  const [fromWallet, setFromWallet] = useState('main')
  const [toWallet, setToWallet] = useState('trading')

  return (
    <div className="space-y-6">
      <Link href="/wallet" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" />
        Back to Wallet
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Transfer Funds</h1>
        <p className="text-muted-foreground">Move funds between your main wallet and trading wallet.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle>Internal Transfer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Select value={fromWallet} onValueChange={setFromWallet}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Wallet (USD 8,240.00)</SelectItem>
                    <SelectItem value="trading">Trading Wallet (USD 4,210.00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <Select value={toWallet} onValueChange={setToWallet}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trading">Trading Wallet (USD 4,210.00)</SelectItem>
                    <SelectItem value="main">Main Wallet (USD 8,240.00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter transfer amount"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="h-12 bg-secondary border-border"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {[100, 250, 500, 1000, 2500].map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  className="h-9"
                  onClick={() => setAmount(quickAmount.toString())}
                >
                  ${quickAmount}
                </Button>
              ))}
            </div>

            <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90" disabled={!amount}>
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              Confirm Transfer
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Wallet Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Main Wallet</span>
                <span className="font-medium text-foreground">$8,240.00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Trading Wallet</span>
                <span className="font-medium text-foreground">$4,210.00</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                <span className="text-muted-foreground">Transfer Fee</span>
                <span className="font-medium text-primary">$0.00</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4 space-y-2">
              <p className="text-sm font-medium text-foreground">Need more balance?</p>
              <div className="grid gap-2">
                <Link href="/wallet/deposit">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Wallet className="w-4 h-4" />
                    Deposit Funds
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Explore Strategies
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

