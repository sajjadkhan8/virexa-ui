"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { ArrowDownLeft, ArrowUpRight, Clock, CheckCircle } from "lucide-react"

const commissionHistory = [
  {
    id: 1,
    date: "2024-02-20",
    referredUser: "Alex Thompson",
    type: "Trading Fee",
    amount: "$45.20",
    status: "Paid",
    txHash: "0x1234...5678"
  },
  {
    id: 2,
    date: "2024-02-19",
    referredUser: "Sarah Chen",
    type: "Copy Trade",
    amount: "$32.10",
    status: "Paid",
    txHash: "0x2345...6789"
  },
  {
    id: 3,
    date: "2024-02-18",
    referredUser: "Emma Wilson",
    type: "Trading Fee",
    amount: "$28.90",
    status: "Pending",
    txHash: null
  },
  {
    id: 4,
    date: "2024-02-17",
    referredUser: "Alex Thompson",
    type: "Deposit Bonus",
    amount: "$50.00",
    status: "Paid",
    txHash: "0x3456...7890"
  },
  {
    id: 5,
    date: "2024-02-16",
    referredUser: "Sarah Chen",
    type: "Copy Trade",
    amount: "$18.50",
    status: "Paid",
    txHash: "0x4567...8901"
  },
  {
    id: 6,
    date: "2024-02-15",
    referredUser: "James Lee",
    type: "Sign Up Bonus",
    amount: "$10.00",
    status: "Pending",
    txHash: null
  }
]

export function ReferralHistory() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Commission History</CardTitle>
        <CardDescription>
          Track all your referral commissions and payouts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Date</TableHead>
                <TableHead>Referred User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissionHistory.map((item) => (
                <TableRow key={item.id} className="border-border">
                  <TableCell className="text-muted-foreground">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {item.referredUser}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-background/50">
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {item.status === 'Paid' ? (
                        <>
                          <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                          <span className="text-green-500">Paid</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-3.5 w-3.5 text-yellow-500" />
                          <span className="text-yellow-500">Pending</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-accent">
                    +{item.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
