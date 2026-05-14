'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Star, Users, TrendingUp } from 'lucide-react'

export default function TraderProfilePage() {
  const params = useParams<{ id: string }>()
  const traderId = params.id

  return (
    <div className="space-y-6">
      <Link href="/leaderboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" />
        Back to Leaderboard
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground text-lg font-bold flex items-center justify-center">
              {String(traderId).slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Trader Profile #{traderId}</h1>
              <p className="text-muted-foreground">Verified forex strategist with strong consistency.</p>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  4.9 rating
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  9,420 copiers
                </span>
              </div>
            </div>
          </div>
          <Link href="/marketplace/1">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              <TrendingUp className="w-4 h-4" />
              Copy Strategy
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">30D Return</span><span className="font-semibold text-primary">+18.2%</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Win Rate</span><span className="font-semibold text-foreground">74%</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Max Drawdown</span><span className="font-semibold text-foreground">8.9%</span></div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Risk Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Risk Level</span><Badge className="bg-gold/10 text-gold">Medium</Badge></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Avg Trade Time</span><span className="font-semibold text-foreground">5.1h</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Preferred Pairs</span><span className="font-semibold text-foreground">EUR/USD</span></div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Allocation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Min Copy Amount</span><span className="font-semibold text-foreground">$500</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Profit Share</span><span className="font-semibold text-foreground">20%</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Status</span><Badge className="bg-primary/10 text-primary">Open</Badge></div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

