# XYVN 官网实施指南

> 从零到一的完整实施步骤，包含所有命令和配置

## 目录
- [第一阶段：项目初始化](#第一阶段项目初始化)
- [第二阶段：基础架构搭建](#第二阶段基础架构搭建)
- [第三阶段：核心功能开发](#第三阶段核心功能开发)
- [第四阶段：优化和部署](#第四阶段优化和部署)

---

## 第一阶段：项目初始化

### 1.1 创建项目

```bash
# 创建 Next.js 项目
npx create-next-app@latest xyvn-website \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd xyvn-website
```

### 1.2 安装核心依赖

```bash
# 动画库
npm install framer-motion @studio-freight/lenis

# 3D 库
npm install three @react-three/fiber @react-three/drei

# 表单处理
npm install react-hook-form zod @hookform/resolvers

# UI 组件
npm install lucide-react clsx tailwind-merge

# 数据库和 ORM
npm install @prisma/client
npm install -D prisma

# 邮件服务
npm install resend

# 分析和监控
npm install @vercel/analytics @vercel/speed-insights
npm install @sentry/nextjs
```

### 1.3 安装开发依赖

```bash
# 测试工具
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test

# 代码质量
npm install -D eslint-config-prettier prettier
npm install -D @typescript-eslint/eslint-plugin

# 其他工具
npm install -D @next/bundle-analyzer
```

### 1.4 初始化 Prisma

```bash
npx prisma init
```

编辑 `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Project {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  coverImage  String
  images      String[]
  category    Category
  tags        String[]
  featured    Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Category {
  WEBSITE
  APP
  DESIGN
  CONSULTING
}

model ContactSubmission {
  id          String   @id @default(cuid())
  name        String
  email       String
  company     String?
  phone       String?
  projectType String
  budget      String?
  message     String
  status      Status   @default(NEW)
  createdAt   DateTime @default(now())
}

enum Status {
  NEW
  CONTACTED
  IN_PROGRESS
  COMPLETED
}
```

生成 Prisma Client:

```bash
npx prisma generate
npx prisma db push
```

### 1.5 配置环境变量

创建 `.env.local`:

```bash
# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/xyvn"

# 应用
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# 邮件服务
RESEND_API_KEY="re_..."

# 分析
NEXT_PUBLIC_GA_ID="G-..."
SENTRY_DSN="https://..."
```

---

## 第二阶段：基础架构搭建

### 2.1 配置 Tailwind CSS

编辑 `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          blue: '#0071E3',
          gray: '#1D1D1F',
          lightgray: '#F5F5F7',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['80px', { lineHeight: '1.05', fontWeight: '600' }],
        'headline': ['56px', { lineHeight: '1.07', fontWeight: '600' }],
        'title': ['40px', { lineHeight: '1.1', fontWeight: '600' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

### 2.2 创建项目结构

```bash
# 创建目录结构
mkdir -p src/{components/{sections,ui,animations},lib,types,hooks,styles}
mkdir -p public/{images,videos,fonts}
```

项目结构：
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── about/
│   ├── services/
│   ├── portfolio/
│   ├── contact/
│   └── api/
│       └── contact/
│           └── route.ts
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   └── PortfolioSection.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   └── animations/
│       ├── ScrollReveal.tsx
│       └── SmoothScroll.tsx
├── lib/
│   ├── prisma.ts
│   ├── utils.ts
│   └── validations.ts
├── types/
│   └── index.ts
└── hooks/
    └── useScrollProgress.ts
```

### 2.3 创建工具函数

`src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

`src/lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 2.4 配置全局样式

`src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply font-sans antialiased;
  }
  
  ::selection {
    @apply bg-blue-600 text-white;
  }
}

@layer utilities {
  .glass-effect {
    backdrop-filter: saturate(180%) blur(20px);
    background: rgba(255, 255, 255, 0.72);
  }
  
  .glass-effect-dark {
    backdrop-filter: saturate(180%) blur(20px);
    background: rgba(29, 29, 31, 0.72);
  }
  
  .gpu-accelerated {
    transform: translateZ(0);
    will-change: transform;
  }
}
```

---

## 第三阶段：核心功能开发

### 3.1 创建布局组件

`src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/animations/SmoothScroll'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'XYVN - 打造卓越数字体验',
  description: '专注网站开发、APP开发和产品设计',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body>
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### 3.2 创建导航栏

`src/components/Navbar.tsx`:

```typescript
'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/services', label: '服务' },
    { href: '/portfolio', label: '案例' },
    { href: '/about', label: '关于' },
    { href: '/contact', label: '联系' },
  ]

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          XYVN
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-blue-600 transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button className="hidden md:block px-6 py-2 bg-blue-600 text-white rounded-full hover:scale-105 transition">
          开始合作
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t"
        >
          <ul className="px-8 py-4 space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="block py-2">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  )
}
```

### 3.3 创建首页

`src/app/page.tsx`:

```typescript
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <CTASection />
    </>
  )
}
```

### 3.4 创建 Hero Section

`src/components/sections/HeroSection.tsx`:

```typescript
'use client'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="h-screen relative flex items-center justify-center overflow-hidden">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-semibold mb-6"
        >
          打造卓越数字体验
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl text-gray-600 mb-12"
        >
          从创意到实现，我们将技术与设计完美融合
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 bg-blue-600 text-white rounded-full hover:scale-105 transition">
            了解更多
          </button>
          <button className="px-8 py-4 border-2 border-gray-900 rounded-full hover:scale-105 transition">
            开始项目
          </button>
        </motion.div>
      </div>

      {/* 滚动提示 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}
```

### 3.5 创建联系表单 API

`src/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.enum(['website', 'app', 'design', 'consulting']),
  budget: z.string().optional(),
  message: z.string().min(10),
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    // 保存到数据库
    const submission = await prisma.contactSubmission.create({
      data: {
        ...data,
      },
    })

    // 发送邮件
    await resend.emails.send({
      from: 'contact@xyvn.com',
      to: 'team@xyvn.com',
      subject: `新的项目咨询 - ${data.name}`,
      html: `
        <h2>新的项目咨询</h2>
        <p><strong>姓名：</strong>${data.name}</p>
        <p><strong>邮箱：</strong>${data.email}</p>
        <p><strong>项目类型：</strong>${data.projectType}</p>
        <p><strong>需求：</strong>${data.message}</p>
      `,
    })

    return NextResponse.json({ success: true, id: submission.id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: '提交失败，请稍后重试' },
      { status: 500 }
    )
  }
}
```

---

## 第四阶段：优化和部署

### 4.1 配置 Next.js

`next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
```

### 4.2 配置 package.json scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:e2e": "playwright test"
  }
}
```

### 4.3 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 生产部署
vercel --prod
```

或者通过 GitHub 集成：
1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 自动部署

### 4.4 配置域名

在 Vercel 项目设置中：
1. 进入 Domains
2. 添加自定义域名 `xyvn.com`
3. 配置 DNS 记录
4. 等待 SSL 证书自动配置

---

## 快速启动命令

```bash
# 克隆项目
git clone <repository-url>
cd xyvn-website

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入实际值

# 初始化数据库
npx prisma generate
npx prisma db push

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

---

## 常用命令速查

```bash
# 开发
npm run dev              # 启动开发服务器
npm run build            # 构建生产版本
npm run start            # 启动生产服务器

# 代码质量
npm run lint             # 运行 ESLint
npm run format           # 格式化代码
npm run type-check       # TypeScript 类型检查

# 数据库
npx prisma studio        # 打开数据库管理界面
npx prisma migrate dev   # 创建迁移
npx prisma db push       # 推送 schema 到数据库

# 测试
npm run test             # 运行单元测试
npm run test:e2e         # 运行 E2E 测试

# 部署
vercel                   # 预览部署
vercel --prod            # 生产部署
```

---

## 故障排查

### 问题：数据库连接失败
```bash
# 检查环境变量
echo $DATABASE_URL

# 测试连接
npx prisma db pull
```

### 问题：构建失败
```bash
# 清除缓存
rm -rf .next
npm run build
```

### 问题：类型错误
```bash
# 重新生成 Prisma Client
npx prisma generate

# 重启 TypeScript 服务器（VSCode）
Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

---

**完成！** 🎉

现在你有了一个完整的、生产就绪的 Apple 风格官网。
