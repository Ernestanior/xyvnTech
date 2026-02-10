import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavbarEnhanced from '@/components/NavbarEnhanced'
import FooterEnhanced from '@/components/FooterEnhanced'
import SmoothScroll from '@/components/SmoothScroll'
import ParticleBackground from '@/components/ParticleBackground'
import MouseGlow from '@/components/MouseGlow'
import LoadingScreen from '@/components/LoadingScreen'
import StructuredData from '@/components/StructuredData'
import BackToTop from '@/components/BackToTop'
import AnnouncementBanner from '@/components/AnnouncementBanner'
import CursorFollower from '@/components/CursorFollower'
import PageTransition from '@/components/PageTransition'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://xyvn.com'),
  title: 'XYVN - 打造卓越数字体验 | 专业网站开发与APP开发',
  description: 'XYVN 是一家专注于网站开发、APP开发和产品设计的科技公司。我们提供高品质的数字解决方案，帮助企业实现数字化转型。',
  keywords: ['网站开发', 'APP开发', '产品设计', 'UI/UX设计', '数字化转型', 'XYVN'],
  authors: [{ name: 'XYVN' }],
  creator: 'XYVN',
  publisher: 'XYVN',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://xyvn.com',
    title: 'XYVN - 打造卓越数字体验',
    description: '专注网站开发、APP开发和产品设计的科技公司',
    siteName: 'XYVN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XYVN - 打造卓越数字体验',
    description: '专注网站开发、APP开发和产品设计的科技公司',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0F172A" />
        <StructuredData />
      </head>
      <body>
        <CursorFollower />
        <ParticleBackground />
        <MouseGlow />
        <NavbarEnhanced />
        <main className="min-h-screen">{children}</main>
        <FooterEnhanced />
        <BackToTop />
      </body>
    </html>
  )
}
