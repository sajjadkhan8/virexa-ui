'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, FileCheck, Server } from 'lucide-react'

const features = [
  {
    icon: FileCheck,
    title: 'KYC Verified',
    description: 'All traders undergo thorough identity verification to ensure platform integrity.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Lock,
    title: 'Encrypted Systems',
    description: 'Bank-grade 256-bit encryption protects all your data and transactions.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Shield,
    title: 'Secure Withdrawals',
    description: 'Multi-factor authentication and whitelisting keep your funds safe.',
    color: 'text-gold',
    bgColor: 'bg-gold/10',
  },
  {
    icon: Server,
    title: 'Broker Integration',
    description: 'Direct integration with regulated brokers for seamless trade execution.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
]

export function TrustSecurity() {
  return (
    <section className="py-20 lg:py-28 bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Security You Can Trust
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your security is our top priority. We employ industry-leading measures to protect your assets.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 text-center card-hover"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.bgColor} mb-4`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-12 border-t border-border"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="w-5 h-5" />
            <span className="text-sm font-medium">2FA Protected</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileCheck className="w-5 h-5" />
            <span className="text-sm font-medium">Audited Platform</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Server className="w-5 h-5" />
            <span className="text-sm font-medium">99.9% Uptime</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
