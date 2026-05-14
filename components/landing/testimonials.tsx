'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'James Wilson',
    role: 'Professional Trader',
    avatar: 'JW',
    content: 'Virexa.com has transformed how I manage my portfolio. The copy trading feature lets me follow top performers while I focus on my strategy.',
    rating: 5,
    profit: '+$24,500',
  },
  {
    name: 'Emily Chen',
    role: 'Retail Investor',
    avatar: 'EC',
    content: 'As a beginner, I was skeptical about forex trading. But copying experienced traders has helped me learn and earn simultaneously.',
    rating: 5,
    profit: '+$8,200',
  },
  {
    name: 'Michael Roberts',
    role: 'Affiliate Partner',
    avatar: 'MR',
    content: 'The referral program is incredible. I&apos;ve built a team of 200+ traders and earn consistent passive income every month.',
    rating: 5,
    profit: '+$15,800/mo',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Trusted by Traders Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our community has to say about their experience
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/10">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 relative z-10">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{testimonial.profit}</p>
                  <p className="text-xs text-muted-foreground">Profit</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
