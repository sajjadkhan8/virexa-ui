'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { AlertTriangle, Download, FileText, Loader2 } from 'lucide-react'

type ReportItem = {
  name: string
  period: string
  format: string
}

const sampleReports: ReportItem[] = [
  { name: 'Monthly Compliance Report', period: 'Apr 2026', format: 'PDF' },
  { name: 'KYC Decision Log', period: 'Apr 2026', format: 'CSV' },
  { name: 'Withdrawal Audit Trail', period: 'Apr 2026', format: 'CSV' },
]

export default function AdminReportsPage() {
  const { toast } = useToast()
  const [reports, setReports] = useState(sampleReports)
  const [selected, setSelected] = useState<ReportItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState('')

  const openDownloadDialog = (report: ReportItem) => {
    setSelected(report)
    setDownloadError('')
    setIsDialogOpen(true)
  }

  const downloadReport = async () => {
    if (!selected) return

    setIsDownloading(true)
    setDownloadError('')
    await new Promise((resolve) => setTimeout(resolve, 900))

    if (selected.name === 'KYC Decision Log') {
      setDownloadError('This report is still compiling. Please try again in a few minutes.')
      setIsDownloading(false)
      return
    }

    setIsDownloading(false)
    setIsDialogOpen(false)
    toast({ title: 'Export prepared', description: `${selected.name} is ready for download.` })
  }

  return (
    <div className="space-y-6">
      <Toaster />

      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground">Generate and export operational and compliance reports.</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader><CardTitle>Available Exports</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {reports.length === 0 ? (
            <Empty className="border border-dashed border-border bg-background/50">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FileText className="size-5" />
                </EmptyMedia>
                <EmptyTitle>No reports available</EmptyTitle>
                <EmptyDescription>There are no generated reports for the selected period.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" onClick={() => setReports(sampleReports)}>Reload Reports</Button>
              </EmptyContent>
            </Empty>
          ) : (
            reports.map((report) => (
              <div key={report.name} className="rounded-xl border border-border bg-background/50 p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.period} · {report.format}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => openDownloadDialog(report)}>
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download report</DialogTitle>
            <DialogDescription>
              {selected ? `${selected.name} · ${selected.period}` : 'Select a report first.'}
            </DialogDescription>
          </DialogHeader>

          {downloadError && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5" />
              <span>{downloadError}</span>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isDownloading}>Cancel</Button>
            <Button onClick={downloadReport} disabled={isDownloading}>
              {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Confirm Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
