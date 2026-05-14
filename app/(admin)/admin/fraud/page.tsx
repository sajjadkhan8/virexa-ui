'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const alerts = [
  { id: 'FR-101', user: 'alex@email.com', reason: 'Rapid withdrawal after first deposit', severity: 'High' },
  { id: 'FR-102', user: 'maria@email.com', reason: 'Multiple accounts from same device', severity: 'Medium' },
  { id: 'FR-103', user: 'ken@email.com', reason: 'Unusual referral payout pattern', severity: 'Low' },
]

export default function AdminFraudMonitoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Fraud Monitoring</h1>
        <p className="text-muted-foreground">Review suspicious account and transaction behavior.</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader><CardTitle>Open Alerts</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="rounded-xl border border-border bg-background/50 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div>
                <p className="font-medium text-foreground">{alert.reason}</p>
                <p className="text-sm text-muted-foreground">{alert.id} · {alert.user}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={
                    alert.severity === 'High'
                      ? 'border-destructive/30 bg-destructive/10 text-destructive'
                      : alert.severity === 'Medium'
                      ? 'border-gold/30 bg-gold/10 text-gold'
                      : 'border-primary/30 bg-primary/10 text-primary'
                  }
                >
                  {alert.severity}
                </Badge>
                <Button size="sm" variant="outline">Investigate</Button>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Resolve</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

