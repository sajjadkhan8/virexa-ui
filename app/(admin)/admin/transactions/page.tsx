"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { Search, MoreHorizontal, CheckCircle, XCircle, Eye, ArrowUpRight, ArrowDownLeft, Download, Loader2, AlertTriangle, FileText } from "lucide-react"

type TxStatus = "Completed" | "Pending" | "Processing" | "Failed" | "Rejected"
type TxType = "Deposit" | "Withdrawal"

type Transaction = {
  id: string
  user: string
  type: TxType
  method: string
  amount: string
  status: TxStatus
  date: string
}

type ActionMode = "view" | "approve" | "reject" | "export"

const initialTransactions: Transaction[] = [
  { id: "TXN-001234", user: "Alex Thompson", type: "Deposit", method: "Bank Transfer", amount: "$5,000.00", status: "Completed", date: "2024-02-20 14:32" },
  { id: "TXN-001235", user: "Sarah Chen", type: "Withdrawal", method: "USDT (TRC20)", amount: "$2,500.00", status: "Pending", date: "2024-02-20 13:15" },
  { id: "TXN-001236", user: "Michael Brown", type: "Deposit", method: "Bitcoin", amount: "$10,000.00", status: "Completed", date: "2024-02-20 12:45" },
  { id: "TXN-001237", user: "Emma Wilson", type: "Withdrawal", method: "Bank Transfer", amount: "$8,200.00", status: "Processing", date: "2024-02-20 11:20" },
  { id: "TXN-001238", user: "James Lee", type: "Deposit", method: "Credit Card", amount: "$1,500.00", status: "Failed", date: "2024-02-20 10:05" },
  { id: "TXN-001239", user: "Lisa Wang", type: "Withdrawal", method: "Ethereum", amount: "$3,750.00", status: "Pending", date: "2024-02-20 09:30" },
]

export default function AdminTransactionsPage() {
  const { toast } = useToast()
  const [transactions, setTransactions] = useState(initialTransactions)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selected, setSelected] = useState<Transaction | null>(null)
  const [actionMode, setActionMode] = useState<ActionMode | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [actionError, setActionError] = useState("")

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesSearch =
        txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.amount.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "deposits" && txn.type === "Deposit") ||
        (typeFilter === "withdrawals" && txn.type === "Withdrawal") ||
        (typeFilter === "pending" && (txn.status === "Pending" || txn.status === "Processing"))

      return matchesSearch && matchesType
    })
  }, [transactions, searchQuery, typeFilter])

  const openDialog = (mode: ActionMode, txn?: Transaction) => {
    setSelected(txn ?? null)
    setActionMode(mode)
    setActionError("")
    setIsDialogOpen(true)
  }

  const handleAction = async () => {
    if (!actionMode) return

    setIsSubmitting(true)
    setActionError("")
    await new Promise((resolve) => setTimeout(resolve, 850))

    if (actionMode === "export") {
      if (filteredTransactions.length === 0) {
        setActionError("No transactions available for export with current filters.")
        setIsSubmitting(false)
        return
      }
      toast({ title: "Export ready", description: `Prepared ${filteredTransactions.length} transactions for export.` })
      setIsSubmitting(false)
      setIsDialogOpen(false)
      return
    }

    if (!selected) {
      setIsSubmitting(false)
      return
    }

    if (actionMode === "approve") {
      if (selected.status !== "Pending") {
        setActionError("Only pending transactions can be approved.")
        setIsSubmitting(false)
        return
      }
      setTransactions((current) => current.map((txn) => (txn.id === selected.id ? { ...txn, status: "Completed" } : txn)))
      toast({ title: "Transaction approved", description: `${selected.id} has been approved.` })
    }

    if (actionMode === "reject") {
      if (selected.status !== "Pending") {
        setActionError("Only pending transactions can be rejected.")
        setIsSubmitting(false)
        return
      }
      setTransactions((current) => current.map((txn) => (txn.id === selected.id ? { ...txn, status: "Rejected" } : txn)))
      toast({ title: "Transaction rejected", description: `${selected.id} has been rejected.` })
    }

    setIsSubmitting(false)
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <Toaster />

      <div>
        <h1 className="text-2xl font-bold text-foreground">Transaction Management</h1>
        <p className="text-muted-foreground">Monitor and manage all platform transactions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-green-500/10"><ArrowDownLeft className="h-5 w-5 text-green-500" /></div><div><p className="text-sm text-muted-foreground">Total Deposits</p><p className="text-xl font-bold text-foreground">$2.4M</p></div></div></CardContent></Card>
        <Card className="bg-card border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-red-500/10"><ArrowUpRight className="h-5 w-5 text-red-500" /></div><div><p className="text-sm text-muted-foreground">Total Withdrawals</p><p className="text-xl font-bold text-foreground">$1.8M</p></div></div></CardContent></Card>
        <Card className="bg-card border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-yellow-500/10"><span className="text-yellow-500 font-bold text-lg">12</span></div><div><p className="text-sm text-muted-foreground">Pending Approvals</p><p className="text-xl font-bold text-foreground">$45,200</p></div></div></CardContent></Card>
        <Card className="bg-card border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-accent/10"><span className="text-accent font-bold text-lg">1.2K</span></div><div><p className="text-sm text-muted-foreground">Today&apos;s Transactions</p><p className="text-xl font-bold text-foreground">$128,500</p></div></div></CardContent></Card>
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

            <div className="flex items-center gap-2">
              <Tabs value={typeFilter} onValueChange={setTypeFilter}>
                <TabsList className="bg-background border border-border">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="deposits">Deposits</TabsTrigger>
                  <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
              </Tabs>

              <Button variant="outline" className="gap-2" onClick={() => openDialog("export")}>
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredTransactions.length === 0 ? (
            <Empty className="border border-dashed border-border bg-background/50">
              <EmptyHeader>
                <EmptyMedia variant="icon"><FileText className="size-5" /></EmptyMedia>
                <EmptyTitle>No transactions found</EmptyTitle>
                <EmptyDescription>Try changing filters or search terms to find matching transactions.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" onClick={() => { setSearchQuery(""); setTypeFilter("all") }}>Reset Filters</Button>
              </EmptyContent>
            </Empty>
          ) : (
            <>
            <div className="space-y-3 md:hidden">
              {filteredTransactions.map((txn) => (
                <div key={`${txn.id}-mobile`} className="rounded-xl border border-border bg-background/50 p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">{txn.id}</p>
                      <p className="font-medium text-foreground">{txn.user}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{txn.method}</p>
                    </div>
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
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      {txn.type === "Deposit" ? <ArrowDownLeft className="h-4 w-4 text-green-500" /> : <ArrowUpRight className="h-4 w-4 text-red-500" />}
                      <span className={txn.type === "Deposit" ? "text-green-500" : "text-red-500"}>{txn.type}</span>
                    </div>
                    <p className="font-medium text-foreground">{txn.amount}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{txn.date}</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => openDialog("view", txn)}>Details</Button>
                      {txn.status === "Pending" && (
                        <>
                          <Button size="sm" onClick={() => openDialog("approve", txn)}>Approve</Button>
                          <Button size="sm" variant="outline" className="text-destructive" onClick={() => openDialog("reject", txn)}>Reject</Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
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
                    <TableHead className="w-[50px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((txn) => (
                    <TableRow key={txn.id} className="border-border">
                      <TableCell className="font-mono text-sm text-foreground">{txn.id}</TableCell>
                      <TableCell className="font-medium text-foreground">{txn.user}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {txn.type === "Deposit" ? <ArrowDownLeft className="h-4 w-4 text-green-500" /> : <ArrowUpRight className="h-4 w-4 text-red-500" />}
                          <span className={txn.type === "Deposit" ? "text-green-500" : "text-red-500"}>{txn.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{txn.method}</TableCell>
                      <TableCell className="text-right font-medium text-foreground">{txn.amount}</TableCell>
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
                              : txn.status === "Rejected"
                              ? "border-red-500/30 bg-red-500/10 text-red-500"
                              : "border-red-500/30 bg-red-500/10 text-red-500"
                          }
                        >
                          {txn.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{txn.date}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openDialog("view", txn)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {txn.status === "Pending" && (
                              <>
                                <DropdownMenuItem className="text-green-500" onClick={() => openDialog("approve", txn)}>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500" onClick={() => openDialog("reject", txn)}>
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
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionMode === "view" && "Transaction Details"}
              {actionMode === "approve" && "Approve Transaction"}
              {actionMode === "reject" && "Reject Transaction"}
              {actionMode === "export" && "Export Transactions"}
            </DialogTitle>
            <DialogDescription>
              {actionMode === "export"
                ? `Prepare ${filteredTransactions.length} filtered rows for export.`
                : selected
                ? `${selected.id} · ${selected.user} · ${selected.amount}`
                : "Select an item first."}
            </DialogDescription>
          </DialogHeader>

          {actionMode === "view" && selected && (
            <div className="rounded-lg border border-border bg-background/50 p-4 space-y-2 text-sm">
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Type</span><span className="text-foreground font-medium">{selected.type}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Method</span><span className="text-foreground font-medium">{selected.method}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Status</span><span className="text-foreground font-medium">{selected.status}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Date</span><span className="text-foreground font-medium">{selected.date}</span></div>
            </div>
          )}

          {actionError && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5" />
              <span>{actionError}</span>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>Close</Button>
            {actionMode !== "view" && actionMode !== null && (
              <Button
                onClick={handleAction}
                disabled={isSubmitting}
                className={actionMode === "reject" ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"}
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {actionMode === "approve" && "Confirm Approval"}
                {actionMode === "reject" && "Confirm Rejection"}
                {actionMode === "export" && "Confirm Export"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
