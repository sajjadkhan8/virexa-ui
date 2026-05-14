'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, PauseCircle } from 'lucide-react'

const strategies = [
  { id: 'STR-2201', name: 'Alpha Momentum', trader: 'Michael Chen', status: 'Active', copiers: 3420, roi: '+45.8%' },
  { id: 'STR-2202', name: 'Safe Haven', trader: 'Sarah Williams', status: 'Active', copiers: 5120, roi: '+22.4%' },
  { id: 'STR-2203', name: 'Scalp Master', trader: 'David Park', status: 'Review', copiers: 1890, roi: '+68.3%' },
]

export default function AdminStrategiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Strategy Management</h1>
          <p className="text-muted-foreground">Review, moderate, and control marketplace strategies.</p>
        </div>
        <Button variant="outline">Create Rule</Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Listed Strategies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="rounded-xl border border-border bg-background/50 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <p className="font-medium text-foreground">{strategy.name}</p>
                <p className="text-sm text-muted-foreground">{strategy.id} · {strategy.trader} · {strategy.copiers.toLocaleString()} copiers</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={strategy.status === 'Active' ? 'border-primary/30 bg-primary/10 text-primary' : 'border-gold/30 bg-gold/10 text-gold'}
                >
                  {strategy.status}
                </Badge>
                <Badge variant="outline" className="border-border text-foreground">{strategy.roi}</Badge>
                <Button size="sm" variant="outline" className="gap-2"><Eye className="w-4 h-4" />View</Button>
                <Button size="sm" variant="outline" className="gap-2 text-destructive"><PauseCircle className="w-4 h-4" />Pause</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

