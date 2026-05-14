'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const labelMap: Record<string, string> = {
  admin: 'Admin',
  dashboard: 'Dashboard',
  marketplace: 'Marketplace',
  wallet: 'Wallet',
  deposit: 'Deposit',
  withdraw: 'Withdraw',
  transfer: 'Transfer',
  referrals: 'Referrals',
  commissions: 'Commissions',
  tree: 'Tree',
  notifications: 'Notifications',
  onboarding: 'Onboarding',
  profile: 'Profile',
  settings: 'Settings',
  kyc: 'KYC',
  support: 'Support',
  help: 'Help',
  analytics: 'Analytics',
  leaderboard: 'Leaderboard',
  strategies: 'Strategies',
  transactions: 'Transactions',
  users: 'Users',
  reports: 'Reports',
  fraud: 'Fraud Monitoring',
  withdrawals: 'Withdrawals',
}

function formatSegment(segment: string) {
  if (labelMap[segment]) return labelMap[segment]
  if (/^\d+$/.test(segment)) return `#${segment}`
  return segment
    .split('-')
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(' ')
}

export function PageBreadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join('/')}`
          const isLast = index === segments.length - 1
          const label = formatSegment(segment)

          return (
            <Fragment key={href}>
              <BreadcrumbItem key={href}>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}



