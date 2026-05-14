"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { Search, MoreHorizontal, Eye, Ban, Mail, Download, Loader2, AlertTriangle, Users as UsersIcon } from "lucide-react"

type UserStatus = "Active" | "Inactive" | "Suspended"
type KycStatus = "Verified" | "Pending" | "Rejected"

type UserRow = {
  id: number
  name: string
  email: string
  avatar: string
  status: UserStatus
  kycStatus: KycStatus
  balance: string
  joinedDate: string
  lastActive: string
}

type ActionMode = "view" | "email" | "suspend" | "export"

const initialUsers: UserRow[] = [
  { id: 1, name: "Alex Thompson", email: "alex.thompson@email.com", avatar: "/avatars/user1.jpg", status: "Active", kycStatus: "Verified", balance: "$12,450.00", joinedDate: "2024-01-15", lastActive: "2 hours ago" },
  { id: 2, name: "Sarah Chen", email: "sarah.chen@email.com", avatar: "/avatars/user2.jpg", status: "Active", kycStatus: "Pending", balance: "$8,920.00", joinedDate: "2024-01-20", lastActive: "5 min ago" },
  { id: 3, name: "Michael Brown", email: "m.brown@email.com", avatar: "/avatars/user3.jpg", status: "Suspended", kycStatus: "Rejected", balance: "$0.00", joinedDate: "2024-01-25", lastActive: "1 week ago" },
  { id: 4, name: "Emma Wilson", email: "emma.w@email.com", avatar: "/avatars/user4.jpg", status: "Active", kycStatus: "Verified", balance: "$45,230.00", joinedDate: "2024-02-01", lastActive: "Just now" },
  { id: 5, name: "James Lee", email: "james.lee@email.com", avatar: "/avatars/user5.jpg", status: "Active", kycStatus: "Verified", balance: "$23,100.00", joinedDate: "2024-02-10", lastActive: "1 hour ago" },
  { id: 6, name: "Lisa Wang", email: "lisa.wang@email.com", avatar: "/avatars/user6.jpg", status: "Inactive", kycStatus: "Pending", balance: "$5,670.00", joinedDate: "2024-02-15", lastActive: "3 days ago" },
]

export default function AdminUsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [kycFilter, setKycFilter] = useState("all")
  const [selected, setSelected] = useState<UserRow | null>(null)
  const [actionMode, setActionMode] = useState<ActionMode | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [actionError, setActionError] = useState("")
  const [emailBody, setEmailBody] = useState("")

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter
      const matchesKyc = kycFilter === "all" || user.kycStatus.toLowerCase() === kycFilter

      return matchesSearch && matchesStatus && matchesKyc
    })
  }, [users, searchQuery, statusFilter, kycFilter])

  const openDialog = (mode: ActionMode, user?: UserRow) => {
    setActionMode(mode)
    setSelected(user ?? null)
    setActionError("")
    if (mode === "email" && user) {
      setEmailBody(`Hello ${user.name},\n\n`) }
    setIsDialogOpen(true)
  }

  const handleAction = async () => {
    if (!actionMode) return

    setIsSubmitting(true)
    setActionError("")
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (actionMode === "export") {
      if (filteredUsers.length === 0) {
        setActionError("No users available to export for current filters.")
        setIsSubmitting(false)
        return
      }
      toast({ title: "Export ready", description: `${filteredUsers.length} users prepared for export.` })
      setIsSubmitting(false)
      setIsDialogOpen(false)
      return
    }

    if (!selected) {
      setIsSubmitting(false)
      return
    }

    if (actionMode === "email") {
      if (!emailBody.trim()) {
        setActionError("Email body cannot be empty.")
        setIsSubmitting(false)
        return
      }
      toast({ title: "Email queued", description: `Message to ${selected.email} queued for delivery.` })
      setIsSubmitting(false)
      setIsDialogOpen(false)
      return
    }

    if (actionMode === "suspend") {
      if (selected.status === "Suspended") {
        setActionError("User is already suspended.")
        setIsSubmitting(false)
        return
      }
      setUsers((current) => current.map((user) => (user.id === selected.id ? { ...user, status: "Suspended" } : user)))
      toast({ title: "User suspended", description: `${selected.name} has been suspended.` })
      setIsSubmitting(false)
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <Toaster />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">View and manage all registered users</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={() => openDialog("export")}>
          <Download className="h-4 w-4" />
          Export Users
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select value={kycFilter} onValueChange={setKycFilter}>
                <SelectTrigger className="w-[140px]"><SelectValue placeholder="KYC Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All KYC</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredUsers.length === 0 ? (
            <Empty className="border border-dashed border-border bg-background/50">
              <EmptyHeader>
                <EmptyMedia variant="icon"><UsersIcon className="size-5" /></EmptyMedia>
                <EmptyTitle>No users match these filters</EmptyTitle>
                <EmptyDescription>Clear filters or search to view the user list.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" onClick={() => { setSearchQuery(""); setStatusFilter("all"); setKycFilter("all") }}>Reset Filters</Button>
              </EmptyContent>
            </Empty>
          ) : (
            <>
            <div className="space-y-3 md:hidden">
              {filteredUsers.map((user) => (
                <div key={`${user.id}-mobile`} className="rounded-xl border border-border bg-background/50 p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs">{user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        user.status === "Active"
                          ? "border-green-500/30 bg-green-500/10 text-green-500"
                          : user.status === "Inactive"
                          ? "border-gray-500/30 bg-gray-500/10 text-gray-500"
                          : "border-red-500/30 bg-red-500/10 text-red-500"
                      }
                    >
                      {user.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-secondary/40 p-2">
                      <p className="text-muted-foreground">KYC</p>
                      <p className="font-medium text-foreground">{user.kycStatus}</p>
                    </div>
                    <div className="rounded-lg bg-secondary/40 p-2">
                      <p className="text-muted-foreground">Balance</p>
                      <p className="font-medium text-foreground">{user.balance}</p>
                    </div>
                    <div className="rounded-lg bg-secondary/40 p-2">
                      <p className="text-muted-foreground">Joined</p>
                      <p className="font-medium text-foreground">{new Date(user.joinedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                    </div>
                    <div className="rounded-lg bg-secondary/40 p-2">
                      <p className="text-muted-foreground">Last Active</p>
                      <p className="font-medium text-foreground">{user.lastActive}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => openDialog("view", user)}>Details</Button>
                    <Button size="sm" variant="outline" onClick={() => openDialog("email", user)}>Email</Button>
                    <Button size="sm" variant="outline" className="text-destructive" onClick={() => openDialog("suspend", user)}>Suspend</Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>KYC</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="w-[50px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-border">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-muted text-muted-foreground text-xs">{user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.status === "Active"
                              ? "border-green-500/30 bg-green-500/10 text-green-500"
                              : user.status === "Inactive"
                              ? "border-gray-500/30 bg-gray-500/10 text-gray-500"
                              : "border-red-500/30 bg-red-500/10 text-red-500"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.kycStatus === "Verified"
                              ? "border-green-500/30 bg-green-500/10 text-green-500"
                              : user.kycStatus === "Pending"
                              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                              : "border-red-500/30 bg-red-500/10 text-red-500"
                          }
                        >
                          {user.kycStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-foreground">{user.balance}</TableCell>
                      <TableCell className="text-muted-foreground">{new Date(user.joinedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</TableCell>
                      <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openDialog("view", user)}><Eye className="mr-2 h-4 w-4" />View Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDialog("email", user)}><Mail className="mr-2 h-4 w-4" />Send Email</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500" onClick={() => openDialog("suspend", user)}><Ban className="mr-2 h-4 w-4" />Suspend User</DropdownMenuItem>
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
              {actionMode === "view" && "User Details"}
              {actionMode === "email" && "Send Email"}
              {actionMode === "suspend" && "Suspend User"}
              {actionMode === "export" && "Export Users"}
            </DialogTitle>
            <DialogDescription>
              {actionMode === "export"
                ? `Prepare ${filteredUsers.length} users for export.`
                : selected
                ? `${selected.name} · ${selected.email}`
                : "Select a user first."}
            </DialogDescription>
          </DialogHeader>

          {actionMode === "view" && selected && (
            <div className="rounded-lg border border-border bg-background/50 p-4 space-y-2 text-sm">
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Status</span><span className="text-foreground font-medium">{selected.status}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">KYC</span><span className="text-foreground font-medium">{selected.kycStatus}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Balance</span><span className="text-foreground font-medium">{selected.balance}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Last Active</span><span className="text-foreground font-medium">{selected.lastActive}</span></div>
            </div>
          )}

          {actionMode === "email" && selected && (
            <div className="space-y-2">
              <Label htmlFor="emailBody">Message</Label>
              <Textarea id="emailBody" value={emailBody} onChange={(e) => setEmailBody(e.target.value)} className="min-h-[120px]" />
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
                className={actionMode === "suspend" ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"}
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {actionMode === "email" && "Send Email"}
                {actionMode === "suspend" && "Confirm Suspension"}
                {actionMode === "export" && "Confirm Export"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
