'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { StrategyCard } from '@/components/marketplace/strategy-card'
import { MarketplaceFilters } from '@/components/marketplace/marketplace-filters'
import { Search, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'all', label: 'All Strategies' },
  { id: 'conservative', label: 'Conservative' },
  { id: 'balanced', label: 'Balanced' },
  { id: 'aggressive', label: 'Aggressive' },
]

const strategies = [
  {
    id: 1,
    name: 'Alpha Momentum',
    trader: 'Michael Chen',
    avatar: 'MC',
    roi: 45.8,
    drawdown: 8.2,
    followers: 3420,
    risk: 'Medium' as const,
    badge: 'top-performer' as const,
    assets: ['EUR/USD', 'GBP/USD', 'USD/JPY'],
    minInvestment: 500,
    winRate: 68,
  },
  {
    id: 2,
    name: 'Safe Haven',
    trader: 'Sarah Williams',
    avatar: 'SW',
    roi: 22.4,
    drawdown: 3.1,
    followers: 5120,
    risk: 'Low' as const,
    badge: 'low-risk' as const,
    assets: ['EUR/USD', 'USD/CHF'],
    minInvestment: 250,
    winRate: 72,
  },
  {
    id: 3,
    name: 'Scalp Master',
    trader: 'David Park',
    avatar: 'DP',
    roi: 68.3,
    drawdown: 15.4,
    followers: 1890,
    risk: 'High' as const,
    badge: 'trending' as const,
    assets: ['GBP/JPY', 'EUR/JPY', 'XAU/USD'],
    minInvestment: 1000,
    winRate: 58,
  },
  {
    id: 4,
    name: 'Steady Growth',
    trader: 'Emma Wilson',
    avatar: 'EW',
    roi: 28.6,
    drawdown: 4.5,
    followers: 4230,
    risk: 'Low' as const,
    badge: null,
    assets: ['EUR/USD', 'GBP/USD'],
    minInvestment: 300,
    winRate: 75,
  },
  {
    id: 5,
    name: 'Gold Rush',
    trader: 'James Lee',
    avatar: 'JL',
    roi: 52.1,
    drawdown: 12.3,
    followers: 2680,
    risk: 'High' as const,
    badge: 'top-performer' as const,
    assets: ['XAU/USD', 'XAG/USD'],
    minInvestment: 750,
    winRate: 62,
  },
  {
    id: 6,
    name: 'FX Master',
    trader: 'Sophie Chen',
    avatar: 'SC',
    roi: 35.2,
    drawdown: 6.8,
    followers: 3150,
    risk: 'Medium' as const,
    badge: null,
    assets: ['EUR/USD', 'GBP/USD', 'AUD/USD'],
    minInvestment: 400,
    winRate: 70,
  },
]

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredStrategies = strategies.filter((strategy) => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'conservative' && strategy.risk === 'Low') ||
      (activeTab === 'balanced' && strategy.risk === 'Medium') ||
      (activeTab === 'aggressive' && strategy.risk === 'High')
    
    const matchesSearch = strategy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      strategy.trader.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesTab && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Copy Trading Marketplace</h1>
        <p className="text-muted-foreground">Discover and copy profitable trading strategies</p>
      </motion.div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search strategies or traders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-card border-border"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="h-12 gap-2"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && <MarketplaceFilters />}

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'shrink-0 h-10 px-4 rounded-full',
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            )}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Strategy Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStrategies.map((strategy, index) => (
          <motion.div
            key={strategy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StrategyCard strategy={strategy} />
          </motion.div>
        ))}
      </div>

      {filteredStrategies.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No strategies found matching your criteria</p>
        </div>
      )}
    </div>
  )
}
