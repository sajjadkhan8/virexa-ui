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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import {
  MessageCircle,
  Mail,
  Phone,
  HelpCircle,
  FileText,
  Search,
  Send,
  Clock,
  Loader2,
  AlertTriangle,
} from "lucide-react"

const faqs = [
  {
    question: "How does copy trading work?",
    answer: "Copy trading allows you to automatically replicate the trades of experienced traders. When a trader you're copying opens or closes a position, the same action is executed in your account proportionally based on your investment amount.",
  },
  {
    question: "What is the minimum deposit amount?",
    answer: "The minimum deposit amount is $100. However, we recommend starting with at least $500 to properly diversify across multiple strategies.",
  },
  {
    question: "How are trader fees calculated?",
    answer: "Traders earn a performance fee (typically 10-30%) on the profits they generate for copiers. This fee is only charged when trades are profitable.",
  },
  {
    question: "Can I stop copying a strategy at any time?",
    answer: "Yes, you can stop copying any strategy at any time. When you stop, all open positions will be closed at market price and your funds will be returned to your wallet.",
  },
  {
    question: "How long do withdrawals take?",
    answer: "Withdrawal processing times depend on the method: Bank transfers take 1-3 business days, cryptocurrency withdrawals are usually completed within 1-2 hours.",
  },
  {
    question: "Is my money safe on this platform?",
    answer: "Yes, we use bank-grade security measures including 2FA, SSL encryption, and cold storage for cryptocurrencies. Client funds are held in segregated accounts.",
  },
]

type Ticket = {
  id: string
  subject: string
  status: "Open" | "Resolved"
  priority: "High" | "Medium" | "Low"
  created: string
  lastUpdate: string
}

const initialTickets: Ticket[] = [
  { id: "TKT-001234", subject: "Issue with withdrawal", status: "Open", priority: "High", created: "2024-02-20 14:30", lastUpdate: "2 hours ago" },
  { id: "TKT-001233", subject: "Question about copy trading fees", status: "Resolved", priority: "Medium", created: "2024-02-18 10:15", lastUpdate: "1 day ago" },
]

export default function SupportPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [tickets, setTickets] = useState(initialTickets)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [contactType, setContactType] = useState<"chat" | "email" | "phone">("chat")
  const [subject, setSubject] = useState("")
  const [category, setCategory] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const filteredFaqs = faqs.filter((faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()))

  const openContactDialog = (type: "chat" | "email" | "phone") => {
    setContactType(type)
    setIsContactDialogOpen(true)
  }

  const submitTicket = async () => {
    setSubmitError("")
    if (!subject.trim() || !category || !message.trim()) {
      setSubmitError("Please complete subject, category, and message.")
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    const nextTicket: Ticket = {
      id: `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
      subject,
      status: "Open",
      priority: "Medium",
      created: "Just now",
      lastUpdate: "Just now",
    }

    setTickets((current) => [nextTicket, ...current])
    setSubject("")
    setCategory("")
    setMessage("")
    setIsSubmitting(false)
    toast({ title: "Ticket submitted", description: `${nextTicket.id} has been created.` })
  }

  return (
    <div className="space-y-6">
      <Toaster />

      <div>
        <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground">Get help with your account and trading</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer" onClick={() => openContactDialog("chat") }>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4"><MessageCircle className="h-6 w-6 text-accent" /></div>
            <h3 className="font-semibold text-foreground mb-1">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">Chat with our support team</p>
            <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Online</Badge>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer" onClick={() => openContactDialog("email")}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4"><Mail className="h-6 w-6 text-blue-500" /></div>
            <h3 className="font-semibold text-foreground mb-1">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-4">support@forextrade.com</p>
            <Badge variant="outline">Response in 24h</Badge>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer" onClick={() => openContactDialog("phone")}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4"><Phone className="h-6 w-6 text-purple-500" /></div>
            <h3 className="font-semibold text-foreground mb-1">Phone Support</h3>
            <p className="text-sm text-muted-foreground mb-4">+1 (800) 123-4567</p>
            <Badge variant="outline">Mon-Fri, 9AM-6PM</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="faq" className="gap-2"><HelpCircle className="h-4 w-4" />FAQ</TabsTrigger>
          <TabsTrigger value="tickets" className="gap-2"><FileText className="h-4 w-4" />My Tickets</TabsTrigger>
          <TabsTrigger value="new" className="gap-2"><Send className="h-4 w-4" />Submit Ticket</TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions</CardDescription>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search FAQs..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length === 0 ? (
                <Empty className="border border-dashed border-border bg-background/50">
                  <EmptyHeader>
                    <EmptyMedia variant="icon"><HelpCircle className="size-5" /></EmptyMedia>
                    <EmptyTitle>No FAQ matches</EmptyTitle>
                    <EmptyDescription>Try another keyword to find relevant help articles.</EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-border">
                      <AccordionTrigger className="text-foreground hover:text-accent">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
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
              {tickets.length === 0 ? (
                <Empty className="border border-dashed border-border bg-background/50">
                  <EmptyHeader>
                    <EmptyMedia variant="icon"><FileText className="size-5" /></EmptyMedia>
                    <EmptyTitle>No tickets yet</EmptyTitle>
                    <EmptyDescription>Create a support ticket to start a conversation with support.</EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border bg-background/50 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                          <Badge variant="outline" className={ticket.status === "Open" ? "border-green-500/30 bg-green-500/10 text-green-500" : "border-gray-500/30 bg-gray-500/10 text-gray-500"}>{ticket.status}</Badge>
                          <Badge variant="outline" className={ticket.priority === "High" ? "border-red-500/30 bg-red-500/10 text-red-500" : ticket.priority === "Medium" ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500" : "border-blue-500/30 bg-blue-500/10 text-blue-500"}>{ticket.priority}</Badge>
                        </div>
                        <p className="font-medium text-foreground">{ticket.subject}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1"><Clock className="h-3 w-3" /><span>Last updated {ticket.lastUpdate}</span></div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => { setSelectedTicket(ticket); setIsTicketDialogOpen(true) }}>View Details</Button>
                    </div>
                  ))}
                </div>
              )}
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
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); void submitTicket() }}>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief description of your issue" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account">Account Issues</SelectItem>
                      <SelectItem value="deposit">Deposits</SelectItem>
                      <SelectItem value="withdrawal">Withdrawals</SelectItem>
                      <SelectItem value="trading">Trading / Copy Trading</SelectItem>
                      <SelectItem value="technical">Technical Issues</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" className="min-h-[150px]" placeholder="Please describe your issue in detail..." value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>

                {submitError && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button type="submit" className="bg-accent hover:bg-accent/90 gap-2" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    Submit Ticket
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTicket?.subject ?? "Ticket Details"}</DialogTitle>
            <DialogDescription>{selectedTicket ? `${selectedTicket.id} · ${selectedTicket.created}` : "Select a ticket first."}</DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="rounded-lg border border-border bg-background/50 p-4 space-y-2 text-sm">
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Status</span><span className="text-foreground font-medium">{selectedTicket.status}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Priority</span><span className="text-foreground font-medium">{selectedTicket.priority}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Last Update</span><span className="text-foreground font-medium">{selectedTicket.lastUpdate}</span></div>
            </div>
          )}
          <DialogFooter><Button variant="outline" onClick={() => setIsTicketDialogOpen(false)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {contactType === "chat" && "Start Live Chat"}
              {contactType === "email" && "Email Support"}
              {contactType === "phone" && "Phone Support"}
            </DialogTitle>
            <DialogDescription>
              {contactType === "chat" && "You are about to open a live chat session with support."}
              {contactType === "email" && "Send us an email at support@forextrade.com."}
              {contactType === "phone" && "Call us at +1 (800) 123-4567 during support hours."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>Close</Button>
            <Button onClick={() => { setIsContactDialogOpen(false); toast({ title: "Support action started", description: "Redirecting to support channel..." }) }}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
