'use client'

import { motion } from 'framer-motion'
import { Users, DollarSign, TrendingUp, Gift, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const rewards = [
  { level: 'Level 1', percentage: '10%', description: 'Direct Referrals' },
  { level: 'Level 2', percentage: '5%', description: 'Indirect Referrals' },
  { level: 'Level 3', percentage: '2%', description: 'Extended Network' },
]

const commissionExamples = [
  { referrals: 10, volume: '$50,000', earnings: '$5,000' },
  { referrals: 50, volume: '$250,000', earnings: '$25,000' },
  { referrals: 100, volume: '$1,000,000', earnings: '$100,000' },
]

export function ReferralProgram() {
  return (
    <section id="referral" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <Gift className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold">Referral Program</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Earn Passive Income with{' '}
              <span className="text-gold">Multi-Level Rewards</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Build your team and earn commissions on every trade. Our multi-level referral system rewards you for growing the community.
            </p>

            {/* Reward Levels */}
            <div className="space-y-4 mb-8">
              {rewards.map((reward, index) => (
                <motion.div
                  key={reward.level}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10">
                    <span className="text-lg font-bold text-gold">{reward.percentage}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{reward.level}</p>
                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/register">
              <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 gap-2">
                Start Earning
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Right Content - Referral Tree Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Commission Examples */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-gold" />
                Commission Examples
              </h3>
              <div className="space-y-4">
                {commissionExamples.map((example, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{example.referrals}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{example.volume}</span>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-primary">{example.earnings}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Referral Tree */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Your Network</h3>
              <div className="flex flex-col items-center">
                {/* You */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                  YOU
                </div>
                <div className="w-0.5 h-6 bg-border" />
                
                {/* Level 1 */}
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-xs font-bold text-gold">
                      L1
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">10%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-xs font-bold text-gold">
                      L1
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">10%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-xs font-bold text-gold">
                      L1
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">10%</span>
                  </div>
                </div>
                <div className="w-0.5 h-4 bg-border" />
                
                {/* Level 2 */}
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs font-medium text-accent">
                        L2
                      </div>
                    </div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground mt-2">5% commission on Level 2</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
