'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react'

const steps = [
  { id: 1, title: 'Complete profile', description: 'Set up your personal and contact information.', href: '/settings' },
  { id: 2, title: 'Verify identity (KYC)', description: 'Unlock full account limits and secure withdrawals.', href: '/kyc' },
  { id: 3, title: 'Fund your wallet', description: 'Make your first deposit to start copy trading.', href: '/wallet/deposit' },
  { id: 4, title: 'Start copy trading', description: 'Choose a strategy and allocate your copy amount.', href: '/marketplace' },
]

export default function OnboardingPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1])

  const toggleStep = (id: number) => {
    setCompletedSteps((current) =>
      current.includes(id) ? current.filter((step) => step !== id) : [...current, id]
    )
  }

  const progress = Math.round((completedSteps.length / steps.length) * 100)

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Getting Started</h1>
        <p className="text-muted-foreground">Finish onboarding to activate your full trading workflow.</p>
      </motion.div>

      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Onboarding Checklist</CardTitle>
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            {progress}% complete
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {steps.map((step) => {
            const completed = completedSteps.includes(step.id)
            return (
              <div key={step.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-secondary/50 p-4">
                <button
                  onClick={() => toggleStep(step.id)}
                  className="flex items-start gap-3 text-left"
                  type="button"
                >
                  {completed ? (
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground mt-0.5" />
                  )}
                  <span>
                    <span className="block font-medium text-foreground">{step.title}</span>
                    <span className="block text-sm text-muted-foreground">{step.description}</span>
                  </span>
                </button>
                <Link href={step.href}>
                  <Button variant="outline" size="sm" className="gap-1">
                    Open
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )
          })}

          <Link href="/dashboard">
            <Button className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Go to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

