'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { StrategyPerformanceChart } from '@/components/marketplace/strategy-performance-chart'
import { StrategyStats } from '@/components/marketplace/strategy-stats'
import { StrategyTradeHistory } from '@/components/marketplace/strategy-trade-history'
import { CopyStrategyModal } from '@/components/marketplace/copy-strategy-modal'
import { 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  Clock,
  Share2,
  Star,
  Copy,
  Loader2,
  AlertTriangle,
} from 'lucide-react'
import Link from 'next/link'

const strategyData = {
  id: 1,
  name: 'Alpha Momentum',
  trader: 'Michael Chen',
  avatar: 'MC',
  bio: 'Professional forex trader with 8+ years of experience. Specializing in momentum-based strategies on major currency pairs.',
  roi: 45.8,
  monthlyReturn: 12.4,
  drawdown: 8.2,
  followers: 3420,
  totalTrades: 1284,
  winRate: 68,
  avgTradeTime: '4.2 hours',
  profitFactor: 2.34,
  sharpeRatio: 1.89,
  risk: 'Medium' as const,
  minInvestment: 500,
  assets: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD'],
  created: 'Jan 2023',
  rating: 4.8,
  reviews: 324,
}

export default function StrategyDetailsPage() {
  const { toast } = useToast()
  const [showCopyModal, setShowCopyModal] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [isCopyingLink, setIsCopyingLink] = useState(false)
  const [shareError, setShareError] = useState('')

  const shareUrl = `https://virexa.com/marketplace/${strategyData.id}`

  const copyShareLink = async () => {
    setIsCopyingLink(true)
    setShareError('')
    await new Promise((resolve) => setTimeout(resolve, 500))
    try {
      await navigator.clipboard.writeText(shareUrl)
      setShareOpen(false)
      toast({ title: 'Link copied', description: 'Strategy share link copied to clipboard.' })
    } catch {
      setShareError('Clipboard permission denied. You can copy the link manually.')
    } finally {
      setIsCopyingLink(false)
    }
  }

  return (
    <div className="space-y-6">
      <Toaster />

      {/* Back Button */}
      <Link href="/marketplace" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" />
        Back to Marketplace
      </Link>

      {/* Strategy Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-primary-foreground">
              {strategyData.avatar}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-foreground">{strategyData.name}</h1>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold">
                  Top Performer
                </span>
              </div>
              <p className="text-muted-foreground mb-2">by {strategyData.trader}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span className="text-foreground font-medium">{strategyData.rating}</span>
                  <span className="text-muted-foreground">({strategyData.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{strategyData.followers.toLocaleString()} followers</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Since {strategyData.created}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="shrink-0" onClick={() => setShareOpen(true)}>
              <Share2 className="w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              onClick={() => setShowCopyModal(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Start Copying
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center p-4 rounded-xl bg-primary/5">
            <p className="text-sm text-muted-foreground mb-1">Monthly ROI</p>
            <p className="text-2xl font-bold text-primary">+{strategyData.roi}%</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-secondary">
            <p className="text-sm text-muted-foreground mb-1">Max Drawdown</p>
            <p className="text-2xl font-bold text-foreground">{strategyData.drawdown}%</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-secondary">
            <p className="text-sm text-muted-foreground mb-1">Win Rate</p>
            <p className="text-2xl font-bold text-foreground">{strategyData.winRate}%</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-secondary">
            <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
            <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-gold/10 text-gold">
              {strategyData.risk}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Performance Chart */}
      <StrategyPerformanceChart />

      {/* Stats & Metrics */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StrategyStats strategy={strategyData} />
        </div>
        
        {/* Strategy Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-6 h-fit"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Strategy Info</h3>
          
          <p className="text-sm text-muted-foreground mb-6">{strategyData.bio}</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Min Investment</span>
              <span className="text-sm font-medium text-foreground">${strategyData.minInvestment}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Trades</span>
              <span className="text-sm font-medium text-foreground">{strategyData.totalTrades.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg Trade Duration</span>
              <span className="text-sm font-medium text-foreground">{strategyData.avgTradeTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Profit Factor</span>
              <span className="text-sm font-medium text-foreground">{strategyData.profitFactor}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
              <span className="text-sm font-medium text-foreground">{strategyData.sharpeRatio}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">Traded Assets</p>
            <div className="flex flex-wrap gap-2">
              {strategyData.assets.map((asset) => (
                <span key={asset} className="px-3 py-1.5 rounded-lg bg-secondary text-sm text-foreground">
                  {asset}
                </span>
              ))}
            </div>
          </div>

          <Button 
            onClick={() => setShowCopyModal(true)}
            className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Copy This Strategy
          </Button>
        </motion.div>
      </div>

      {/* Trade History */}
      <StrategyTradeHistory />

      {/* Copy Modal */}
      <CopyStrategyModal 
        isOpen={showCopyModal} 
        onClose={() => setShowCopyModal(false)}
        strategy={strategyData}
      />

      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share strategy</DialogTitle>
            <DialogDescription>Copy this public strategy link and share it with your network.</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Input value={shareUrl} readOnly className="font-mono text-xs" />
            {shareError && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                <span>{shareError}</span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShareOpen(false)} disabled={isCopyingLink}>Close</Button>
            <Button onClick={copyShareLink} disabled={isCopyingLink} className="gap-2">
              {isCopyingLink ? <Loader2 className="h-4 w-4 animate-spin" /> : <Copy className="h-4 w-4" />}
              Copy Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
