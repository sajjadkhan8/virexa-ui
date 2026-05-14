'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react'

type WithdrawalItem = {
  id: string
  user: string
  amount: string
  method: string
  risk: 'Low' | 'Medium' | 'High'
}

type ActionMode = 'approve' | 'reject'

const initialQueue: WithdrawalItem[] = [
  { id: 'WD-9001', user: 'John Doe', amount: '$5,420', method: 'Bank Transfer', risk: 'Medium' },
  { id: 'WD-9002', user: 'Sarah Kim', amount: '$2,150', method: 'USDT TRC20', risk: 'Low' },
  { id: 'WD-9003', user: 'Mike Chen', amount: '$8,900', method: 'Bank Transfer', risk: 'High' },
]

export default function AdminWithdrawalsPage() {
  const { toast } = useToast()
  const [queue, setQueue] = useState(initialQueue)
  const [selected, setSelected] = useState<WithdrawalItem | null>(null)
  const [actionMode, setActionMode] = useState<ActionMode>('approve')
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [actionError, setActionError] = useState('')

  const openActionDialog = (item: WithdrawalItem, mode: ActionMode) => {
    setSelected(item)
    setActionMode(mode)
    setActionError('')
    setIsOpen(true)
  }

  const handleConfirm = async () => {
    if (!selected) return

    setIsSubmitting(true)
    setActionError('')
    await new Promise((resolve) => setTimeout(resolve, 900))

    if (selected.risk === 'High' && actionMode === 'approve') {
      setActionError('High-risk withdrawals require secondary compliance approval before final approval.')
      setIsSubmitting(false)
      return
    }

    setQueue((current) => current.filter((item) => item.id !== selected.id))
    setIsSubmitting(false)
    setIsOpen(false)
    toast({
      title: actionMode === 'approve' ? 'Withdrawal approved' : 'Withdrawal rejected',
      description: `${selected.id} has been ${actionMode === 'approve' ? 'approved' : 'rejected'} successfully.`,
    })
  }

  return (
    <div className="space-y-6">
      <Toaster />

      <div>
        <h1 className="text-2xl font-bold text-foreground">Withdrawal Approvals</h1>
        <p className="text-muted-foreground">Approve or reject payout requests with risk context.</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Approval Queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {queue.length === 0 ? (
            <Empty className="border border-dashed border-border bg-background/50">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CheckCircle2 className="size-5" />
                </EmptyMedia>
                <EmptyTitle>Queue is clear</EmptyTitle>
                <EmptyDescription>No withdrawal requests are awaiting action right now.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" onClick={() => setQueue(initialQueue)}>Reload Sample Queue</Button>
              </EmptyContent>
            </Empty>
          ) : (
            queue.map((item) => (
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
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => openActionDialog(item, 'reject')}>
                    Reject
                  </Button>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => openActionDialog(item, 'approve')}>
                    Approve
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionMode === 'approve' ? 'Approve withdrawal' : 'Reject withdrawal'}</DialogTitle>
            <DialogDescription>
              {selected ? `${selected.id} · ${selected.user} · ${selected.amount}` : 'Select a request first.'}
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="rounded-lg border border-border bg-background/50 p-4 text-sm space-y-2">
              <p className="text-muted-foreground">Method: <span className="text-foreground font-medium">{selected.method}</span></p>
              <p className="text-muted-foreground">Risk: <span className="text-foreground font-medium">{selected.risk}</span></p>
            </div>
          )}

          {actionError && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5" />
              <span>{actionError}</span>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className={actionMode === 'reject' ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'}
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {actionMode === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
