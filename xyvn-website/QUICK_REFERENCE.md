# 🚀 XYVN 官网 - 快速参考指南

> 开发者快速上手文档

---

## 📁 项目结构

```
xyvn-website-demo/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # 根布局（元数据、全局组件）
│   │   ├── page.tsx             # 首页（所有区块）
│   │   ├── globals.css          # 全局样式
│   │   ├── sitemap.ts           # 站点地图生成
│   │   └── robots.txt           # 爬虫配置
│   │
│   ├── components/              # 组件目录
│   │   ├── Navbar.tsx           # 导航栏
│   │   ├── Footer.tsx           # 页脚
│   │   ├── ContactForm.tsx      # 联系表单 ⭐
│   │   ├── LoadingScreen.tsx    # 加载动画 ⭐
│   │   ├── StructuredData.tsx   # SEO 结构化数据 ⭐
│   │   ├── BackToTop.tsx        # 返回顶部 ⭐
│   │   ├── SmoothScroll.tsx     # 平滑滚动
│   │   ├── ParticleBackground.tsx # 粒子背景
│   │   ├── MouseGlow.tsx        # 鼠标光效
│   │   │
│   │   ├── sections/            # 页面区块
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── PortfolioSection.tsx
│   │   │   ├── TechStackSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── ContactSection.tsx  ⭐
│   │   │   └── CTASection.tsx
│   │   │
│   │   └── ui/                  # UI 组件
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── ScrollReveal.tsx
│   │
│   └── lib/
│       └── utils.ts             # 工具函数
│
├── public/                      # 静态资源
├── next.config.js              # Next.js 配置
├── tailwind.config.ts          # Tailwind 配置
├── tsconfig.json               # TypeScript 配置
└── package.json                # 依赖配置
```

---

## 🎨 组件使用指南

### 1. 联系表单

```tsx
import ContactForm from '@/components/ContactForm';

// 基础使用
<ContactForm />

// 表单字段
- name: 姓名（必填）
- email: 邮箱（必填）
- company: 公司名称
- phone: 联系电话
- projectType: 项目类型（下拉）
- budget: 预算范围（下拉）
- message: 项目描述（必填）

// 状态
- idle: 初始状态
- loading: 提交中
- success: 提交成功
- error: 提交失败
```

### 2. 加载动画

```tsx
import LoadingScreen from '@/components/LoadingScreen';

// 自动使用（已在 layout.tsx 中集成）
// 首次加载时自动显示
// 加载完成后自动隐藏

// 自定义使用
<LoadingScreen />
```

### 3. 返回顶部

```tsx
import BackToTop from '@/components/BackToTop';

// 自动使用（已在 layout.tsx 中集成）
// 滚动 > 500px 自动显示
// 点击平滑滚动到顶部

// 自定义使用
<BackToTop />
```

### 4. 结构化数据

```tsx
import StructuredData from '@/components/StructuredData';

// 在 <head> 中使用
<head>
  <StructuredData />
</head>

// 包含的 Schema
- Organization: 组织信息
- WebSite: 网站信息
- Service: 服务信息
```

### 5. 按钮组件

```tsx
import Button from '@/components/ui/Button';

// 基础使用
<Button>点击我</Button>

// 变体
<Button variant="primary">主要按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="outline">轮廓按钮</Button>

// 尺寸
<Button size="sm">小按钮</Button>
<Button size="md">中按钮</Button>
<Button size="lg">大按钮</Button>

// 带图标
<Button>
  <Icon className="w-5 h-5" />
  按钮文字
</Button>
```

### 6. 卡片组件

```tsx
import Card from '@/components/ui/Card';

<Card>
  <h3>卡片标题</h3>
  <p>卡片内容</p>
</Card>

// 自动包含
- 玻璃态射背景
- 边框效果
- 悬停动画
```

### 7. 滚动动画

```tsx
import ScrollReveal from '@/components/ui/ScrollReveal';

<ScrollReveal>
  <div>滚动时淡入的内容</div>
</ScrollReveal>

// 延迟
<ScrollReveal delay={0.2}>
  <div>延迟 0.2 秒淡入</div>
</ScrollReveal>
```

---

## 🎯 常用代码片段

### 添加新的页面区块

```tsx
// 1. 创建组件
// src/components/sections/NewSection.tsx
'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';

export default function NewSection() {
  return (
    <section id="new-section" className="py-32">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-white mb-6">
            新区块标题
          </h2>
          <p className="text-gray-400">
            区块内容
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

// 2. 在 page.tsx 中导入
import NewSection from '@/components/sections/NewSection';

export default function Home() {
  return (
    <>
      {/* 其他区块 */}
      <NewSection />
    </>
  );
}
```

### 添加导航链接

```tsx
// src/components/Navbar.tsx

const navLinks = [
  { name: '首页', href: '#hero' },
  { name: '服务', href: '#services' },
  { name: '案例', href: '#portfolio' },
  { name: '技术', href: '#tech' },
  { name: '联系', href: '#contact' },
  { name: '新链接', href: '#new-section' }, // 添加这里
];
```

### 修改颜色主题

```tsx
// tailwind.config.ts

export default {
  theme: {
    extend: {
      colors: {
        // 修改主色调
        apple: {
          blue: '#0071E3',    // 改成你的颜色
          gray: '#1D1D1F',
        },
      },
    },
  },
};
```

### 添加新的服务

```tsx
// src/components/sections/ServicesSection.tsx

const services = [
  // 现有服务...
  {
    icon: NewIcon,
    title: '新服务',
    description: '服务描述',
    features: ['特点1', '特点2', '特点3'],
  },
];
```

### 添加新的案例

```tsx
// src/components/sections/PortfolioSection.tsx

const projects = [
  // 现有案例...
  {
    title: '新项目',
    description: '项目描述',
    image: 'https://images.unsplash.com/photo-xxx',
    tags: ['标签1', '标签2'],
  },
];
```

---

## 🔧 配置文件说明

### next.config.js

```js
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // 允许的图片域名
      },
    ],
  },
}
```

### tailwind.config.ts

```ts
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // 扫描的文件
  ],
  theme: {
    extend: {
      colors: { /* 自定义颜色 */ },
      animation: { /* 自定义动画 */ },
    },
  },
}
```

### package.json

```json
{
  "scripts": {
    "dev": "next dev",           // 开发模式
    "build": "next build",       // 生产构建
    "start": "next start",       // 启动生产服务器
    "lint": "next lint"          // 代码检查
  }
}
```

---

## 🎨 样式系统

### Tailwind 常用类

```tsx
// 布局
<div className="container mx-auto px-6">     // 容器
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">  // 网格

// 间距
<div className="py-32">                      // 垂直内边距
<div className="mb-6">                       // 下外边距

// 文字
<h1 className="text-4xl font-bold text-white">  // 标题
<p className="text-gray-400">                    // 段落

// 背景
<div className="bg-white/5">                 // 半透明白色
<div className="bg-gradient-to-r from-blue-500 to-purple-500">  // 渐变

// 边框
<div className="border border-white/10 rounded-xl">  // 边框 + 圆角

// 效果
<div className="backdrop-blur-sm">           // 背景模糊
<div className="hover:scale-105 transition-all">  // 悬停缩放
```

### 自定义样式

```css
/* src/app/globals.css */

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

/* 自定义类 */
.glass-effect {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 🚀 开发命令

```bash
# 安装依赖
npm install

# 开发模式（热更新）
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint

# 清除缓存
rm -rf .next
npm run dev
```

---

## 🐛 常见问题

### 1. 图片加载失败

**问题**: `Invalid src prop ... hostname is not configured`

**解决**:
```js
// next.config.js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-image-domain.com', // 添加域名
    },
  ],
}
```

### 2. 样式不生效

**问题**: Tailwind 类不生效

**解决**:
```bash
# 清除缓存
rm -rf .next
npm run dev
```

### 3. 端口被占用

**问题**: `Port 3000 is already in use`

**解决**:
```bash
# 使用其他端口
npm run dev -- -p 3001
```

### 4. 类型错误

**问题**: TypeScript 类型错误

**解决**:
```tsx
// 添加类型注解
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  // ...
}
```

---

## 📚 学习资源

### 官方文档
- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

### 推荐阅读
- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind UI](https://tailwindui.com)

---

## 🎯 性能优化建议

### 图片优化
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="描述"
  width={800}
  height={600}
  loading="lazy"        // 懒加载
  placeholder="blur"    // 模糊占位
/>
```

### 代码分割
```tsx
import dynamic from 'next/dynamic';

// 动态导入组件
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>加载中...</p>,
  ssr: false, // 禁用服务端渲染
});
```

### 字体优化
```tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',      // 字体交换策略
  variable: '--font-inter',
});
```

---

## 📞 获取帮助

- 📖 查看完整文档：`README.md`
- 📝 查看更新日志：`CHANGELOG.md`
- 🎉 查看更新说明：`UPDATE_v1.1.0.md`
- 💬 技术支持：tech@xyvn.com

---

**快速参考指南 v1.1.0**  
**最后更新**: 2026-02-08
