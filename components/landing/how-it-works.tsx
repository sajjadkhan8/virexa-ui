'use client'

import { motion } from 'framer-motion'
import { Wallet, Search, Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const steps = [
  {
    icon: Wallet,
    title: 'Deposit Funds',
    description: 'Fund your wallet with USDT or local payment methods. Quick, secure, and hassle-free deposits.',
    color: 'from-primary/20 to-primary/5',
    borderColor: 'border-primary/30',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: Search,
    title: 'Choose Strategy',
    description: 'Browse our marketplace of verified traders. Analyze performance, risk levels, and historical returns.',
    color: 'from-accent/20 to-accent/5',
    borderColor: 'border-accent/30',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  {
    icon: Zap,
    title: 'Start Copy Trading',
    description: 'Allocate funds and let automation handle the rest. Mirror professional trades in real-time.',
    color: 'from-gold/20 to-gold/5',
    borderColor: 'border-gold/30',
    iconBg: 'bg-gold/10',
    iconColor: 'text-gold',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with our simple three-step process
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-border via-primary/30 to-border" />
              )}

              <div className={`relative bg-gradient-to-b ${step.color} border ${step.borderColor} rounded-2xl p-8 text-center`}>
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-sm font-bold text-primary">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${step.iconBg} mb-6`}>
                  <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/register">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-12 px-8">
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
