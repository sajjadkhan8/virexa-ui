"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, CheckCircle, XCircle, Clock, FileText, User, Shield } from "lucide-react"

const kycApplications = [
  {
    id: 1,
    user: "Alex Thompson",
    email: "alex.thompson@email.com",
    submittedDate: "2024-02-20",
    documentType: "Passport",
    country: "United States",
    status: "Pending"
  },
  {
    id: 2,
    user: "Sarah Chen",
    email: "sarah.chen@email.com",
    submittedDate: "2024-02-19",
    documentType: "National ID",
    country: "Singapore",
    status: "Pending"
  },
  {
    id: 3,
    user: "Michael Brown",
    email: "m.brown@email.com",
    submittedDate: "2024-02-18",
    documentType: "Driving License",
    country: "United Kingdom",
    status: "Under Review"
  },
  {
    id: 4,
    user: "Emma Wilson",
    email: "emma.w@email.com",
    submittedDate: "2024-02-17",
    documentType: "Passport",
    country: "Australia",
    status: "Approved"
  },
  {
    id: 5,
    user: "James Lee",
    email: "james.lee@email.com",
    submittedDate: "2024-02-16",
    documentType: "National ID",
    country: "South Korea",
    status: "Rejected"
  }
]

export default function AdminKYCPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<typeof kycApplications[0] | null>(null)

  const pendingCount = kycApplications.filter(a => a.status === "Pending" || a.status === "Under Review").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">KYC Verification</h1>
        <p className="text-muted-foreground">Review and verify user identity documents</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved Today</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rejected Today</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Verified</p>
                <p className="text-2xl font-bold text-foreground">8,432</p>
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
                placeholder="Search by name or email..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all">
              <TabsList className="bg-background border border-border">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {kycApplications.map((application) => (
              <div
                key={application.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border bg-background/50 gap-4"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {application.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{application.user}</p>
                    <p className="text-sm text-muted-foreground">{application.email}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {application.documentType}
                      </span>
                      <span>{application.country}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={
                      application.status === "Approved"
                        ? "border-green-500/30 bg-green-500/10 text-green-500"
                        : application.status === "Pending"
                        ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                        : application.status === "Under Review"
                        ? "border-blue-500/30 bg-blue-500/10 text-blue-500"
                        : "border-red-500/30 bg-red-500/10 text-red-500"
                    }
                  >
                    {application.status}
                  </Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>KYC Review - {application.user}</DialogTitle>
                        <DialogDescription>
                          Review the submitted documents and verify user identity
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Full Name</p>
                            <p className="font-medium text-foreground">{application.user}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium text-foreground">{application.email}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Document Type</p>
                            <p className="font-medium text-foreground">{application.documentType}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Country</p>
                            <p className="font-medium text-foreground">{application.country}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Submitted Documents</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-video rounded-lg border border-border bg-muted flex items-center justify-center">
                              <p className="text-sm text-muted-foreground">ID Front</p>
                            </div>
                            <div className="aspect-video rounded-lg border border-border bg-muted flex items-center justify-center">
                              <p className="text-sm text-muted-foreground">ID Back</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter className="gap-2">
                        <Button variant="outline" className="gap-2 text-red-500 hover:text-red-500">
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                        <Button className="gap-2 bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
