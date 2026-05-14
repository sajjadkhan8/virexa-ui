'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Settings</h1>
        <p className="text-muted-foreground">Configure operational defaults and controls.</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader><CardTitle>Platform Controls</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">Auto-flag high-risk withdrawals</Label>
              <p className="text-sm text-muted-foreground">Require secondary approval over configured threshold.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">KYC strict mode</Label>
              <p className="text-sm text-muted-foreground">Enable enhanced checks for document mismatch patterns.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">Trader listing auto-review</Label>
              <p className="text-sm text-muted-foreground">Queue new strategies for manual moderation before publish.</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

