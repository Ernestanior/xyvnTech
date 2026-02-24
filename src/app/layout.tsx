import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'ARVIX 科技',
  description: '专业的软件开发服务',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
