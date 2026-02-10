# XYVN 官网 Demo

这是一个完整的、可运行的 XYVN 官网演示项目。

## 快速开始

### 1. 安装依赖

```bash
cd xyvn-website-demo
npm install
```

### 2. 运行开发服务器

```bash
npm run dev
```

### 3. 打开浏览器

访问 http://localhost:3000

## 项目结构

```
xyvn-website-demo/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 根布局
│   │   ├── page.tsx            # 首页
│   │   └── globals.css         # 全局样式
│   ├── components/
│   │   ├── Navbar.tsx          # 导航栏
│   │   ├── Footer.tsx          # 页脚
│   │   ├── SmoothScroll.tsx    # 平滑滚动
│   │   ├── ParticleBackground.tsx  # 粒子背景
│   │   ├── MouseGlow.tsx       # 鼠标光效
│   │   ├── sections/           # 页面区块
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── PortfolioSection.tsx
│   │   │   ├── TechStackSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── CTASection.tsx
│   │   └── ui/                 # UI 组件
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── ScrollReveal.tsx
│   └── lib/
│       └── utils.ts            # 工具函数
├── public/                     # 静态资源
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 已实现的功能

✅ 粒子背景系统
✅ 鼠标跟随光效
✅ 平滑滚动
✅ 响应式导航栏
✅ 玻璃态射效果
✅ 完整的页面结构

## 下一步

运行项目后，你将看到：
- 动态粒子背景
- 鼠标跟随的光晕效果
- 平滑的滚动体验
- 响应式导航栏
- 完整的页面布局

## 需要添加的内容

1. 在 `public/` 目录添加图片资源
2. 根据实际需求修改文案
3. 添加真实的项目案例数据
4. 集成后端 API（如需要）

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis (平滑滚动)
- Lucide React (图标)
