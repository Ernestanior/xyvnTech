# 🚀 XYVN 官网 - 5 分钟快速开始

> 最快速度启动项目，立即看到效果

## 📦 你将得到什么

一个完整的、生产就绪的 Apple 风格官网，包含：
- ✨ 流畅的动画效果
- 📱 完美的响应式设计
- ⚡ 极致的性能优化
- 🎨 精美的 UI 设计
- 🔒 企业级安全性

---

## ⚡ 超快速启动（3 步）

### 1️⃣ 创建项目（1 分钟）

```bash
npx create-next-app@latest xyvn-website --typescript --tailwind --app
cd xyvn-website
```

### 2️⃣ 安装依赖（2 分钟）

```bash
npm install framer-motion @studio-freight/lenis lucide-react clsx tailwind-merge
```

### 3️⃣ 启动开发（1 分钟）

```bash
npm run dev
```

打开 http://localhost:3000 🎉

---

## 🎯 完整版启动（10 分钟）

### 前置要求

确保已安装：
- Node.js 18+ （[下载](https://nodejs.org/)）
- Git （[下载](https://git-scm.com/)）
- 代码编辑器（推荐 VSCode）

### 步骤 1：创建项目

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

### 步骤 2：安装所有依赖

```bash
# 核心依赖
npm install framer-motion @studio-freight/lenis

# UI 组件
npm install lucide-react clsx tailwind-merge

# 数据库（如需后端功能）
npm install @prisma/client
npm install -D prisma

# 表单处理
npm install react-hook-form zod @hookform/resolvers

# 邮件服务（如需联系表单）
npm install resend

# 分析工具
npm install @vercel/analytics @vercel/speed-insights
```

### 步骤 3：配置 Tailwind

编辑 `tailwind.config.ts`，添加 Apple 风格配置：

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          blue: '#0071E3',
          gray: '#1D1D1F',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
}

export default config
```

### 步骤 4：创建基础组件

创建 `src/components/Navbar.tsx`：

```typescript
'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">XYVN</Link>
        <div className="flex gap-8">
          <Link href="/services">服务</Link>
          <Link href="/portfolio">案例</Link>
          <Link href="/contact">联系</Link>
        </div>
      </div>
    </motion.nav>
  )
}
```

创建 `src/components/HeroSection.tsx`：

```typescript
'use client'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-semibold mb-6"
        >
          打造卓越数字体验
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-600 mb-12"
        >
          从创意到实现，我们将技术与设计完美融合
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="px-8 py-4 bg-blue-600 text-white rounded-full hover:scale-105 transition"
        >
          开始项目
        </motion.button>
      </div>
    </section>
  )
}
```

### 步骤 5：更新首页

编辑 `src/app/page.tsx`：

```typescript
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </>
  )
}
```

### 步骤 6：启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看效果！🎉

---

## 🎨 添加更多功能

### 添加平滑滚动

```bash
npm install @studio-freight/lenis
```

创建 `src/components/SmoothScroll.tsx`：

```typescript
'use client'
import { useEffect, ReactNode } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}
```

在 `layout.tsx` 中使用：

```typescript
import SmoothScroll from '@/components/SmoothScroll'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
```

### 添加滚动动画

创建 `src/components/ScrollReveal.tsx`：

```typescript
'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function ScrollReveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

使用方式：

```typescript
<ScrollReveal>
  <h2>这段内容会在滚动时淡入</h2>
</ScrollReveal>
```

---

## 📚 下一步

### 学习完整文档

1. **xyvn-website-specification.md** - 完整的技术规范
2. **IMPLEMENTATION_GUIDE.md** - 详细的实施指南
3. **PROJECT_CHECKLIST.md** - 项目检查清单

### 添加更多页面

```bash
# 创建页面目录
mkdir -p src/app/{services,portfolio,about,contact}

# 创建页面文件
touch src/app/services/page.tsx
touch src/app/portfolio/page.tsx
touch src/app/about/page.tsx
touch src/app/contact/page.tsx
```

### 添加数据库

```bash
# 安装 Prisma
npm install @prisma/client
npm install -D prisma

# 初始化
npx prisma init

# 编辑 prisma/schema.prisma
# 然后运行
npx prisma generate
npx prisma db push
```

### 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

或者：
1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 自动部署完成

---

## 🆘 遇到问题？

### 常见问题

**Q: 动画不工作？**
```bash
# 确保安装了 framer-motion
npm install framer-motion
```

**Q: 样式不生效？**
```bash
# 检查 Tailwind 配置
# 确保 content 路径正确
```

**Q: 构建失败？**
```bash
# 清除缓存重新构建
rm -rf .next
npm run build
```

### 获取帮助

- 📖 查看完整文档
- 💬 提交 Issue
- 📧 联系：tech@xyvn.com

---

## 🎯 快速命令参考

```bash
# 开发
npm run dev              # 启动开发服务器
npm run build            # 构建生产版本
npm run start            # 启动生产服务器

# 代码质量
npm run lint             # 检查代码
npm run format           # 格式化代码

# 数据库
npx prisma studio        # 数据库管理界面
npx prisma generate      # 生成 Prisma Client

# 部署
vercel                   # 部署到 Vercel
```

---

## ✨ 示例效果预览

访问这些网站获取灵感：
- [Apple](https://www.apple.com) - 设计标杆
- [Stripe](https://stripe.com) - 简洁现代
- [Linear](https://linear.app) - 流畅动画
- [Vercel](https://vercel.com) - 技术感

---

## 🎉 开始构建

现在你已经准备好了！

1. ✅ 项目已创建
2. ✅ 依赖已安装
3. ✅ 基础组件已就绪
4. ✅ 开发服务器已启动

**开始打造你的 Apple 风格官网吧！** 🚀

---

**提示**：
- 💡 先实现基础功能，再添加高级特性
- 🎨 保持设计简洁，注重细节
- ⚡ 持续优化性能
- 📱 始终测试移动端
- 🔄 定期提交代码

祝你构建成功！🎊
