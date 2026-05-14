import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'Virexa.com | Professional Copy Trading Platform',
  description: 'Trade smarter with automated copy trading, transparent analytics, and team rewards on Virexa.com.',
  keywords: ['forex', 'copy trading', 'trading platform', 'investment', 'forex strategies', 'automated trading'],
  openGraph: {
    title: 'Virexa.com | Professional Copy Trading Platform',
    description: 'Trade smarter with automated copy trading, transparent analytics, and team rewards on Virexa.com.',
    images: ['/Virexa_Dark_Background.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virexa.com | Professional Copy Trading Platform',
    description: 'Trade smarter with automated copy trading, transparent analytics, and team rewards on Virexa.com.',
    images: ['/Virexa_Dark_Background.png'],
  },
  icons: {
    icon: '/Virexa_App_Icon.png',
    shortcut: '/Virexa_App_Icon.png',
    apple: '/Virexa_App_Icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0f1a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
