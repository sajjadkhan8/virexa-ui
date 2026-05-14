"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useIsMobile } from "@/hooks/use-mobile"
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
  AlertTriangle,
  Loader2,
  Copy,
  Wallet,
  ArrowRight,
  QrCode,
  Globe,
  Link2,
  Trash2,
  Activity,
  BadgeCheck,
  Lock,
  Bot,
  Save,
  ExternalLink,
} from "lucide-react"

type ProfileFormState = {
  fullName: string
  username: string
  nickname: string
  email: string
  phone: string
  country: string
  timezone: string
  language: string
  dateFormat: string
  bio: string
}

type SaveState = "idle" | "saving" | "saved" | "error"
type ChannelKey = "push" | "email" | "sms" | "telegram"

type ApiKeyItem = {
  id: string
  name: string
  key: string
  permissions: string[]
  createdAt: string
  lastUsed: string
}

const initialProfileState: ProfileFormState = {
  fullName: "John Doe",
  username: "johndoe_fx",
  nickname: "JD Momentum",
  email: "john.doe@email.com",
  phone: "+1 234 567 8900",
  country: "United States",
  timezone: "UTC-05:00 (New York)",
  language: "English",
  dateFormat: "MM/DD/YYYY",
  bio: "Experienced trader with 5+ years in forex markets. Specializing in EUR/USD and GBP/USD pairs.",
}

const verificationItems = [
  { key: "identity", label: "Identity Verification", status: "approved", updatedAt: "May 11, 2026" },
  { key: "address", label: "Address Verification", status: "pending", updatedAt: "May 12, 2026" },
  { key: "selfie", label: "Selfie Verification", status: "not_started", updatedAt: "Not submitted" },
] as const

const loginActivityRows = [
  {
    id: "1",
    time: "May 15, 2026 · 09:42 UTC",
    ip: "192.168.1.12",
    device: "MacBook Pro · Chrome 136",
    location: "New York, US",
    status: "Current",
  },
  {
    id: "2",
    time: "May 14, 2026 · 22:10 UTC",
    ip: "185.44.22.16",
    device: "iPhone 15 · Safari",
    location: "Toronto, CA",
    status: "Trusted",
  },
  {
    id: "3",
    time: "May 13, 2026 · 07:30 UTC",
    ip: "77.21.11.92",
    device: "Windows · Edge",
    location: "London, UK",
    status: "Reviewed",
  },
]

const notificationEventRows = [
  { key: "tradeOpened", label: "Trade Opened" },
  { key: "tradeClosed", label: "Trade Closed" },
  { key: "stopLoss", label: "Stop Loss Hit" },
  { key: "takeProfit", label: "Take Profit Hit" },
  { key: "referralCommission", label: "Referral Commissions" },
  { key: "deposit", label: "Deposits" },
  { key: "withdrawal", label: "Withdrawals" },
  { key: "kycUpdates", label: "KYC Updates" },
  { key: "security", label: "Security Alerts" },
  { key: "promotions", label: "Promotions/Newsletters" },
] as const

const defaultNotificationPrefs: Record<string, Record<ChannelKey, boolean>> = {
  tradeOpened: { push: true, email: true, sms: false, telegram: false },
  tradeClosed: { push: true, email: true, sms: false, telegram: false },
  stopLoss: { push: true, email: true, sms: true, telegram: false },
  takeProfit: { push: true, email: true, sms: false, telegram: false },
  referralCommission: { push: true, email: true, sms: false, telegram: false },
  deposit: { push: true, email: true, sms: false, telegram: false },
  withdrawal: { push: true, email: true, sms: true, telegram: false },
  kycUpdates: { push: true, email: true, sms: false, telegram: false },
  security: { push: true, email: true, sms: true, telegram: false },
  promotions: { push: false, email: true, sms: false, telegram: false },
}

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const isMobile = useIsMobile()

  const [isPageLoading, setIsPageLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") ?? "profile")

  const [profileForm, setProfileForm] = useState<ProfileFormState>(initialProfileState)
  const [profileErrors, setProfileErrors] = useState<Partial<Record<keyof ProfileFormState, string>>>({})
  const [profileSaveState, setProfileSaveState] = useState<SaveState>("idle")

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ current: "", next: "", confirm: "" })
  const [passwordSaveState, setPasswordSaveState] = useState<SaveState>("idle")

  const [securityToggles, setSecurityToggles] = useState({
    twoFactorEnabled: true,
    loginAlerts: true,
    suspiciousLoginDetection: true,
    withdrawWhitelist: true,
  })

  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([
    {
      id: "key-1",
      name: "Trading Bot",
      key: "vrx_live_21fe38f9ab1cd2",
      permissions: ["trades:read", "trades:write", "webhook:read"],
      createdAt: "May 08, 2026",
      lastUsed: "2 hours ago",
    },
  ])
  const [createApiModalOpen, setCreateApiModalOpen] = useState(false)
  const [newApiName, setNewApiName] = useState("")
  const [newApiPermissions, setNewApiPermissions] = useState<string[]>(["trades:read"])

  const [notificationPrefs, setNotificationPrefs] = useState(defaultNotificationPrefs)
  const [notificationSaveState, setNotificationSaveState] = useState<SaveState>("idle")

  const [tradingPrefs, setTradingPrefs] = useState({
    defaultLeverage: "10x",
    riskProfile: "balanced",
    maxDailyLoss: [6],
    autoStopLossProtection: true,
    autoCopy: true,
    defaultCopyAllocation: [35],
    slippageTolerance: [1],
    preferredPairs: ["EUR/USD", "GBP/USD", "XAU/USD"],
  })
  const [tradingSaveState, setTradingSaveState] = useState<SaveState>("idle")

  const [payoutPrefs, setPayoutPrefs] = useState({
    primaryMethod: "trc20",
    trc20: "TXqHVnMQp6w9K1j8z3v5xGhF2nRtLw9pYm",
    erc20: "0x3f13E35D3f2788ce69fA4A902dB3efAa145D90f2",
    bep20: "0x7A16f28D6Bf6BaA9C54A34dA9dcb6A9097A0A411",
    btc: "bc1q7xk6s3z8d8wf3rsl7qdgr8p0cxm3f2x4x7w0u2",
    easypaisa: "03001234567",
    jazzcash: "03007654321",
    accountTitle: "John Doe",
    bankName: "Global Trade Bank",
    iban: "GB29NWBK60161331926819",
    swift: "NWBKGB2L",
    branchCode: "0123",
    whitelistOnly: true,
  })
  const [payoutSaveState, setPayoutSaveState] = useState<SaveState>("idle")

  const [referralSettings, setReferralSettings] = useState({
    customCode: "TRADER2024XYZ",
    payoutDestination: "wallet",
    affiliateVisibility: true,
    commissionAutoPayout: true,
  })
  const [referralSaveState, setReferralSaveState] = useState<SaveState>("idle")

  const [privacySettings, setPrivacySettings] = useState({
    publicTraderProfile: true,
    leaderboardVisibility: true,
    profileVisibility: true,
    hideBalances: false,
    hideTradingHistory: false,
    dataSharing: false,
  })

  const [appearanceSettings, setAppearanceSettings] = useState({
    mode: "system",
    compactMode: false,
    accent: "emerald",
    dashboardDensity: "comfortable",
    chartStyle: "candles",
  })

  const [deleteConfirmText, setDeleteConfirmText] = useState("")

  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY ?? ""
  const hasStripeKey = Boolean(stripeKey)
  const maskedStripeKey = stripeKey
    ? `${stripeKey.slice(0, 7)}${"*".repeat(Math.max(stripeKey.length - 11, 4))}${stripeKey.slice(-4)}`
    : "Set NEXT_PUBLIC_STRIPE_KEY in .env.local"

  const isProfileDirty = useMemo(() => JSON.stringify(profileForm) !== JSON.stringify(initialProfileState), [profileForm])

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const nextTab = searchParams.get("tab")
    if (nextTab) {
      setActiveTab(nextTab)
    }
  }, [searchParams])

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isProfileDirty) return
      event.preventDefault()
      event.returnValue = ""
    }

    window.addEventListener("beforeunload", onBeforeUnload)
    return () => window.removeEventListener("beforeunload", onBeforeUnload)
  }, [isProfileDirty])

  const copyToClipboard = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value)
      toast({ title: `${label} copied`, description: "Value copied to clipboard successfully." })
    } catch {
      toast({ title: "Copy failed", description: "Could not copy this value. Try again." })
    }
  }

  const validateProfile = () => {
    const nextErrors: Partial<Record<keyof ProfileFormState, string>> = {}

    if (!profileForm.fullName.trim()) nextErrors.fullName = "Full name is required"
    if (!profileForm.username.trim()) nextErrors.username = "Username is required"
    if (!/^[a-zA-Z0-9_.-]{3,20}$/.test(profileForm.username)) {
      nextErrors.username = "Use 3-20 chars: letters, numbers, _, ., -"
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email)) {
      nextErrors.email = "Enter a valid email address"
    }
    if (!/^\+?[0-9\s-]{8,20}$/.test(profileForm.phone)) {
      nextErrors.phone = "Enter a valid phone number"
    }

    setProfileErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const saveProfile = async () => {
    if (!validateProfile()) {
      setProfileSaveState("error")
      return
    }

    setProfileSaveState("saving")
    await new Promise((resolve) => setTimeout(resolve, 900))
    setProfileSaveState("saved")
    toast({ title: "Profile updated", description: "Your account profile preferences were saved." })
  }

  const saveNotifications = async () => {
    setNotificationSaveState("saving")
    await new Promise((resolve) => setTimeout(resolve, 700))
    setNotificationSaveState("saved")
    toast({ title: "Notification preferences updated" })
  }

  const saveTradingSettings = async () => {
    setTradingSaveState("saving")
    await new Promise((resolve) => setTimeout(resolve, 700))
    setTradingSaveState("saved")
    toast({ title: "Trading settings updated" })
  }

  const savePayoutSettings = async () => {
    setPayoutSaveState("saving")
    await new Promise((resolve) => setTimeout(resolve, 700))
    setPayoutSaveState("saved")
    toast({ title: "Payout preferences updated" })
  }

  const saveReferralSettings = async () => {
    setReferralSaveState("saving")
    await new Promise((resolve) => setTimeout(resolve, 700))
    setReferralSaveState("saved")
    toast({ title: "Referral settings updated" })
  }

  const updatePassword = async () => {
    if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
      setPasswordSaveState("error")
      toast({ title: "Missing fields", description: "Complete all password fields first." })
      return
    }

    if (passwordForm.next.length < 8) {
      setPasswordSaveState("error")
      toast({ title: "Weak password", description: "Use at least 8 characters." })
      return
    }

    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordSaveState("error")
      toast({ title: "Mismatch", description: "New password and confirmation do not match." })
      return
    }

    setPasswordSaveState("saving")
    await new Promise((resolve) => setTimeout(resolve, 900))
    setPasswordSaveState("saved")
    setPasswordForm({ current: "", next: "", confirm: "" })
    toast({ title: "Password updated", description: "Your password was changed successfully." })
  }

  const createApiKey = () => {
    if (!newApiName.trim()) {
      toast({ title: "Name required", description: "Provide a key name before creating." })
      return
    }

    const randomSuffix = Math.random().toString(36).slice(2, 14)
    const item: ApiKeyItem = {
      id: `key-${Date.now()}`,
      name: newApiName.trim(),
      key: `vrx_live_${randomSuffix}`,
      permissions: newApiPermissions,
      createdAt: "Now",
      lastUsed: "Never",
    }

    setApiKeys((current) => [item, ...current])
    setNewApiName("")
    setNewApiPermissions(["trades:read"])
    setCreateApiModalOpen(false)
    toast({ title: "API key created", description: "Store the key securely before leaving this page." })
  }

  const revokeApiKey = (id: string) => {
    setApiKeys((current) => current.filter((item) => item.id !== id))
    toast({ title: "API key revoked" })
  }

  const togglePair = (pair: string) => {
    setTradingPrefs((current) => ({
      ...current,
      preferredPairs: current.preferredPairs.includes(pair)
        ? current.preferredPairs.filter((item) => item !== pair)
        : [...current.preferredPairs, pair],
    }))
  }

  const updateNotificationCell = (eventKey: string, channel: ChannelKey, checked: boolean) => {
    setNotificationPrefs((current) => ({
      ...current,
      [eventKey]: {
        ...current[eventKey],
        [channel]: checked,
      },
    }))
  }

  const verificationCompletedCount = verificationItems.filter((item) => item.status === "approved").length
  const verificationProgress = Math.round((verificationCompletedCount / verificationItems.length) * 100)

  const referralLink = `https://virexa.com/ref/${referralSettings.customCode}`

  if (isPageLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Card className="bg-card border-border">
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <Toaster />

      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account, platform preferences, and security controls.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {isMobile && (
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Settings Section</Label>
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="profile">Profile</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="verification">Verification</SelectItem>
                <SelectItem value="payouts">Payouts</SelectItem>
                <SelectItem value="trading">Trading</SelectItem>
                <SelectItem value="notifications">Notifications</SelectItem>
                <SelectItem value="referrals">Referrals</SelectItem>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="privacy">Privacy</SelectItem>
                <SelectItem value="appearance">Appearance</SelectItem>
                <SelectItem value="support">Support & Legal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <TabsList className="hidden sm:flex bg-card border border-border w-full justify-start overflow-x-auto">
          <TabsTrigger value="profile" className="gap-2 shrink-0"><User className="h-4 w-4" />Profile</TabsTrigger>
          <TabsTrigger value="security" className="gap-2 shrink-0"><Shield className="h-4 w-4" />Security</TabsTrigger>
          <TabsTrigger value="verification" className="gap-2 shrink-0"><BadgeCheck className="h-4 w-4" />Verification</TabsTrigger>
          <TabsTrigger value="payouts" className="gap-2 shrink-0"><Wallet className="h-4 w-4" />Payouts</TabsTrigger>
          <TabsTrigger value="trading" className="gap-2 shrink-0"><Activity className="h-4 w-4" />Trading</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 shrink-0"><Bell className="h-4 w-4" />Notifications</TabsTrigger>
          <TabsTrigger value="referrals" className="gap-2 shrink-0"><Link2 className="h-4 w-4" />Referrals</TabsTrigger>
          <TabsTrigger value="api" className="gap-2 shrink-0"><Key className="h-4 w-4" />API</TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2 shrink-0"><Eye className="h-4 w-4" />Privacy</TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2 shrink-0"><Globe className="h-4 w-4" />Appearance</TabsTrigger>
          <TabsTrigger value="support" className="gap-2 shrink-0"><Mail className="h-4 w-4" />Support & Legal</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {isProfileDirty && (
              <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-500">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                <span>You have unsaved profile changes. Save before leaving this page.</span>
              </div>
            )}

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage account identity and localization preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-accent/20 text-accent text-xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-muted-foreground">JPG/PNG up to 2MB.</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profileForm.fullName}
                      onChange={(event) => setProfileForm((s) => ({ ...s, fullName: event.target.value }))}
                    />
                    {profileErrors.fullName && <p className="text-xs text-destructive">{profileErrors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profileForm.username}
                      onChange={(event) => setProfileForm((s) => ({ ...s, username: event.target.value }))}
                    />
                    {profileErrors.username && <p className="text-xs text-destructive">{profileErrors.username}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nickname">Display/Trader Nickname</Label>
                    <Input
                      id="nickname"
                      value={profileForm.nickname}
                      onChange={(event) => setProfileForm((s) => ({ ...s, nickname: event.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(event) => setProfileForm((s) => ({ ...s, email: event.target.value }))}
                    />
                    {profileErrors.email && <p className="text-xs text-destructive">{profileErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileForm.phone}
                      onChange={(event) => setProfileForm((s) => ({ ...s, phone: event.target.value }))}
                    />
                    {profileErrors.phone && <p className="text-xs text-destructive">{profileErrors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select
                      value={profileForm.country}
                      onValueChange={(value) => setProfileForm((s) => ({ ...s, country: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                        <SelectItem value="Pakistan">Pakistan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select
                      value={profileForm.timezone}
                      onValueChange={(value) => setProfileForm((s) => ({ ...s, timezone: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-05:00 (New York)">UTC-05:00 (New York)</SelectItem>
                        <SelectItem value="UTC+00:00 (London)">UTC+00:00 (London)</SelectItem>
                        <SelectItem value="UTC+04:00 (Dubai)">UTC+04:00 (Dubai)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={profileForm.language}
                      onValueChange={(value) => setProfileForm((s) => ({ ...s, language: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Urdu">Urdu</SelectItem>
                        <SelectItem value="Arabic">Arabic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select
                      value={profileForm.dateFormat}
                      onValueChange={(value) => setProfileForm((s) => ({ ...s, dateFormat: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio/About</Label>
                    <Textarea
                      id="bio"
                      value={profileForm.bio}
                      onChange={(event) => setProfileForm((s) => ({ ...s, bio: event.target.value }))}
                      className="min-h-[110px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-sm text-muted-foreground">
                    {profileSaveState === "saved" && <span className="text-primary">Changes saved successfully.</span>}
                    {profileSaveState === "error" && <span className="text-destructive">Fix highlighted fields to continue.</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setProfileForm(initialProfileState)
                        setProfileErrors({})
                        setProfileSaveState("idle")
                      }}
                      disabled={profileSaveState === "saving"}
                    >
                      Reset
                    </Button>
                    <Button
                      className="bg-accent hover:bg-accent/90 gap-2"
                      onClick={saveProfile}
                      disabled={!isProfileDirty || profileSaveState === "saving"}
                    >
                      {profileSaveState === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Password Management</CardTitle>
                <CardDescription>Change your password and secure your account login.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordForm.current}
                      onChange={(event) => setPasswordForm((s) => ({ ...s, current: event.target.value }))}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordForm.next}
                        onChange={(event) => setPasswordForm((s) => ({ ...s, next: event.target.value }))}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordForm.confirm}
                        onChange={(event) => setPasswordForm((s) => ({ ...s, confirm: event.target.value }))}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-accent hover:bg-accent/90 gap-2" onClick={updatePassword} disabled={passwordSaveState === "saving"}>
                    {passwordSaveState === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Authentication & Protection</CardTitle>
                <CardDescription>2FA, backup controls, alerts, and trusted access management.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2"><Smartphone className="h-5 w-5 text-primary" /></div>
                    <div>
                      <p className="font-medium text-foreground">Authenticator App</p>
                      <p className="text-sm text-muted-foreground">TOTP-based login verification</p>
                    </div>
                  </div>
                  <Switch
                    checked={securityToggles.twoFactorEnabled}
                    onCheckedChange={(checked) => setSecurityToggles((s) => ({ ...s, twoFactorEnabled: checked }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-border bg-background/50 p-4 space-y-2">
                    <p className="font-medium text-foreground">Login Alerts</p>
                    <p className="text-sm text-muted-foreground">Email and push alerts for account sign-ins.</p>
                    <Switch
                      checked={securityToggles.loginAlerts}
                      onCheckedChange={(checked) => setSecurityToggles((s) => ({ ...s, loginAlerts: checked }))}
                    />
                  </div>

                  <div className="rounded-lg border border-border bg-background/50 p-4 space-y-2">
                    <p className="font-medium text-foreground">Suspicious Login Detection</p>
                    <p className="text-sm text-muted-foreground">Challenge unusual location/device changes.</p>
                    <Switch
                      checked={securityToggles.suspiciousLoginDetection}
                      onCheckedChange={(checked) => setSecurityToggles((s) => ({ ...s, suspiciousLoginDetection: checked }))}
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-background/50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium text-foreground">Backup Codes</p>
                    <Button variant="outline" size="sm">Generate New Codes</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Store backup codes securely for emergency account recovery.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Trusted Devices & Sessions</CardTitle>
                  <CardDescription>Manage active sessions and remove unknown devices.</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="text-destructive">Logout All Devices</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Logout all devices?</DialogTitle>
                      <DialogDescription>This will terminate all active sessions except this one.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button
                        className="bg-destructive hover:bg-destructive/90"
                        onClick={() => toast({ title: "All other sessions logged out" })}
                      >
                        Confirm Logout
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-3">
                {["MacBook Pro · Current Device", "iPhone 15 · Trusted", "Windows PC · Trusted"].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-3">
                    <span className="text-sm text-foreground">{item}</span>
                    <Button variant="ghost" size="sm">Revoke</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Recent Login Activity</CardTitle>
                <CardDescription>Review IP, device, and location metadata.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:hidden">
                  {loginActivityRows.map((row) => (
                    <div key={`${row.id}-mobile`} className="rounded-lg border border-border bg-background/50 p-3 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-muted-foreground">{row.time}</p>
                        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{row.status}</Badge>
                      </div>
                      <p className="font-mono text-xs text-foreground">{row.ip}</p>
                      <p className="text-sm text-foreground">{row.device}</p>
                      <p className="text-xs text-muted-foreground">{row.location}</p>
                    </div>
                  ))}
                </div>

                <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead>Time</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loginActivityRows.map((row) => (
                      <TableRow key={row.id} className="border-border">
                        <TableCell className="text-muted-foreground">{row.time}</TableCell>
                        <TableCell className="font-mono text-xs text-foreground">{row.ip}</TableCell>
                        <TableCell className="text-foreground">{row.device}</TableCell>
                        <TableCell className="text-muted-foreground">{row.location}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{row.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="verification">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Verification Summary</CardTitle>
                  <CardDescription>KYC progress is managed by the dedicated verification center.</CardDescription>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/30">{verificationProgress}% complete</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${verificationProgress}%` }} />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {verificationItems.map((item) => (
                    <div key={item.key} className="rounded-lg border border-border bg-background/50 p-4 space-y-2">
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">Last update: {item.updatedAt}</p>
                      <Badge
                        variant="outline"
                        className={
                          item.status === "approved"
                            ? "border-primary/30 bg-primary/10 text-primary"
                            : item.status === "pending"
                            ? "border-amber-500/30 bg-amber-500/10 text-amber-500"
                            : "border-border text-muted-foreground"
                        }
                      >
                        {item.status === "approved" ? "Approved" : item.status === "pending" ? "In Review" : "Not Started"}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-border bg-background/50 p-4">
                  <p className="font-medium text-foreground mb-3">Verification Timeline</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between text-muted-foreground"><span>Identity documents submitted</span><span>May 11, 2026</span></div>
                    <div className="flex items-center justify-between text-muted-foreground"><span>Address proof submitted</span><span>May 12, 2026</span></div>
                    <div className="flex items-center justify-between text-muted-foreground"><span>Current review status</span><span className="text-amber-500">Address under review</span></div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link href="/kyc"><Button className="gap-2 bg-primary hover:bg-primary/90">Open Verification Center <ArrowRight className="h-4 w-4" /></Button></Link>
                  <Link href="/kyc"><Button variant="outline">Continue Verification</Button></Link>
                  <Link href="/kyc"><Button variant="outline">View Verification Status</Button></Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="payouts">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Payment Methods & Withdrawal Preferences</CardTitle>
                <CardDescription>Saved payout settings only. Withdrawal execution is handled in the wallet module.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {[{ key: "trc20", label: "TRC20 Wallet", value: payoutPrefs.trc20 }, { key: "erc20", label: "ERC20 Wallet", value: payoutPrefs.erc20 }, { key: "bep20", label: "BEP20 Wallet", value: payoutPrefs.bep20 }, { key: "btc", label: "Bitcoin Wallet", value: payoutPrefs.btc }].map((item) => (
                    <div key={item.key} className="rounded-lg border border-border bg-background/50 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>{item.label}</Label>
                        <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">Verified</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input value={item.value} readOnly className="font-mono text-xs" />
                        <Button variant="outline" size="icon" onClick={() => copyToClipboard(item.value, item.label)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Easypaisa Number</Label>
                    <Input value={payoutPrefs.easypaisa} onChange={(event) => setPayoutPrefs((s) => ({ ...s, easypaisa: event.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>JazzCash Number</Label>
                    <Input value={payoutPrefs.jazzcash} onChange={(event) => setPayoutPrefs((s) => ({ ...s, jazzcash: event.target.value }))} />
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Account Title</Label>
                    <Input value={payoutPrefs.accountTitle} onChange={(event) => setPayoutPrefs((s) => ({ ...s, accountTitle: event.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input value={payoutPrefs.bankName} onChange={(event) => setPayoutPrefs((s) => ({ ...s, bankName: event.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>IBAN</Label>
                    <Input value={payoutPrefs.iban} onChange={(event) => setPayoutPrefs((s) => ({ ...s, iban: event.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>SWIFT/BIC</Label>
                    <Input value={payoutPrefs.swift} onChange={(event) => setPayoutPrefs((s) => ({ ...s, swift: event.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Branch Code</Label>
                    <Input value={payoutPrefs.branchCode} onChange={(event) => setPayoutPrefs((s) => ({ ...s, branchCode: event.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Payout Method</Label>
                    <Select
                      value={payoutPrefs.primaryMethod}
                      onValueChange={(value) => setPayoutPrefs((s) => ({ ...s, primaryMethod: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trc20">USDT TRC20</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="easypaisa">Easypaisa</SelectItem>
                        <SelectItem value="jazzcash">JazzCash</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-border bg-background/50 p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Withdrawal Whitelist</p>
                      <Switch
                        checked={payoutPrefs.whitelistOnly}
                        onCheckedChange={(checked) => setPayoutPrefs((s) => ({ ...s, whitelistOnly: checked }))}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Allow withdrawals only to verified and saved payout addresses.</p>
                  </div>

                  <div className="rounded-lg border border-border bg-background/50 p-4 text-center">
                    <QrCode className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="font-medium text-foreground">QR Preview Placeholder</p>
                    <p className="text-xs text-muted-foreground">Use your wallet module to scan/send on-chain payouts.</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Link href="/wallet/withdraw"><Button variant="outline">Open Withdrawal Flow</Button></Link>
                  <Button className="bg-accent hover:bg-accent/90 gap-2" onClick={savePayoutSettings} disabled={payoutSaveState === "saving"}>
                    {payoutSaveState === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Payout Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="trading">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Trading Preferences</CardTitle>
                <CardDescription>Account-level defaults for copy-trading and risk controls.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Default Leverage</Label>
                    <Select
                      value={tradingPrefs.defaultLeverage}
                      onValueChange={(value) => setTradingPrefs((s) => ({ ...s, defaultLeverage: value }))}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5x">5x</SelectItem>
                        <SelectItem value="10x">10x</SelectItem>
                        <SelectItem value="20x">20x</SelectItem>
                        <SelectItem value="50x">50x</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Risk Profile</Label>
                    <Select
                      value={tradingPrefs.riskProfile}
                      onValueChange={(value) => setTradingPrefs((s) => ({ ...s, riskProfile: value }))}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Max Daily Loss</span>
                      <span className="font-medium text-foreground">{tradingPrefs.maxDailyLoss[0]}%</span>
                    </div>
                    <Slider
                      value={tradingPrefs.maxDailyLoss}
                      onValueChange={(value) => setTradingPrefs((s) => ({ ...s, maxDailyLoss: value }))}
                      min={1}
                      max={20}
                      step={1}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Default Copy Allocation</span>
                      <span className="font-medium text-foreground">{tradingPrefs.defaultCopyAllocation[0]}%</span>
                    </div>
                    <Slider
                      value={tradingPrefs.defaultCopyAllocation}
                      onValueChange={(value) => setTradingPrefs((s) => ({ ...s, defaultCopyAllocation: value }))}
                      min={5}
                      max={100}
                      step={5}
                    />
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Slippage Tolerance</span>
                      <span className="font-medium text-foreground">{tradingPrefs.slippageTolerance[0]}%</span>
                    </div>
                    <Slider
                      value={tradingPrefs.slippageTolerance}
                      onValueChange={(value) => setTradingPrefs((s) => ({ ...s, slippageTolerance: value }))}
                      min={0}
                      max={5}
                      step={0.5}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-border bg-background/50 p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Auto Stop-Loss Protection</p>
                      <p className="text-sm text-muted-foreground">Apply stop-loss template to copied trades.</p>
                    </div>
                    <Switch
                      checked={tradingPrefs.autoStopLossProtection}
                      onCheckedChange={(checked) => setTradingPrefs((s) => ({ ...s, autoStopLossProtection: checked }))}
                    />
                  </div>

                  <div className="rounded-lg border border-border bg-background/50 p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Auto-Copy Toggle</p>
                      <p className="text-sm text-muted-foreground">Automatically copy trades from subscribed strategies.</p>
                    </div>
                    <Switch
                      checked={tradingPrefs.autoCopy}
                      onCheckedChange={(checked) => setTradingPrefs((s) => ({ ...s, autoCopy: checked }))}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Preferred Trading Pairs</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["EUR/USD", "GBP/USD", "USD/JPY", "XAU/USD", "AUD/USD", "EUR/JPY", "USD/CHF", "BTC/USD"].map((pair) => (
                      <label key={pair} className="flex items-center gap-2 rounded-lg border border-border bg-background/50 px-3 py-2 text-sm cursor-pointer">
                        <Checkbox checked={tradingPrefs.preferredPairs.includes(pair)} onCheckedChange={() => togglePair(pair)} />
                        <span className="text-foreground">{pair}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link href="/marketplace"><Button variant="outline">Open Copy Trading Marketplace</Button></Link>
                  <Button className="bg-accent hover:bg-accent/90 gap-2" onClick={saveTradingSettings} disabled={tradingSaveState === "saving"}>
                    {tradingSaveState === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Trading Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Channel-level controls only. Full feed is in notifications center.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead>Event</TableHead>
                      <TableHead>Push</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>SMS</TableHead>
                      <TableHead>Telegram</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notificationEventRows.map((row) => (
                      <TableRow key={row.key} className="border-border">
                        <TableCell className="font-medium text-foreground">{row.label}</TableCell>
                        <TableCell><Switch checked={notificationPrefs[row.key].push} onCheckedChange={(checked) => updateNotificationCell(row.key, "push", checked)} /></TableCell>
                        <TableCell><Switch checked={notificationPrefs[row.key].email} onCheckedChange={(checked) => updateNotificationCell(row.key, "email", checked)} /></TableCell>
                        <TableCell><Switch checked={notificationPrefs[row.key].sms} onCheckedChange={(checked) => updateNotificationCell(row.key, "sms", checked)} /></TableCell>
                        <TableCell><Switch checked={notificationPrefs[row.key].telegram} onCheckedChange={(checked) => updateNotificationCell(row.key, "telegram", checked)} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex items-center justify-between pt-2">
                  <Link href="/notifications"><Button variant="outline">Open Notifications Center</Button></Link>
                  <Button className="bg-accent hover:bg-accent/90 gap-2" onClick={saveNotifications} disabled={notificationSaveState === "saving"}>
                    {notificationSaveState === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="referrals">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Referral & Affiliate Settings</CardTitle>
                <CardDescription>Manage referral identity and payout preferences. Analytics stays in referrals module.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Referral Link</Label>
                  <div className="flex items-center gap-2">
                    <Input value={referralLink} readOnly />
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(referralLink, "Referral link")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Custom Referral Code</Label>
                    <Input
                      value={referralSettings.customCode}
                      onChange={(event) => setReferralSettings((s) => ({ ...s, customCode: event.target.value.toUpperCase() }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Payout Destination</Label>
                    <Select
                      value={referralSettings.payoutDestination}
                      onValueChange={(value) => setReferralSettings((s) => ({ ...s, payoutDestination: value }))}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wallet">Trading Wallet</SelectItem>
                        <SelectItem value="usdt">USDT Wallet</SelectItem>
                        <SelectItem value="bank">Bank Account</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-border bg-background/50 p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Affiliate Visibility</p>
                      <p className="text-sm text-muted-foreground">Allow affiliate profile to appear publicly.</p>
                    </div>
                    <Switch
                      checked={referralSettings.affiliateVisibility}
                      onCheckedChange={(checked) => setReferralSettings((s) => ({ ...s, affiliateVisibility: checked }))}
                    />
                  </div>

                  <div className="rounded-lg border border-border bg-background/50 p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Commission Auto-Payout</p>
                      <p className="text-sm text-muted-foreground">Automatically settle commissions to payout destination.</p>
                    </div>
                    <Switch
                      checked={referralSettings.commissionAutoPayout}
                      onCheckedChange={(checked) => setReferralSettings((s) => ({ ...s, commissionAutoPayout: checked }))}
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-background/50 p-4 text-center">
                  <QrCode className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="font-medium text-foreground">Invite QR Card</p>
                  <p className="text-xs text-muted-foreground">Share this code via your referral dashboard/channel toolkit.</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <Link href="/referrals"><Button variant="outline">Open Referral Dashboard</Button></Link>
                    <Link href="/referrals/tree"><Button variant="outline">Open Referral Tree</Button></Link>
                  </div>
                  <Button className="bg-accent hover:bg-accent/90 gap-2" onClick={saveReferralSettings} disabled={referralSaveState === "saving"}>
                    {referralSaveState === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Referral Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="api">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>API & Connected Accounts</CardTitle>
                <CardDescription>Manage keys and integration-level preferences without duplicating trading workflows.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="rounded-lg border border-border bg-background/50 p-4">
                    <p className="font-medium text-foreground mb-1">MT5 Connection</p>
                    <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Connected</Badge>
                    <p className="text-xs text-muted-foreground mt-2">Broker: FX Prime Live-01</p>
                  </div>
                  <div className="rounded-lg border border-border bg-background/50 p-4">
                    <p className="font-medium text-foreground mb-1">cTrader Connection</p>
                    <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-500">Not Connected</Badge>
                    <p className="text-xs text-muted-foreground mt-2">Connect in broker management flow.</p>
                  </div>
                  <div className="rounded-lg border border-border bg-background/50 p-4">
                    <p className="font-medium text-foreground mb-1">Webhook Status</p>
                    <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Healthy</Badge>
                    <p className="text-xs text-muted-foreground mt-2">Last delivery: 4 minutes ago.</p>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-background/50 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-foreground">Stripe Publishable Key (Env)</p>
                    <Badge variant="outline" className={hasStripeKey ? "border-primary/30 text-primary" : "border-amber-500/30 text-amber-500"}>
                      {hasStripeKey ? "Configured" : "Missing"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="text" value={showApiKey && hasStripeKey ? stripeKey : maskedStripeKey} readOnly className="font-mono text-sm" />
                    <Button variant="outline" size="icon" onClick={() => setShowApiKey((s) => !s)} disabled={!hasStripeKey}>
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">API Keys</p>
                  <Dialog open={createApiModalOpen} onOpenChange={setCreateApiModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2"><Key className="h-4 w-4" />Create API Key</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create API Key</DialogTitle>
                        <DialogDescription>Generate a key with scoped permissions.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Key Name</Label>
                          <Input value={newApiName} onChange={(event) => setNewApiName(event.target.value)} placeholder="Trading automation key" />
                        </div>
                        <div className="space-y-2">
                          <Label>Permissions</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {["trades:read", "trades:write", "wallet:read", "webhook:read", "webhook:write"].map((permission) => (
                              <label key={permission} className="flex items-center gap-2 text-sm text-foreground">
                                <Checkbox
                                  checked={newApiPermissions.includes(permission)}
                                  onCheckedChange={(checked) => {
                                    setNewApiPermissions((current) =>
                                      checked
                                        ? [...current, permission]
                                        : current.filter((item) => item !== permission)
                                    )
                                  }}
                                />
                                {permission}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setCreateApiModalOpen(false)}>Cancel</Button>
                        <Button onClick={createApiKey}>Create Key</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {apiKeys.length === 0 ? (
                  <Empty className="border border-dashed border-border bg-background/50">
                    <EmptyHeader>
                      <EmptyMedia variant="icon"><Bot className="size-5" /></EmptyMedia>
                      <EmptyTitle>No API keys yet</EmptyTitle>
                      <EmptyDescription>Create your first key to connect broker tools and automations.</EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <Button onClick={() => setCreateApiModalOpen(true)}>Create API Key</Button>
                    </EmptyContent>
                  </Empty>
                ) : (
                  <div className="space-y-3">
                    {apiKeys.map((item) => (
                      <div key={item.id} className="rounded-lg border border-border bg-background/50 p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div>
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground font-mono">{item.key}</p>
                            <p className="text-xs text-muted-foreground mt-1">Created: {item.createdAt} · Last used: {item.lastUsed}</p>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="text-destructive gap-2"><Trash2 className="h-4 w-4" />Revoke</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Revoke API key?</DialogTitle>
                                <DialogDescription>This action is immediate and cannot be undone.</DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button className="bg-destructive hover:bg-destructive/90" onClick={() => revokeApiKey(item.id)}>Revoke Key</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.permissions.map((permission) => (
                            <Badge key={permission} variant="outline">{permission}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="privacy">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Privacy Controls</CardTitle>
                <CardDescription>Control profile visibility and data sharing behavior.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "publicTraderProfile", title: "Public Trader Profile", subtitle: "Allow your trader profile to be public." },
                  { key: "leaderboardVisibility", title: "Leaderboard Visibility", subtitle: "Include your account in leaderboard placements." },
                  { key: "profileVisibility", title: "Profile Visibility", subtitle: "Show profile details to platform members." },
                  { key: "hideBalances", title: "Hide Balances", subtitle: "Mask wallet and portfolio balances in UI." },
                  { key: "hideTradingHistory", title: "Hide Trading History", subtitle: "Hide historic trade list from public profile." },
                  { key: "dataSharing", title: "Data Sharing Preferences", subtitle: "Allow analytics data sharing for product improvements." },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-4">
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    </div>
                    <Switch
                      checked={privacySettings[item.key as keyof typeof privacySettings]}
                      onCheckedChange={(checked) => setPrivacySettings((s) => ({ ...s, [item.key]: checked }))}
                    />
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button className="bg-accent hover:bg-accent/90">Save Privacy Settings</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="appearance">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Appearance & Display</CardTitle>
                <CardDescription>Visual preference controls for dashboard and chart display.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Theme Mode</Label>
                    <Select value={appearanceSettings.mode} onValueChange={(value) => setAppearanceSettings((s) => ({ ...s, mode: value }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <Select value={appearanceSettings.accent} onValueChange={(value) => setAppearanceSettings((s) => ({ ...s, accent: value }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emerald">Emerald</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="violet">Violet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Dashboard Density</Label>
                    <Select
                      value={appearanceSettings.dashboardDensity}
                      onValueChange={(value) => setAppearanceSettings((s) => ({ ...s, dashboardDensity: value }))}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Chart Appearance</Label>
                    <Select
                      value={appearanceSettings.chartStyle}
                      onValueChange={(value) => setAppearanceSettings((s) => ({ ...s, chartStyle: value }))}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="candles">Candlestick</SelectItem>
                        <SelectItem value="line">Line</SelectItem>
                        <SelectItem value="bars">OHLC Bars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-background/50 p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Compact Mode</p>
                    <p className="text-sm text-muted-foreground">Reduce card spacing density across dashboard modules.</p>
                  </div>
                  <Switch
                    checked={appearanceSettings.compactMode}
                    onCheckedChange={(checked) => setAppearanceSettings((s) => ({ ...s, compactMode: checked }))}
                  />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-accent hover:bg-accent/90">Save Appearance</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="support">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Support Shortcuts</CardTitle>
                <CardDescription>Quick access to support tools and legal documents.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/support" className="rounded-lg border border-border bg-background/50 p-4 hover:bg-secondary transition-colors">
                    <p className="font-medium text-foreground">Support Ticket Center</p>
                    <p className="text-sm text-muted-foreground">Open, track, or submit support cases.</p>
                  </Link>
                  <Link href="/help" className="rounded-lg border border-border bg-background/50 p-4 hover:bg-secondary transition-colors">
                    <p className="font-medium text-foreground">Help Center & FAQ</p>
                    <p className="text-sm text-muted-foreground">Guides and troubleshooting resources.</p>
                  </Link>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "Terms & Conditions", href: "/help" },
                    { label: "Privacy Policy", href: "/help" },
                    { label: "Risk Disclosure", href: "/help" },
                    { label: "Platform Agreement", href: "/help" },
                  ].map((item) => (
                    <Link key={item.label} href={item.href} className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary">
                      <span>{item.label}</span>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  ))}
                </div>

                <Separator />

                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 space-y-3">
                  <p className="font-medium text-destructive">Account Deletion Request</p>
                  <p className="text-sm text-muted-foreground">This action is permanent. Type DELETE to confirm account deletion request.</p>

                  <Input value={deleteConfirmText} onChange={(event) => setDeleteConfirmText(event.target.value)} placeholder="Type DELETE" />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-destructive hover:bg-destructive/90" disabled={deleteConfirmText !== "DELETE"}>
                        Request Account Deletion
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submit deletion request?</DialogTitle>
                        <DialogDescription>Your request will be reviewed by support and compliance before final execution.</DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button
                          className="bg-destructive hover:bg-destructive/90"
                          onClick={() => toast({ title: "Deletion request submitted", description: "Support will contact you shortly." })}
                        >
                          Confirm Request
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Wallet Module</p>
            <p className="text-lg font-semibold text-foreground">Funds, deposits, withdrawals</p>
            <Link href="/wallet" className="text-sm text-primary inline-flex items-center gap-1 mt-2">Open Wallet <ArrowRight className="h-4 w-4" /></Link>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Referral Module</p>
            <p className="text-lg font-semibold text-foreground">Tree, commissions, performance</p>
            <Link href="/referrals" className="text-sm text-primary inline-flex items-center gap-1 mt-2">Open Referrals <ArrowRight className="h-4 w-4" /></Link>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Analytics Module</p>
            <p className="text-lg font-semibold text-foreground">Performance and strategy metrics</p>
            <Link href="/analytics" className="text-sm text-primary inline-flex items-center gap-1 mt-2">Open Analytics <ArrowRight className="h-4 w-4" /></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
