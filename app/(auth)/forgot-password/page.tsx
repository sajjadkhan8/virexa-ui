'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <Image
            src="/Virexa_App_Icon.png"
            alt="Virexa logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl border border-primary/20"
          />
          <span className="text-xl font-bold text-foreground">Virexa<span className="text-primary">.com</span></span>
        </Link>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h1>
              <p className="text-muted-foreground mb-6">
                We sent a password reset link to{' '}
                <span className="text-foreground">{email}</span>
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Didn&apos;t receive the email? Check your spam folder or{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary hover:underline"
                >
                  try again
                </button>
              </p>
              <Link href="/login">
                <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                  Back to Login
                </Button>
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">Forgot Password?</h1>
                <p className="text-muted-foreground">
                  No worries, we&apos;ll send you reset instructions
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 bg-secondary border-border"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {/* Back Link */}
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
