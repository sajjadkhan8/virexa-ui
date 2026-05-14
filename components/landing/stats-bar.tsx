'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '50,000+',
    label: 'Active Traders',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: TrendingUp,
    value: '$2.4B',
    label: 'Total Volume',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: DollarSign,
    value: '$48M',
    label: 'Total Payouts',
    color: 'text-gold',
    bgColor: 'bg-gold/10',
  },
  {
    icon: Activity,
    value: '1,200+',
    label: 'Active Strategies',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
]

export function StatsBar() {
  return (
    <section className="py-12 border-y border-border bg-card/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
