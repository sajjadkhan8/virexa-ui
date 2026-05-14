"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Search, 
  Filter,
  Download,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const transactions = [
  {
    id: "TXN001",
    type: "deposit",
    method: "Bank Transfer",
    amount: 5000,
    status: "completed",
    date: "2024-01-15 14:32",
    reference: "REF-2024011514320001"
  },
  {
    id: "TXN002",
    type: "withdrawal",
    method: "Crypto (USDT)",
    amount: 2500,
    status: "pending",
    date: "2024-01-14 09:15",
    reference: "REF-2024011409150002"
  },
  {
    id: "TXN003",
    type: "deposit",
    method: "Credit Card",
    amount: 1000,
    status: "completed",
    date: "2024-01-13 16:45",
    reference: "REF-2024011316450003"
  },
  {
    id: "TXN004",
    type: "withdrawal",
    method: "Bank Transfer",
    amount: 3000,
    status: "failed",
    date: "2024-01-12 11:20",
    reference: "REF-2024011211200004"
  },
  {
    id: "TXN005",
    type: "deposit",
    method: "Crypto (BTC)",
    amount: 10000,
    status: "completed",
    date: "2024-01-11 08:00",
    reference: "REF-2024011108000005"
  },
  {
    id: "TXN006",
    type: "withdrawal",
    method: "Crypto (USDT)",
    amount: 1500,
    status: "processing",
    date: "2024-01-10 15:30",
    reference: "REF-2024011015300006"
  },
  {
    id: "TXN007",
    type: "deposit",
    method: "Bank Transfer",
    amount: 7500,
    status: "completed",
    date: "2024-01-09 12:00",
    reference: "REF-2024010912000007"
  },
  {
    id: "TXN008",
    type: "withdrawal",
    method: "Bank Transfer",
    amount: 4000,
    status: "completed",
    date: "2024-01-08 10:45",
    reference: "REF-2024010810450008"
  },
]

const statusConfig = {
  completed: { label: "Completed", icon: CheckCircle, class: "bg-green-500/10 text-green-500" },
  pending: { label: "Pending", icon: Clock, class: "bg-yellow-500/10 text-yellow-500" },
  processing: { label: "Processing", icon: RefreshCw, class: "bg-blue-500/10 text-blue-500" },
  failed: { label: "Failed", icon: XCircle, class: "bg-red-500/10 text-red-500" },
}

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.reference.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || tx.type === typeFilter
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const totalDeposits = transactions.filter(t => t.type === "deposit" && t.status === "completed").reduce((sum, t) => sum + t.amount, 0)
  const totalWithdrawals = transactions.filter(t => t.type === "withdrawal" && t.status === "completed").reduce((sum, t) => sum + t.amount, 0)
  const pendingAmount = transactions.filter(t => t.status === "pending" || t.status === "processing").reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">View and manage your transaction history</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Deposits</p>
                  <p className="text-2xl font-bold text-green-500">${totalDeposits.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <ArrowDownLeft className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Withdrawals</p>
                  <p className="text-2xl font-bold text-red-500">${totalWithdrawals.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <ArrowUpRight className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Amount</p>
                  <p className="text-2xl font-bold text-yellow-500">${pendingAmount.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID or reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-40 bg-secondary border-border">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40 bg-secondary border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((tx, index) => {
              const status = statusConfig[tx.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              
              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === "deposit" ? "bg-green-500/10" : "bg-red-500/10"
                    }`}>
                      {tx.type === "deposit" ? (
                        <ArrowDownLeft className="w-5 h-5 text-green-500" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {tx.type === "deposit" ? "Deposit" : "Withdrawal"} via {tx.method}
                      </p>
                      <p className="text-sm text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`font-semibold ${tx.type === "deposit" ? "text-green-500" : "text-red-500"}`}>
                        {tx.type === "deposit" ? "+" : "-"}${tx.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.reference}</p>
                    </div>
                    <Badge className={status.class}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
