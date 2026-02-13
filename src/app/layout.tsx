'use client';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { usePathname } from 'next/navigation'
import NavbarEnhanced from '@/components/NavbarEnhanced'
import FooterEnhanced from '@/components/FooterEnhanced'
import SmoothScroll from '@/components/SmoothScroll'
import ParticleBackground from '@/components/ParticleBackground'
import MouseGlow from '@/components/MouseGlow'
import LoadingScreen from '@/components/LoadingScreen'
import StructuredData from '@/components/StructuredData'
import BackToTop from '@/components/BackToTop'
import AnnouncementBanner from '@/components/AnnouncementBanner'
import PageTransition from '@/components/PageTransition'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="zh-CN" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0F172A" />
        <StructuredData />
      </head>
      <body>
        {!isAdminRoute && (
          <>
            <ParticleBackground />
            <MouseGlow />
            <NavbarEnhanced />
          </>
        )}
        <main className="min-h-screen">{children}</main>
        {!isAdminRoute && (
          <>
            <FooterEnhanced />
            <BackToTop />
          </>
        )}
      </body>
    </html>
  )
}
