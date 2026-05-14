"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Search, 
  Book, 
  MessageCircle, 
  Mail, 
  Phone,
  ChevronRight,
  ChevronDown,
  PlayCircle,
  FileText,
  HelpCircle,
  Zap,
  Shield,
  CreditCard,
  Users,
  TrendingUp,
  ExternalLink
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const categories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Zap,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    articles: [
      "How to create an account",
      "Verifying your identity (KYC)",
      "Setting up 2-factor authentication",
      "Understanding the dashboard",
    ]
  },
  {
    id: "copy-trading",
    title: "Copy Trading",
    icon: TrendingUp,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    articles: [
      "How copy trading works",
      "Choosing the right strategy",
      "Setting your copy amount",
      "Managing your copied trades",
    ]
  },
  {
    id: "deposits-withdrawals",
    title: "Deposits & Withdrawals",
    icon: CreditCard,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    articles: [
      "Deposit methods and limits",
      "Withdrawal processing times",
      "Supported currencies",
      "Transaction fees explained",
    ]
  },
  {
    id: "account-security",
    title: "Account & Security",
    icon: Shield,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    articles: [
      "Protecting your account",
      "Password requirements",
      "Managing API keys",
      "Reporting suspicious activity",
    ]
  },
  {
    id: "referrals",
    title: "Referral Program",
    icon: Users,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    articles: [
      "How referrals work",
      "Commission structure",
      "Tracking your referrals",
      "Withdrawing referral earnings",
    ]
  },
]

const faqs = [
  {
    question: "What is copy trading and how does it work?",
    answer: "Copy trading allows you to automatically replicate the trades of experienced traders. When a trader you follow opens or closes a position, the same action is executed in your account proportionally based on your investment amount."
  },
  {
    question: "What is the minimum amount to start copy trading?",
    answer: "The minimum amount to start copy trading is $100. However, we recommend starting with at least $500 to properly diversify across multiple strategies and manage risk effectively."
  },
  {
    question: "How are profits and losses calculated?",
    answer: "Profits and losses are calculated proportionally based on your investment amount relative to the trader's portfolio. If you invest $1,000 copying a trader with $10,000, your results will be 10% of theirs."
  },
  {
    question: "Can I stop copying a trader at any time?",
    answer: "Yes, you can stop copying any trader at any time. When you stop copying, you have the option to either close all open positions immediately or let them run to completion."
  },
  {
    question: "How long do withdrawals take to process?",
    answer: "Withdrawal processing times depend on the method: Crypto withdrawals typically take 1-2 hours, bank transfers take 1-3 business days, and card withdrawals take 3-5 business days."
  },
  {
    question: "Is my money safe on the platform?",
    answer: "Yes, we use bank-grade security including SSL encryption, cold storage for crypto assets, and segregated client funds. We are also regulated and comply with all relevant financial regulations."
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
        <p className="text-muted-foreground">Find answers and get support</p>
      </div>

      {/* Search */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">How can we help you?</h2>
          <p className="text-muted-foreground mb-6">Search our knowledge base or browse categories below</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-background border-border text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Chat with support team</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Email Support</h3>
                <p className="text-sm text-muted-foreground">support@forexcopy.com</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Phone Support</h3>
                <p className="text-sm text-muted-foreground">+1 (800) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                      <category.icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <span className="text-base">{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, i) => (
                      <li key={i}>
                        <button className="w-full text-left text-sm text-muted-foreground hover:text-primary flex items-center justify-between group">
                          {article}
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Tutorials */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-primary" />
            Video Tutorials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Getting Started Guide", duration: "5:32" },
              { title: "How to Copy Trade", duration: "8:15" },
              { title: "Managing Your Portfolio", duration: "6:48" },
            ].map((video, index) => (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden bg-secondary aspect-video flex items-center justify-center cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:opacity-75 transition-opacity" />
                <div className="relative text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-medium text-foreground">{video.title}</p>
                  <p className="text-sm text-muted-foreground">{video.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-medium text-foreground">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Still Need Help */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Still need help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is available 24/7 to assist you with any questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Start Live Chat
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="w-4 h-4" />
              Submit a Ticket
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
