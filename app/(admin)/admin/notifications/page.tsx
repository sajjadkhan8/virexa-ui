'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell } from 'lucide-react'

const events = [
  { id: 1, title: 'KYC queue exceeded SLA', detail: '18 applications pending beyond 12h target.', type: 'Urgent' },
  { id: 2, title: 'Large withdrawal flagged', detail: 'Request WD-9003 requires secondary approval.', type: 'Review' },
  { id: 3, title: 'System health stable', detail: 'No incident detected across wallet services.', type: 'Info' },
]

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Notifications</h1>
        <p className="text-muted-foreground">Operational alerts and system events.</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5 text-primary" />Event Feed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="rounded-xl border border-border bg-background/50 p-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-foreground">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.detail}</p>
              </div>
              <Badge
                variant="outline"
                className={
                  event.type === 'Urgent'
                    ? 'border-destructive/30 bg-destructive/10 text-destructive'
                    : event.type === 'Review'
                    ? 'border-gold/30 bg-gold/10 text-gold'
                    : 'border-primary/30 bg-primary/10 text-primary'
                }
              >
                {event.type}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

