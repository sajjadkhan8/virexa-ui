'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const commissionRows = [
  { id: 'FEE-441', source: 'Strategy Performance Fee', amount: '$12,480', share: '20%', status: 'Settled' },
  { id: 'REF-127', source: 'Referral Program Payout', amount: '$4,230', share: '30%', status: 'Pending' },
  { id: 'AFF-902', source: 'Affiliate Volume Bonus', amount: '$2,190', share: '10%', status: 'Settled' },
]

export default function AdminCommissionManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Commission Management</h1>
        <p className="text-muted-foreground">Audit strategy, referral, and affiliate commission settlements.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border"><CardContent className="p-4"><p className="text-sm text-muted-foreground">This Month Paid</p><p className="text-2xl font-bold text-primary">$42,300</p></CardContent></Card>
        <Card className="bg-card border-border"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Pending Settlement</p><p className="text-2xl font-bold text-gold">$8,120</p></CardContent></Card>
        <Card className="bg-card border-border"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Disputed Entries</p><p className="text-2xl font-bold text-destructive">3</p></CardContent></Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader><CardTitle>Recent Commission Events</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {commissionRows.map((row) => (
            <div key={row.id} className="rounded-xl border border-border bg-background/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-foreground">{row.source}</p>
                <p className="text-sm text-muted-foreground">{row.id} · Platform share {row.share}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">{row.amount}</p>
                <Badge
                  variant="outline"
                  className={row.status === 'Settled' ? 'border-primary/30 bg-primary/10 text-primary' : 'border-gold/30 bg-gold/10 text-gold'}
                >
                  {row.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

