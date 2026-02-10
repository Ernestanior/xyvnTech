# 🚀 快速安装指南

## 方法一：自动安装（推荐）

### Windows (PowerShell)

```powershell
# 1. 进入项目目录
cd xyvn-website-demo

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

### Mac/Linux (Terminal)

```bash
# 1. 进入项目目录
cd xyvn-website-demo

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

## 方法二：手动创建所有文件

如果自动安装有问题，请按照以下步骤手动创建：

### 1. 创建项目结构

```
xyvn-website-demo/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── SmoothScroll.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── MouseGlow.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── PortfolioSection.tsx
│   │   │   ├── TechStackSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── CTASection.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── ScrollReveal.tsx
│   └── lib/
│       └── utils.ts
├── public/
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── postcss.config.js
```

### 2. 复制所有代码

请参考 `ALL_COMPONENTS_CODE.md` 文件，将所有代码复制到对应的文件中。

### 3. 安装依赖

```bash
npm install
```

### 4. 运行项目

```bash
npm run dev
```

## 访问网站

打开浏览器访问：http://localhost:3000

## 已实现的功能

✅ **视觉效果**
- 粒子背景系统（100个粒子实时连接）
- 鼠标跟随光效（500px 模糊光晕）
- 动态渐变背景
- 玻璃态射导航栏

✅ **交互效果**
- 平滑滚动（Lenis）
- 滚动触发动画
- 按钮悬停效果
- 卡片悬停动画

✅ **页面结构**
- 响应式导航栏
- Hero 区域
- 服务展示（4个服务卡片）
- 案例展示（4个项目）
- 技术栈展示（8个技术）
- 客户评价（3个评价）
- CTA 区域
- 完整页脚

✅ **响应式设计**
- 完美适配桌面、平板、手机
- 移动端导航菜单
- 自适应布局

## 性能指标

- ⚡ 首屏加载快速
- 🎨 60fps 流畅动画
- 📱 完美的移动端体验
- 🚀 优化的代码分割

## 下一步

1. **添加图片**
   - 在 `public/` 目录添加项目截图
   - 替换占位符图片

2. **修改文案**
   - 根据实际业务修改服务描述
   - 更新客户评价内容
   - 调整 CTA 文案

3. **添加功能**
   - 集成联系表单
   - 添加更多动画效果
   - 集成 CMS 系统

4. **优化**
   - 添加 SEO 元数据
   - 优化图片加载
   - 添加分析工具

## 常见问题

### Q: 粒子背景不显示？
A: 确保 `ParticleBackground.tsx` 已正确创建，并在 `layout.tsx` 中引入。

### Q: 平滑滚动不工作？
A: 检查 `@studio-freight/lenis` 是否正确安装：
```bash
npm install @studio-freight/lenis
```

### Q: 样式不生效？
A: 确保 `tailwind.config.ts` 和 `globals.css` 已正确配置。

### Q: 构建失败？
A: 清除缓存重新构建：
```bash
rm -rf .next
npm run build
```

## 技术支持

如有问题，请查看：
- 📖 完整文档：`ALL_COMPONENTS_CODE.md`
- 🎯 优先级路线图：`PRIORITY_ROADMAP.md`
- 📋 项目检查清单：`PROJECT_CHECKLIST.md`

---

**祝你开发顺利！** 🎉
