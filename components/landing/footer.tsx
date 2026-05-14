'use client'

import Link from 'next/link'
import { Twitter, MessageCircle, Send, Github } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Copy Trading', href: '/marketplace' },
    { label: 'Strategies', href: '/strategies' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Contact', href: '/contact' },
  ],
  Resources: [
    { label: 'Help Center', href: '/help' },
    { label: 'API Docs', href: '/docs' },
    { label: 'Blog', href: '/blog' },
    { label: 'Community', href: '/community' },
  ],
  Legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Risk Disclosure', href: '/risk' },
    { label: 'Compliance', href: '/compliance' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: MessageCircle, href: 'https://discord.com', label: 'Discord' },
  { icon: Send, href: 'https://telegram.org', label: 'Telegram' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid lg:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 block w-fit">
              <picture>
                <source media="(prefers-color-scheme: light)" srcSet="/Virexa_Light_Background.png" />
                <img
                  src="/Virexa_Dark_Background.png"
                  alt="Virexa"
                  className="h-auto w-[260px] rounded-lg border border-border/60"
                />
              </picture>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Virexa.com is a modern copy trading platform built to automate trading and help grow portfolios with professional strategies.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Risk Disclaimer */}
        <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20 mb-8">
          <p className="text-xs text-muted-foreground">
            <strong className="text-destructive">Risk Warning:</strong> Trading forex and derivatives carries a high level of risk to your capital. 
            You should only trade with money you can afford to lose. Trading derivatives may not be suitable for all investors. 
            Please ensure that you fully understand the risks involved before trading.
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Virexa.com. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
