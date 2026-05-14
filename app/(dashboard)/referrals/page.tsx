"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Copy, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Share2, 
  Gift,
  Check,
  Twitter,
  Facebook,
  Mail,
  MessageCircle
} from "lucide-react"
import { ReferralStats } from "@/components/referrals/referral-stats"
import { ReferralTiers } from "@/components/referrals/referral-tiers"
import { ReferralHistory } from "@/components/referrals/referral-history"
import { ReferredUsers } from "@/components/referrals/referred-users"

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false)
  const referralCode = "TRADER2024XYZ"
  const referralLink = `https://forextrade.com/ref/${referralCode}`

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Referral Program</h1>
        <p className="text-muted-foreground">Invite friends and earn commissions on their trading activity</p>
      </div>

      <ReferralStats />

      {/* Referral Link Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-accent" />
              Your Referral Link
            </CardTitle>
            <CardDescription>
              Share your unique referral link and earn 30% commission on trading fees
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Input 
                  value={referralLink}
                  readOnly
                  className="bg-background/50 border-border pr-24"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => handleCopy(referralLink)}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="shrink-0">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="shrink-0">
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Your Code:</span>
                <Badge variant="outline" className="font-mono">{referralCode}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() => handleCopy(referralCode)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <ReferralTiers />

      <Tabs defaultValue="referrals" className="space-y-4">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="referrals">Referred Users</TabsTrigger>
          <TabsTrigger value="history">Commission History</TabsTrigger>
        </TabsList>

        <TabsContent value="referrals">
          <ReferredUsers />
        </TabsContent>

        <TabsContent value="history">
          <ReferralHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
