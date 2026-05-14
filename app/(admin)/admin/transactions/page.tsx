"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, CheckCircle, XCircle, Eye, ArrowUpRight, ArrowDownLeft } from "lucide-react"

const transactions = [
  {
    id: "TXN-001234",
    user: "Alex Thompson",
    type: "Deposit",
    method: "Bank Transfer",
    amount: "$5,000.00",
    status: "Completed",
    date: "2024-02-20 14:32"
  },
  {
    id: "TXN-001235",
    user: "Sarah Chen",
    type: "Withdrawal",
    method: "USDT (TRC20)",
    amount: "$2,500.00",
    status: "Pending",
    date: "2024-02-20 13:15"
  },
  {
    id: "TXN-001236",
    user: "Michael Brown",
    type: "Deposit",
    method: "Bitcoin",
    amount: "$10,000.00",
    status: "Completed",
    date: "2024-02-20 12:45"
  },
  {
    id: "TXN-001237",
    user: "Emma Wilson",
    type: "Withdrawal",
    method: "Bank Transfer",
    amount: "$8,200.00",
    status: "Processing",
    date: "2024-02-20 11:20"
  },
  {
    id: "TXN-001238",
    user: "James Lee",
    type: "Deposit",
    method: "Credit Card",
    amount: "$1,500.00",
    status: "Failed",
    date: "2024-02-20 10:05"
  },
  {
    id: "TXN-001239",
    user: "Lisa Wang",
    type: "Withdrawal",
    method: "Ethereum",
    amount: "$3,750.00",
    status: "Pending",
    date: "2024-02-20 09:30"
  }
]

export default function AdminTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Transaction Management</h1>
        <p className="text-muted-foreground">Monitor and manage all platform transactions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <ArrowDownLeft className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Deposits</p>
                <p className="text-xl font-bold text-foreground">$2.4M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10">
                <ArrowUpRight className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Withdrawals</p>
                <p className="text-xl font-bold text-foreground">$1.8M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <span className="text-yellow-500 font-bold text-lg">12</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
                <p className="text-xl font-bold text-foreground">$45,200</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <span className="text-accent font-bold text-lg">1.2K</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today&apos;s Transactions</p>
                <p className="text-xl font-bold text-foreground">$128,500</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, user, or amount..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all">
              <TabsList className="bg-background border border-border">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.id} className="border-border">
                    <TableCell className="font-mono text-sm text-foreground">
                      {txn.id}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {txn.user}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {txn.type === "Deposit" ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-500" />
                        )}
                        <span className={txn.type === "Deposit" ? "text-green-500" : "text-red-500"}>
                          {txn.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {txn.method}
                    </TableCell>
                    <TableCell className="text-right font-medium text-foreground">
                      {txn.amount}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          txn.status === "Completed"
                            ? "border-green-500/30 bg-green-500/10 text-green-500"
                            : txn.status === "Pending"
                            ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                            : txn.status === "Processing"
                            ? "border-blue-500/30 bg-blue-500/10 text-blue-500"
                            : "border-red-500/30 bg-red-500/10 text-red-500"
                        }
                      >
                        {txn.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {txn.date}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {txn.status === "Pending" && (
                            <>
                              <DropdownMenuItem className="text-green-500">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500">
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
