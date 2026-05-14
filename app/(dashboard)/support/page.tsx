"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  HelpCircle, 
  FileText,
  Search,
  Send,
  Clock
} from "lucide-react"

const faqs = [
  {
    question: "How does copy trading work?",
    answer: "Copy trading allows you to automatically replicate the trades of experienced traders. When a trader you're copying opens or closes a position, the same action is executed in your account proportionally based on your investment amount."
  },
  {
    question: "What is the minimum deposit amount?",
    answer: "The minimum deposit amount is $100. However, we recommend starting with at least $500 to properly diversify across multiple strategies."
  },
  {
    question: "How are trader fees calculated?",
    answer: "Traders earn a performance fee (typically 10-30%) on the profits they generate for copiers. This fee is only charged when trades are profitable."
  },
  {
    question: "Can I stop copying a strategy at any time?",
    answer: "Yes, you can stop copying any strategy at any time. When you stop, all open positions will be closed at market price and your funds will be returned to your wallet."
  },
  {
    question: "How long do withdrawals take?",
    answer: "Withdrawal processing times depend on the method: Bank transfers take 1-3 business days, cryptocurrency withdrawals are usually completed within 1-2 hours."
  },
  {
    question: "Is my money safe on this platform?",
    answer: "Yes, we use bank-grade security measures including 2FA, SSL encryption, and cold storage for cryptocurrencies. Client funds are held in segregated accounts."
  }
]

const tickets = [
  {
    id: "TKT-001234",
    subject: "Issue with withdrawal",
    status: "Open",
    priority: "High",
    created: "2024-02-20 14:30",
    lastUpdate: "2 hours ago"
  },
  {
    id: "TKT-001233",
    subject: "Question about copy trading fees",
    status: "Resolved",
    priority: "Medium",
    created: "2024-02-18 10:15",
    lastUpdate: "1 day ago"
  }
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground">Get help with your account and trading</p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">Chat with our support team</p>
            <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Online</Badge>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-4">support@forextrade.com</p>
            <Badge variant="outline">Response in 24h</Badge>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Phone Support</h3>
            <p className="text-sm text-muted-foreground mb-4">+1 (800) 123-4567</p>
            <Badge variant="outline">Mon-Fri, 9AM-6PM</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="faq" className="gap-2">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="tickets" className="gap-2">
            <FileText className="h-4 w-4" />
            My Tickets
          </TabsTrigger>
          <TabsTrigger value="new" className="gap-2">
            <Send className="h-4 w-4" />
            Submit Ticket
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions</CardDescription>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQs..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-border">
                    <AccordionTrigger className="text-foreground hover:text-accent">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>View and manage your support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border bg-background/50 gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                        <Badge
                          variant="outline"
                          className={
                            ticket.status === "Open"
                              ? "border-green-500/30 bg-green-500/10 text-green-500"
                              : "border-gray-500/30 bg-gray-500/10 text-gray-500"
                          }
                        >
                          {ticket.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            ticket.priority === "High"
                              ? "border-red-500/30 bg-red-500/10 text-red-500"
                              : "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                          }
                        >
                          {ticket.priority}
                        </Badge>
                      </div>
                      <p className="font-medium text-foreground">{ticket.subject}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        <span>Last updated {ticket.lastUpdate}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Submit a Support Ticket</CardTitle>
              <CardDescription>Describe your issue and we&apos;ll get back to you</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Brief description of your issue" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground">
                    <option value="">Select a category</option>
                    <option value="account">Account Issues</option>
                    <option value="deposit">Deposits</option>
                    <option value="withdrawal">Withdrawals</option>
                    <option value="trading">Trading / Copy Trading</option>
                    <option value="technical">Technical Issues</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    className="w-full min-h-[150px] px-3 py-2 rounded-md border border-border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Please describe your issue in detail..."
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-accent hover:bg-accent/90 gap-2">
                    <Send className="h-4 w-4" />
                    Submit Ticket
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
