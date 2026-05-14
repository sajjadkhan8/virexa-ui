'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  LineChart,
  Wallet,
  Users,
  History,
  Bell,
  ShieldCheck,
  Trophy,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/marketplace', label: 'Copy Trading', icon: LineChart },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/referrals', label: 'Referrals', icon: Users },
  { href: '/transactions', label: 'Transactions', icon: History },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/kyc', label: 'KYC Verification', icon: ShieldCheck },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/settings', label: 'Settings', icon: Settings },
]

const bottomItems = [
  { href: '/help', label: 'Help Center', icon: HelpCircle },
  { href: '/login', label: 'Logout', icon: LogOut },
]

interface DashboardSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname()

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/Virexa_App_Icon.png"
            alt="Virexa logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg border border-primary/20"
          />
          <span className="text-lg font-bold text-foreground">Virexa<span className="text-primary">.com</span></span>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Items */}
      <div className="px-4 py-4 border-t border-border space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </div>

      {/* User Card */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col bg-card border-r border-border">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 w-64 bg-card border-r border-border z-50"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
