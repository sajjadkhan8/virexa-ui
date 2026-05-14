'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Users, ChevronRight } from 'lucide-react'

const levels = [
  {
    level: 'Level 1',
    commission: '20%',
    users: [
      { name: 'Sarah Chen', active: true, volume: '$18,420' },
      { name: 'Ahmed Malik', active: true, volume: '$9,840' },
    ],
  },
  {
    level: 'Level 2',
    commission: '8%',
    users: [
      { name: 'David Park', active: true, volume: '$4,920' },
      { name: 'Emma Stone', active: false, volume: '$1,120' },
    ],
  },
  {
    level: 'Level 3',
    commission: '3%',
    users: [{ name: 'Mia Wong', active: true, volume: '$680' }],
  },
]

export default function ReferralTreePage() {
  return (
    <div className="space-y-6">
      <Link href="/referrals" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" />
        Back to Referrals
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Referral Tree</h1>
        <p className="text-muted-foreground">Track your referral network by level and activity.</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Network</p>
            <p className="text-2xl font-bold text-foreground mt-1">47 Users</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active This Month</p>
            <p className="text-2xl font-bold text-primary mt-1">32 Users</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Generated Volume</p>
            <p className="text-2xl font-bold text-foreground mt-1">$34,980</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {levels.map((level, index) => (
          <motion.div
            key={level.level}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">{level.level}</CardTitle>
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                  {level.commission} commission
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {level.users.map((user) => (
                  <div key={user.name} className="flex items-center justify-between rounded-xl bg-secondary/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-bold flex items-center justify-center">
                        {user.name.split(' ').map((part) => part[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">Volume: {user.volume}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={user.active ? 'border-primary/30 bg-primary/10 text-primary' : 'border-border text-muted-foreground'}
                      >
                        {user.active ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end">
        <Link href="/referrals/commissions">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
            <Users className="w-4 h-4" />
            View Commission Ledger
          </Button>
        </Link>
      </div>
    </div>
  )
}

