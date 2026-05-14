"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Shield, 
  Bell, 
  Key,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Upload,
  Check
} from "lucide-react"

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") ?? "profile"
  const [showApiKey, setShowApiKey] = useState(false)
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY ?? ""
  const hasStripeKey = Boolean(stripeKey)
  const maskedStripeKey = stripeKey
    ? `${stripeKey.slice(0, 7)}${"•".repeat(Math.max(stripeKey.length - 11, 4))}${stripeKey.slice(-4)}`
    : "Set NEXT_PUBLIC_STRIPE_KEY in .env.local"
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    trades: true,
    marketing: false
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security</p>
      </div>

      <Tabs defaultValue={activeTab} className="space-y-6">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Key className="h-4 w-4" />
            API
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal details and public profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/avatars/user.jpg" />
                    <AvatarFallback className="bg-accent/20 text-accent text-xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 234 567 8900" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio"
                      className="w-full min-h-[100px] px-3 py-2 rounded-md border border-border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                      defaultValue="Experienced trader with 5+ years in forex markets. Specializing in EUR/USD and GBP/USD pairs."
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-accent hover:bg-accent/90">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-accent hover:bg-accent/90">
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Smartphone className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Authenticator App</p>
                      <p className="text-sm text-muted-foreground">Use an app like Google Authenticator</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                    <Check className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email Verification</p>
                      <p className="text-sm text-muted-foreground">Receive codes via email</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium text-foreground">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium text-foreground">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium text-foreground">Trade Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified when trades are executed</p>
                    </div>
                    <Switch 
                      checked={notifications.trades}
                      onCheckedChange={(checked) => setNotifications({...notifications, trades: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium text-foreground">Marketing Emails</p>
                      <p className="text-sm text-muted-foreground">Receive news, updates and promotions</p>
                    </div>
                    <Switch 
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Stripe Configuration</CardTitle>
                <CardDescription>
                  Manage your Stripe publishable key through environment configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg border border-border bg-background/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Stripe Publishable Key</p>
                      <p className="text-sm text-muted-foreground">Loaded from NEXT_PUBLIC_STRIPE_KEY</p>
                    </div>
                    <Badge variant="outline" className={hasStripeKey ? "border-green-500/30 text-green-500" : "border-amber-500/30 text-amber-500"}>
                      {hasStripeKey ? "Configured" : "Missing"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="text"
                      value={showApiKey && hasStripeKey ? stripeKey : maskedStripeKey}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setShowApiKey(!showApiKey)}
                      disabled={!hasStripeKey}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Add <code className="font-mono">NEXT_PUBLIC_STRIPE_KEY</code> to your <code className="font-mono">.env.local</code> file.
                  </p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Key className="h-4 w-4" />
                  Update Environment Key
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
