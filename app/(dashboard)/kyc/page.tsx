'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Upload, ShieldCheck, CircleAlert, CheckCircle2 } from 'lucide-react'

export default function KycOnboardingPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">KYC Verification</h1>
        <p className="text-muted-foreground">Verify your identity to unlock full trading and withdrawal limits.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle>Identity Verification Form</CardTitle>
            <CardDescription>Submit legal identity information and supporting documents.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" className="bg-secondary border-border" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="United States" className="bg-secondary border-border" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="document">Document Number</Label>
              <Input id="document" placeholder="Passport or National ID number" className="bg-secondary border-border" />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Upload Documents</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl border-2 border-dashed border-border p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-foreground">ID Front</p>
                  <p className="text-xs text-muted-foreground">PNG/JPG up to 10MB</p>
                </div>
                <div className="rounded-xl border-2 border-dashed border-border p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-foreground">Selfie Verification</p>
                  <p className="text-xs text-muted-foreground">PNG/JPG up to 10MB</p>
                </div>
              </div>
            </div>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setSubmitted(true)}>
              Submit Verification
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="space-y-2">
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                    Under Review
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Your submission is being reviewed. Most checks complete within 24 hours.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Badge variant="outline" className="border-gold/30 text-gold bg-gold/10">
                    Not Submitted
                  </Badge>
                  <p className="text-sm text-muted-foreground">Complete the form to start verification.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Why Verify?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="flex items-start gap-2 text-muted-foreground">
                <ShieldCheck className="w-4 h-4 mt-0.5 text-primary" />
                Increased account security and fraud protection.
              </p>
              <p className="flex items-start gap-2 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary" />
                Higher daily withdrawal and deposit limits.
              </p>
              <p className="flex items-start gap-2 text-muted-foreground">
                <CircleAlert className="w-4 h-4 mt-0.5 text-gold" />
                Required for full access to all wallet operations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

