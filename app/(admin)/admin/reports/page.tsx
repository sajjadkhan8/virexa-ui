'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download } from 'lucide-react'

const reports = [
  { name: 'Monthly Compliance Report', period: 'Apr 2026', format: 'PDF' },
  { name: 'KYC Decision Log', period: 'Apr 2026', format: 'CSV' },
  { name: 'Withdrawal Audit Trail', period: 'Apr 2026', format: 'CSV' },
]

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground">Generate and export operational and compliance reports.</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader><CardTitle>Available Exports</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {reports.map((report) => (
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
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

