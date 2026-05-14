"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  Briefcase,
  DollarSign,
  Settings,
  Shield,
  BarChart3,
  FileText,
  Bell,
  LogOut,
  TrendingUp,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const navigation = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ]
  },
  {
    title: "Management",
    items: [
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Strategies", href: "/admin/strategies", icon: Briefcase },
      { name: "Transactions", href: "/admin/transactions", icon: DollarSign },
      { name: "Withdrawals", href: "/admin/withdrawals", icon: DollarSign },
      { name: "KYC Verification", href: "/admin/kyc", icon: Shield },
      { name: "Fraud Monitoring", href: "/admin/fraud", icon: Shield },
      { name: "Commissions", href: "/admin/commissions", icon: DollarSign },
    ]
  },
  {
    title: "System",
    items: [
      { name: "Reports", href: "/admin/reports", icon: FileText },
      { name: "Notifications", href: "/admin/notifications", icon: Bell },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ]
  }
]

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex h-16 items-center justify-between gap-2 px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent">
            <TrendingUp className="h-5 w-5 text-background" />
          </div>
          <div>
            <span className="font-bold text-foreground">ForexTrade</span>
            <span className="text-xs text-muted-foreground block">Admin Panel</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                        isActive
                          ? "bg-accent/10 text-accent font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </>
  )

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 hidden lg:flex w-72 flex-col border-r border-border bg-card">
        {sidebarContent}
      </aside>

      {isOpen && (
        <>
          <button className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden" onClick={onClose} aria-label="Close sidebar" />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-card lg:hidden">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  )
}
