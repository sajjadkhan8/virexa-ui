'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bell, CheckCheck, ArrowRight, Wallet, TrendingUp, Users } from 'lucide-react'

const notifications = [
  {
    id: 1,
    title: 'Withdrawal approved',
    message: 'Your withdrawal request of $500 has been approved and is now processing.',
    time: '2m ago',
    unread: true,
    href: '/transactions',
    icon: Wallet,
  },
  {
    id: 2,
    title: 'Trade executed',
    message: 'Alpha Momentum opened EUR/USD long at 1.0842.',
    time: '8m ago',
    unread: true,
    href: '/my-strategies',
    icon: TrendingUp,
  },
  {
    id: 3,
    title: 'New referral joined',
    message: 'A new user joined using your referral link.',
    time: '1h ago',
    unread: false,
    href: '/referrals',
    icon: Users,
  },
  {
    id: 4,
    title: 'KYC reminder',
    message: 'Complete your identity verification to unlock higher withdrawal limits.',
    time: '3h ago',
    unread: false,
    href: '/kyc',
    icon: Bell,
  },
]

export default function NotificationsPage() {
  const unreadCount = notifications.filter((item) => item.unread).length

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Stay updated on trades, wallet activity, and referrals.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <CheckCheck className="w-4 h-4" />
          Mark all as read
        </Button>
      </motion.div>

      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
            {unreadCount} unread
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-border bg-background/50 p-4 transition-colors hover:bg-secondary/50"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.message}</p>
                  <Link href={item.href} className="inline-flex items-center gap-1 text-sm text-primary mt-3">
                    Open
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                {item.unread && <span className="w-2.5 h-2.5 mt-1 rounded-full bg-primary shrink-0" />}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

