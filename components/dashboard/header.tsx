'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  HelpCircle,
  Wallet,
} from 'lucide-react'

interface DashboardHeaderProps {
  onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const [notifications] = useState([
    { id: 1, title: 'Trade Executed', message: 'EUR/USD position opened at 1.0842', time: '2m ago' },
    { id: 2, title: 'Withdrawal Approved', message: 'Your withdrawal of $500 has been processed', time: '1h ago' },
    { id: 3, title: 'New Follower', message: 'Michael started copying your strategy', time: '3h ago' },
  ])

  return (
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-full px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Search */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search strategies, traders..."
              className="w-64 lg:w-80 pl-10 h-10 bg-secondary border-border"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Quick Deposit */}
          <Link href="/wallet/deposit" className="hidden sm:block">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              <Wallet className="w-4 h-4" />
              Deposit
            </Button>
          </Link>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Link href="/notifications" className="text-xs text-primary hover:underline">
                  View all
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium text-foreground">{notification.title}</span>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{notification.message}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-secondary">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground">
                  JD
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">$12,450.00</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help" className="flex items-center gap-2 cursor-pointer">
                  <HelpCircle className="w-4 h-4" />
                  Help Center
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login" className="flex items-center gap-2 cursor-pointer text-destructive">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
