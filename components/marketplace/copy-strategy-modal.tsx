'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { X, AlertTriangle, TrendingUp, DollarSign, Shield } from 'lucide-react'

interface Strategy {
  id: number
  name: string
  trader: string
  avatar: string
  roi: number
  minInvestment: number
  risk: string
}

interface CopyStrategyModalProps {
  isOpen: boolean
  onClose: () => void
  strategy: Strategy
}

export function CopyStrategyModal({ isOpen, onClose, strategy }: CopyStrategyModalProps) {
  const [amount, setAmount] = useState('')
  const [riskMultiplier, setRiskMultiplier] = useState([1])
  const [stopCopyThreshold, setStopCopyThreshold] = useState([20])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border rounded-2xl p-6 z-50 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {strategy.avatar}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{strategy.name}</h2>
                  <p className="text-sm text-muted-foreground">by {strategy.trader}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Strategy Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-secondary/50">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Monthly ROI</p>
                <p className="text-lg font-bold text-primary">+{strategy.roi}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <p className="text-lg font-bold text-gold">{strategy.risk}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Min Investment</p>
                <p className="text-lg font-bold text-foreground">${strategy.minInvestment}</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Investment Amount */}
              <div className="space-y-3">
                <Label htmlFor="amount">Investment Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder={`Min $${strategy.minInvestment}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10 h-12 bg-secondary border-border"
                    min={strategy.minInvestment}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">Available balance: $8,230.00</p>
              </div>

              {/* Risk Multiplier */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Risk Multiplier</Label>
                  <span className="text-sm font-medium text-foreground">{riskMultiplier[0]}x</span>
                </div>
                <Slider
                  value={riskMultiplier}
                  onValueChange={setRiskMultiplier}
                  min={0.5}
                  max={3}
                  step={0.5}
                  className="py-2"
                />
                <p className="text-xs text-muted-foreground">
                  Adjusts position sizes relative to the strategy. Higher = more risk/reward.
                </p>
              </div>

              {/* Stop Copy Threshold */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Stop Copy Threshold</Label>
                  <span className="text-sm font-medium text-foreground">-{stopCopyThreshold[0]}%</span>
                </div>
                <Slider
                  value={stopCopyThreshold}
                  onValueChange={setStopCopyThreshold}
                  min={5}
                  max={50}
                  step={5}
                  className="py-2"
                />
                <p className="text-xs text-muted-foreground">
                  Automatically stop copying if your investment drops by this percentage.
                </p>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Trading involves risk. Past performance does not guarantee future results. Only invest what you can afford to lose.
                </p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                disabled={isLoading || !amount || Number(amount) < strategy.minInvestment}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Start Copying
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
