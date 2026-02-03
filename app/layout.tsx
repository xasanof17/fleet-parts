import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Fleet Parts Intelligence",
    template: "%s | Fleet Parts Intelligence",
  },
  description:
    "Comprehensive fleet parts catalog with state-specific pricing, tax calculations, and detailed part information for fleet managers.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://fleetparts.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Fleet Parts Intelligence",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <footer className="bg-muted py-2 md:py-4 text-center text-xs sm:text-sm text-muted-foreground">
          <div className="flex flex-col space-y-2 md:flex-row items-center justify-between max-w-6xl w-full mx-auto px-5">
            <p>© {new Date().getFullYear()} Delta Prime - Fleet Parts - All rights reserved.</p>
            <p>Made with <b>George❤️</b></p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
