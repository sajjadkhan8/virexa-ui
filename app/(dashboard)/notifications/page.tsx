'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { Bell, CheckCheck, ArrowRight, Wallet, TrendingUp, Users, Loader2, AlertTriangle } from 'lucide-react'

type NotificationItem = {
  id: number
  title: string
  message: string
  time: string
  unread: boolean
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const initialNotifications: NotificationItem[] = [
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
  const { toast } = useToast()
  const [notifications, setNotifications] = useState(initialNotifications)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isMarking, setIsMarking] = useState(false)
  const [markError, setMarkError] = useState('')

  const unreadCount = notifications.filter((item) => item.unread).length

  const markAllAsRead = async () => {
    if (unreadCount === 0) {
      setMarkError('All notifications are already marked as read.')
      return
    }

    setIsMarking(true)
    setMarkError('')
    await new Promise((resolve) => setTimeout(resolve, 700))
    setNotifications((current) => current.map((item) => ({ ...item, unread: false })))
    setIsMarking(false)
    setIsConfirmOpen(false)
    toast({ title: 'All notifications marked as read' })
  }

  return (
    <div className="space-y-6">
      <Toaster />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Stay updated on trades, wallet activity, and referrals.</p>
        </div>

        <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <CheckCheck className="w-4 h-4" />
              Mark all as read
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mark all notifications as read?</DialogTitle>
              <DialogDescription>This will clear unread indicators for all current items.</DialogDescription>
            </DialogHeader>

            {markError && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                <span>{markError}</span>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConfirmOpen(false)} disabled={isMarking}>Cancel</Button>
              <Button onClick={markAllAsRead} disabled={isMarking}>
                {isMarking ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
          {notifications.length === 0 ? (
            <Empty className="border border-dashed border-border bg-background/50">
              <EmptyHeader>
                <EmptyMedia variant="icon"><Bell className="size-5" /></EmptyMedia>
                <EmptyTitle>No notifications yet</EmptyTitle>
                <EmptyDescription>New account and trade updates will appear here.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" onClick={() => setNotifications(initialNotifications)}>Reload Sample Notifications</Button>
              </EmptyContent>
            </Empty>
          ) : (
            notifications.map((item) => (
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
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
