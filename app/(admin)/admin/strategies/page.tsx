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
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { AlertTriangle, Eye, Loader2, PauseCircle, SlidersHorizontal } from 'lucide-react'

type StrategyItem = {
  id: string
  name: string
  trader: string
  status: 'Active' | 'Review' | 'Paused'
  copiers: number
  roi: string
}

const initialStrategies: StrategyItem[] = [
  { id: 'STR-2201', name: 'Alpha Momentum', trader: 'Michael Chen', status: 'Active', copiers: 3420, roi: '+45.8%' },
  { id: 'STR-2202', name: 'Safe Haven', trader: 'Sarah Williams', status: 'Active', copiers: 5120, roi: '+22.4%' },
  { id: 'STR-2203', name: 'Scalp Master', trader: 'David Park', status: 'Review', copiers: 1890, roi: '+68.3%' },
]

export default function AdminStrategiesPage() {
  const { toast } = useToast()
  const [strategies, setStrategies] = useState(initialStrategies)
  const [ruleName, setRuleName] = useState('')
  const [isRuleDialogOpen, setIsRuleDialogOpen] = useState(false)
  const [isRuleSaving, setIsRuleSaving] = useState(false)
  const [selected, setSelected] = useState<StrategyItem | null>(null)
  const [isPauseDialogOpen, setIsPauseDialogOpen] = useState(false)
  const [isPausing, setIsPausing] = useState(false)
  const [pauseError, setPauseError] = useState('')

  const createRule = async () => {
    if (!ruleName.trim()) {
      toast({ title: 'Rule name required', description: 'Provide a name before creating a moderation rule.' })
      return
    }

    setIsRuleSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 700))
    setIsRuleSaving(false)
    setIsRuleDialogOpen(false)
    setRuleName('')
    toast({ title: 'Rule created', description: 'Moderation rule has been saved.' })
  }

  const openPauseDialog = (strategy: StrategyItem) => {
    setSelected(strategy)
    setPauseError('')
    setIsPauseDialogOpen(true)
  }

  const pauseStrategy = async () => {
    if (!selected) return

    setIsPausing(true)
    setPauseError('')
    await new Promise((resolve) => setTimeout(resolve, 900))

    if (selected.status === 'Review') {
      setPauseError('Strategy is already in review and cannot be paused until moderation is completed.')
      setIsPausing(false)
      return
    }

    setStrategies((current) =>
      current.map((item) => (item.id === selected.id ? { ...item, status: 'Paused' } : item))
    )
    setIsPausing(false)
    setIsPauseDialogOpen(false)
    toast({ title: 'Strategy paused', description: `${selected.name} is now paused.` })
  }

  return (
    <div className="space-y-6">
      <Toaster />

      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Strategy Management</h1>
          <p className="text-muted-foreground">Review, moderate, and control marketplace strategies.</p>
        </div>

        <Dialog open={isRuleDialogOpen} onOpenChange={setIsRuleDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Create Rule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create moderation rule</DialogTitle>
              <DialogDescription>Rules help automate strategy compliance checks.</DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="ruleName">Rule Name</Label>
              <Input id="ruleName" value={ruleName} onChange={(event) => setRuleName(event.target.value)} placeholder="Max drawdown > 20%" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRuleDialogOpen(false)}>Cancel</Button>
              <Button onClick={createRule} disabled={isRuleSaving}>
                {isRuleSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Save Rule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                  className={strategy.status === 'Active' ? 'border-primary/30 bg-primary/10 text-primary' : strategy.status === 'Paused' ? 'border-destructive/30 bg-destructive/10 text-destructive' : 'border-gold/30 bg-gold/10 text-gold'}
                >
                  {strategy.status}
                </Badge>
                <Badge variant="outline" className="border-border text-foreground">{strategy.roi}</Badge>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="gap-2" onClick={() => setSelected(strategy)}>
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{strategy.name}</DialogTitle>
                      <DialogDescription>{strategy.id} · by {strategy.trader}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 rounded-lg border border-border bg-background/50 p-4 text-sm">
                      <div className="flex items-center justify-between"><span className="text-muted-foreground">Current Status</span><span className="font-medium text-foreground">{strategy.status}</span></div>
                      <div className="flex items-center justify-between"><span className="text-muted-foreground">Copiers</span><span className="font-medium text-foreground">{strategy.copiers.toLocaleString()}</span></div>
                      <div className="flex items-center justify-between"><span className="text-muted-foreground">ROI</span><span className="font-medium text-foreground">{strategy.roi}</span></div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Close</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button size="sm" variant="outline" className="gap-2 text-destructive" onClick={() => openPauseDialog(strategy)}>
                  <PauseCircle className="w-4 h-4" />
                  Pause
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={isPauseDialogOpen} onOpenChange={setIsPauseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pause strategy</DialogTitle>
            <DialogDescription>
              {selected ? `Pause ${selected.name} for all copiers.` : 'Select a strategy first.'}
            </DialogDescription>
          </DialogHeader>

          {pauseError && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5" />
              <span>{pauseError}</span>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPauseDialogOpen(false)} disabled={isPausing}>Cancel</Button>
            <Button className="bg-destructive hover:bg-destructive/90" onClick={pauseStrategy} disabled={isPausing}>
              {isPausing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Confirm Pause
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
