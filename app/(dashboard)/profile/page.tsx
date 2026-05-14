'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowRight, ShieldCheck, Bell, Wallet, TrendingUp } from 'lucide-react'

const copiedStrategies = [
  { id: 1, name: 'Alpha Momentum', pnl: '+18.4%', amount: '$4,200' },
  { id: 2, name: 'Safe Haven', pnl: '+6.2%', amount: '$2,850' },
  { id: 3, name: 'Gold Rush', pnl: '-2.1%', amount: '$1,540' },
]

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Overview of your account, security, and trading activity.</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-card border-border lg:col-span-1">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-accent/20 text-accent">JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold text-foreground">John Doe</p>
                <p className="text-sm text-muted-foreground">john@example.com</p>
                <Badge variant="outline" className="mt-2 border-primary/30 text-primary bg-primary/10">
                  Pro Trader
                </Badge>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">KYC Status</span>
                <span className="inline-flex items-center gap-1 text-primary font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  Verified
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Account Level</span>
                <span className="text-foreground font-medium">Level 3</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Member Since</span>
                <span className="text-foreground font-medium">Jan 2024</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Profile Completion</span>
                <span className="text-foreground font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>

            <div className="grid gap-2">
              <Link href="/settings">
                <Button className="w-full justify-between bg-primary text-primary-foreground hover:bg-primary/90">
                  Edit Profile
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/settings?tab=security">
                <Button variant="outline" className="w-full justify-between">
                  Security Settings
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Wallet Balance</p>
                <p className="text-2xl font-bold text-foreground mt-1">$12,450</p>
                <Link href="/wallet" className="text-xs text-primary inline-flex items-center gap-1 mt-2">
                  <Wallet className="w-3 h-3" />
                  Open wallet
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Active Copies</p>
                <p className="text-2xl font-bold text-foreground mt-1">8</p>
                <Link href="/my-strategies" className="text-xs text-primary inline-flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3" />
                  Manage strategies
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Unread Alerts</p>
                <p className="text-2xl font-bold text-foreground mt-1">5</p>
                <Link href="/notifications" className="text-xs text-primary inline-flex items-center gap-1 mt-2">
                  <Bell className="w-3 h-3" />
                  View notifications
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Copied Strategies</CardTitle>
              <CardDescription>Quick performance snapshot of your active portfolio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {copiedStrategies.map((strategy) => (
                <div key={strategy.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <div>
                    <p className="font-medium text-foreground">{strategy.name}</p>
                    <p className="text-sm text-muted-foreground">Allocated: {strategy.amount}</p>
                  </div>
                  <span className={strategy.pnl.startsWith('-') ? 'text-destructive font-semibold' : 'text-primary font-semibold'}>
                    {strategy.pnl}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

