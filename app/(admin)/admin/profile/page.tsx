'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function AdminProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Profile</h1>
        <p className="text-muted-foreground">Administrator account details and access level.</p>
      </div>

      <Card className="bg-card border-border max-w-2xl">
        <CardHeader>
          <CardTitle>Profile Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-accent/20 text-accent font-semibold">AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">Admin User</p>
              <p className="text-sm text-muted-foreground">admin@virexa.com</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <Badge variant="outline" className="mt-1 border-primary/30 bg-primary/10 text-primary">Super Admin</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Login</p>
              <p className="text-sm font-medium text-foreground mt-1">May 15, 2026 · 09:42 UTC</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

