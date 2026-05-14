"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"

const referredUsers = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex.t@email.com",
    avatar: "/avatars/user1.jpg",
    joinedDate: "2024-01-15",
    status: "Active",
    tradingVolume: "$45,230",
    yourEarnings: "$452.30"
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah.c@email.com",
    avatar: "/avatars/user2.jpg",
    joinedDate: "2024-01-20",
    status: "Active",
    tradingVolume: "$32,100",
    yourEarnings: "$321.00"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@email.com",
    avatar: "/avatars/user3.jpg",
    joinedDate: "2024-02-01",
    status: "Inactive",
    tradingVolume: "$12,500",
    yourEarnings: "$125.00"
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.w@email.com",
    avatar: "/avatars/user4.jpg",
    joinedDate: "2024-02-10",
    status: "Active",
    tradingVolume: "$28,900",
    yourEarnings: "$289.00"
  },
  {
    id: 5,
    name: "James Lee",
    email: "james.l@email.com",
    avatar: "/avatars/user5.jpg",
    joinedDate: "2024-02-15",
    status: "Pending",
    tradingVolume: "$0",
    yourEarnings: "$0"
  }
]

export function ReferredUsers() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Referred Users</CardTitle>
        <CardDescription>
          Track your referred users and their trading activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>User</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Trading Volume</TableHead>
                <TableHead className="text-right">Your Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referredUsers.map((user) => (
                <TableRow key={user.id} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.joinedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        user.status === 'Active' 
                          ? 'border-green-500/30 bg-green-500/10 text-green-500'
                          : user.status === 'Inactive'
                          ? 'border-gray-500/30 bg-gray-500/10 text-gray-500'
                          : 'border-yellow-500/30 bg-yellow-500/10 text-yellow-500'
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    {user.tradingVolume}
                  </TableCell>
                  <TableCell className="text-right font-medium text-accent">
                    {user.yourEarnings}
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
