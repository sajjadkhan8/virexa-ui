'use client'

import { Users } from 'lucide-react'

interface TraderCardProps {
  name: string
  avatar: string
  roi: number
  followers: number
  risk: 'Low' | 'Medium' | 'High'
}

export function TraderCard({ name, avatar, roi, followers, risk }: TraderCardProps) {
  const riskColors = {
    Low: 'text-primary bg-primary/10',
    Medium: 'text-gold bg-gold/10',
    High: 'text-destructive bg-destructive/10',
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-xl w-56">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <span className={`text-xs px-2 py-0.5 rounded-full ${riskColors[risk]}`}>
            {risk} Risk
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">ROI</p>
          <p className="text-lg font-bold text-primary">+{roi}%</p>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-sm">{followers.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
