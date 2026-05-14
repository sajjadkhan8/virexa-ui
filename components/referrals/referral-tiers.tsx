"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Crown, Star, Award, Medal } from "lucide-react"

const tiers = [
  {
    name: "Bronze",
    icon: Medal,
    commission: "20%",
    requirement: "0-10 referrals",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/30"
  },
  {
    name: "Silver",
    icon: Award,
    commission: "25%",
    requirement: "11-25 referrals",
    color: "text-gray-400",
    bgColor: "bg-gray-400/10",
    borderColor: "border-gray-400/30"
  },
  {
    name: "Gold",
    icon: Star,
    commission: "30%",
    requirement: "26-50 referrals",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    current: true
  },
  {
    name: "Platinum",
    icon: Crown,
    commission: "35%",
    requirement: "50+ referrals",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30"
  }
]

export function ReferralTiers() {
  const currentReferrals = 47
  const nextTierRequirement = 50
  const progress = (currentReferrals / nextTierRequirement) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Commission Tiers</CardTitle>
              <CardDescription>
                Earn higher commissions as you refer more traders
              </CardDescription>
            </div>
            <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
              <Star className="h-3 w-3 mr-1" />
              Gold Tier
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress to next tier */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress to Platinum</span>
              <span className="font-medium text-foreground">{currentReferrals}/{nextTierRequirement} referrals</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {nextTierRequirement - currentReferrals} more referrals to unlock 35% commission
            </p>
          </div>

          {/* Tiers grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-4 rounded-lg border ${tier.current ? tier.borderColor + ' ' + tier.bgColor : 'border-border bg-background/50'} transition-all`}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`p-2 rounded-full ${tier.bgColor}`}>
                    <tier.icon className={`h-5 w-5 ${tier.color}`} />
                  </div>
                  <div>
                    <p className={`font-semibold ${tier.current ? tier.color : 'text-foreground'}`}>
                      {tier.name}
                    </p>
                    <p className="text-2xl font-bold text-foreground">{tier.commission}</p>
                    <p className="text-xs text-muted-foreground">{tier.requirement}</p>
                  </div>
                  {tier.current && (
                    <Badge variant="outline" className="text-xs">Current</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
