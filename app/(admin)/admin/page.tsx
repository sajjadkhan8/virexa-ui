"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const stats = [
  {
    label: "Total Users",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    label: "Total Volume",
    value: "$48.2M",
    change: "+23.1%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    label: "Active Strategies",
    value: "234",
    change: "+8.4%",
    trend: "up",
    icon: TrendingUp,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    label: "Platform Revenue",
    value: "$1.24M",
    change: "+15.3%",
    trend: "up",
    icon: Activity,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  }
]

const volumeData = [
  { date: "Jan", volume: 4200000 },
  { date: "Feb", volume: 3800000 },
  { date: "Mar", volume: 5100000 },
  { date: "Apr", volume: 4700000 },
  { date: "May", volume: 6200000 },
  { date: "Jun", volume: 5800000 },
  { date: "Jul", volume: 7100000 },
  { date: "Aug", volume: 6500000 },
  { date: "Sep", volume: 7800000 },
  { date: "Oct", volume: 8200000 },
  { date: "Nov", volume: 7500000 },
  { date: "Dec", volume: 9100000 }
]

const recentUsers = [
  { id: 1, name: "Alex Thompson", email: "alex@email.com", status: "Verified", date: "2 min ago" },
  { id: 2, name: "Sarah Chen", email: "sarah@email.com", status: "Pending", date: "15 min ago" },
  { id: 3, name: "Michael Brown", email: "michael@email.com", status: "Verified", date: "1 hour ago" },
  { id: 4, name: "Emma Wilson", email: "emma@email.com", status: "Rejected", date: "2 hours ago" },
  { id: 5, name: "James Lee", email: "james@email.com", status: "Pending", date: "3 hours ago" }
]

const pendingWithdrawals = [
  { id: 1, user: "John Doe", amount: "$5,420", method: "Bank Transfer", status: "Pending" },
  { id: 2, user: "Sarah Kim", amount: "$2,150", method: "USDT", status: "Pending" },
  { id: 3, user: "Mike Chen", amount: "$8,900", method: "Bank Transfer", status: "Processing" },
  { id: 4, user: "Lisa Wang", amount: "$3,200", method: "Bitcoin", status: "Pending" }
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of platform performance and activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                      <span className={stat.trend === "up" ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                        {stat.change}
                      </span>
                      <span className="text-muted-foreground text-sm">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Trading Volume</CardTitle>
            <CardDescription>Monthly trading volume over the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeData}>
                  <defs>
                    <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))"
                    }}
                    formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, "Volume"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    fill="url(#volumeGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pending Withdrawals</CardTitle>
              <CardDescription>Withdrawals awaiting approval</CardDescription>
            </div>
            <Link href="/admin/withdrawals">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingWithdrawals.map((withdrawal) => (
                <div key={withdrawal.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50">
                  <div>
                    <p className="font-medium text-foreground">{withdrawal.user}</p>
                    <p className="text-sm text-muted-foreground">{withdrawal.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{withdrawal.amount}</p>
                    <Badge 
                      variant="outline"
                      className={
                        withdrawal.status === "Processing"
                          ? "border-blue-500/30 text-blue-500"
                          : "border-yellow-500/30 text-yellow-500"
                      }
                    >
                      {withdrawal.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Registrations</CardTitle>
            <CardDescription>New users who recently signed up</CardDescription>
          </div>
          <Link href="/admin/users">
            <Button variant="outline" size="sm">View All Users</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge 
                    variant="outline"
                    className={
                      user.status === "Verified"
                        ? "border-green-500/30 bg-green-500/10 text-green-500"
                        : user.status === "Pending"
                        ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                        : "border-red-500/30 bg-red-500/10 text-red-500"
                    }
                  >
                    {user.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{user.date}</span>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
