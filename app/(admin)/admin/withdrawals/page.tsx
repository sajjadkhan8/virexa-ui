'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const queue = [
  { id: 'WD-9001', user: 'John Doe', amount: '$5,420', method: 'Bank Transfer', risk: 'Medium' },
  { id: 'WD-9002', user: 'Sarah Kim', amount: '$2,150', method: 'USDT TRC20', risk: 'Low' },
  { id: 'WD-9003', user: 'Mike Chen', amount: '$8,900', method: 'Bank Transfer', risk: 'High' },
]

export default function AdminWithdrawalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Withdrawal Approvals</h1>
        <p className="text-muted-foreground">Approve or reject payout requests with risk context.</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Approval Queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {queue.map((item) => (
            <div key={item.id} className="rounded-xl border border-border bg-background/50 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div>
                <p className="font-medium text-foreground">{item.user}</p>
                <p className="text-sm text-muted-foreground">{item.id} · {item.method}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">{item.amount}</p>
                <Badge
                  variant="outline"
                  className={
                    item.risk === 'High'
                      ? 'border-destructive/30 bg-destructive/10 text-destructive'
                      : item.risk === 'Medium'
                      ? 'border-gold/30 bg-gold/10 text-gold'
                      : 'border-primary/30 bg-primary/10 text-primary'
                  }
                >
                  {item.risk} risk
                </Badge>
                <Button size="sm" variant="outline" className="text-destructive">Reject</Button>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Approve</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

