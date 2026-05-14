'use client'

import { Button } from '@/components/ui/button'

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 text-center space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Something went wrong</h2>
        <p className="text-sm text-muted-foreground">We could not load this section right now. Please try again.</p>
        <Button onClick={reset} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Try Again
        </Button>
      </div>
    </div>
  )
}

