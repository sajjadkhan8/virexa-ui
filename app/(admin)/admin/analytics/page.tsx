'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Users, Shield } from 'lucide-react'

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics Overview</h1>
        <p className="text-muted-foreground">Platform metrics across user growth, volume, and risk.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Monthly Volume</p><p className="text-2xl font-bold text-foreground">$48.2M</p></CardContent></Card>
        <Card className="bg-card border-border"><CardContent className="p-4"><p className="text-sm text-muted-foreground">New Users</p><p className="text-2xl font-bold text-foreground">1,842</p></CardContent></Card>
        <Card className="bg-card border-border"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Avg ROI</p><p className="text-2xl font-bold text-primary">+12.6%</p></CardContent></Card>
        <Card className="bg-card border-border"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Fraud Alerts</p><p className="text-2xl font-bold text-gold">17</p></CardContent></Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Signals</CardTitle>
          <CardDescription>Automated highlights based on current platform behavior.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-lg border border-border bg-background/50 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3"><TrendingUp className="w-4 h-4 text-primary" /><p className="text-sm text-foreground">Copy-trading volume is up 18% week-over-week.</p></div>
            <Badge className="bg-primary/10 text-primary border-primary/30">Positive</Badge>
          </div>
          <div className="rounded-lg border border-border bg-background/50 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3"><Users className="w-4 h-4 text-accent" /><p className="text-sm text-foreground">Referral signups increased after campaign launch.</p></div>
            <Badge className="bg-accent/10 text-accent border-accent/30">Observe</Badge>
          </div>
          <div className="rounded-lg border border-border bg-background/50 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3"><Shield className="w-4 h-4 text-gold" /><p className="text-sm text-foreground">Withdrawal review queue exceeds target threshold.</p></div>
            <Badge className="bg-gold/10 text-gold border-gold/30">Action Needed</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

