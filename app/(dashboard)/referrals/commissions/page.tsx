'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download } from 'lucide-react'

const commissions = [
  { id: 'COM-1201', source: 'Sarah Chen', level: 'L1', amount: 124.4, status: 'Paid', date: 'May 11, 2026' },
  { id: 'COM-1202', source: 'Ahmed Malik', level: 'L1', amount: 88.2, status: 'Paid', date: 'May 10, 2026' },
  { id: 'COM-1203', source: 'David Park', level: 'L2', amount: 24.8, status: 'Pending', date: 'May 09, 2026' },
  { id: 'COM-1204', source: 'Mia Wong', level: 'L3', amount: 6.5, status: 'Pending', date: 'May 08, 2026' },
]

export default function AffiliateCommissionsPage() {
  const pending = commissions.filter((item) => item.status === 'Pending').reduce((sum, item) => sum + item.amount, 0)
  const paid = commissions.filter((item) => item.status === 'Paid').reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="space-y-6">
      <Link href="/referrals" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" />
        Back to Referrals
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Affiliate Commissions</h1>
          <p className="text-muted-foreground">Detailed ledger of earned and pending referral commissions.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Paid This Cycle</p>
            <p className="text-2xl font-bold text-primary mt-1">${paid.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending Settlement</p>
            <p className="text-2xl font-bold text-gold mt-1">${pending.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Commission Rate</p>
            <p className="text-2xl font-bold text-foreground mt-1">Up to 35%</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Commission History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {commissions.map((commission) => (
            <div key={commission.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-secondary/50">
              <div>
                <p className="font-medium text-foreground">{commission.source}</p>
                <p className="text-sm text-muted-foreground">
                  {commission.id} · {commission.level} · {commission.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-semibold text-foreground">${commission.amount.toFixed(2)}</p>
                <Badge
                  variant="outline"
                  className={
                    commission.status === 'Paid'
                      ? 'border-primary/30 bg-primary/10 text-primary'
                      : 'border-gold/30 bg-gold/10 text-gold'
                  }
                >
                  {commission.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

