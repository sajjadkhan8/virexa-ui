'use client'

import { motion } from 'framer-motion'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export function MarketplaceFilters() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* ROI Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Monthly ROI (%)</Label>
          <div className="flex items-center gap-2">
            <Input type="number" placeholder="Min" className="h-10 bg-secondary" />
            <span className="text-muted-foreground">-</span>
            <Input type="number" placeholder="Max" className="h-10 bg-secondary" />
          </div>
        </div>

        {/* Drawdown Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Max Drawdown (%)</Label>
          <div className="flex items-center gap-2">
            <Input type="number" placeholder="Min" className="h-10 bg-secondary" />
            <span className="text-muted-foreground">-</span>
            <Input type="number" placeholder="Max" className="h-10 bg-secondary" />
          </div>
        </div>

        {/* Min Investment */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Min Investment ($)</Label>
          <div className="flex items-center gap-2">
            <Input type="number" placeholder="Min" className="h-10 bg-secondary" />
            <span className="text-muted-foreground">-</span>
            <Input type="number" placeholder="Max" className="h-10 bg-secondary" />
          </div>
        </div>

        {/* Followers */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Minimum Followers</Label>
          <Input type="number" placeholder="e.g., 100" className="h-10 bg-secondary" />
        </div>
      </div>

      {/* Asset Classes */}
      <div className="mt-6 space-y-3">
        <Label className="text-sm font-medium">Asset Classes</Label>
        <div className="flex flex-wrap gap-4">
          {['Major Pairs', 'Minor Pairs', 'Exotic Pairs', 'Gold/Silver', 'Indices', 'Crypto'].map((asset) => (
            <div key={asset} className="flex items-center gap-2">
              <Checkbox id={asset} />
              <label htmlFor={asset} className="text-sm text-muted-foreground cursor-pointer">
                {asset}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="mt-6 space-y-3">
        <Label className="text-sm font-medium">Sort By</Label>
        <div className="flex flex-wrap gap-2">
          {['Highest ROI', 'Lowest Drawdown', 'Most Followers', 'Newest', 'Win Rate'].map((sort) => (
            <Button key={sort} variant="outline" size="sm" className="h-9">
              {sort}
            </Button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Apply Filters
        </Button>
        <Button variant="ghost" className="text-muted-foreground">
          Reset All
        </Button>
      </div>
    </motion.div>
  )
}
