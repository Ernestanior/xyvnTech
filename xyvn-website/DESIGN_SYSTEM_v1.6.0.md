# 🎨 XYVN 设计系统 v1.6.0

> 统一的设计语言和组件规范

**版本**: v1.6.0  
**更新日期**: 2026-02-08  
**维护者**: XYVN 设计团队

---

## 📐 设计原则

### 1. 简约而不简单
- 去除冗余元素，保留核心功能
- 注重细节打磨，追求极致体验
- 清晰的信息架构，直观的交互逻辑

### 2. 功能与美学并重
- 美观的视觉设计，流畅的交互体验
- 高效的信息传达，愉悦的使用感受
- 技术与艺术的完美结合

### 3. 以用户为中心
- 理解用户需求，优化用户路径
- 降低使用门槛，提供即时反馈
- 持续迭代优化，提升用户满意度

---

## 🎨 色彩系统

### 主色调 (Primary)
```css
/* 蓝色系 */
--blue-400: #60A5FA;
--blue-500: #3B82F6;
--blue-600: #2563EB;

/* 使用场景 */
- 主要按钮
- 链接文字
- 重要信息强调
- 品牌标识
```

### 辅助色 (Secondary)
```css
/* 紫色系 */
--purple-400: #C084FC;
--purple-500: #A855F7;
--purple-600: #9333EA;

/* 使用场景 */
- 渐变效果
- 装饰元素
- 次要按钮
- 图标高亮
```

### 强调色 (Accent)
```css
/* 粉色系 */
--pink-400: #F472B6;
--pink-500: #EC4899;
--pink-600: #DB2777;

/* 使用场景 */
- 渐变终点
- 特殊标记
- 促销信息
- 视觉焦点
```

### 中性色 (Neutral)
```css
/* 灰色系 */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;

/* 使用场景 */
- 背景色
- 文字颜色
- 边框颜色
- 分隔线
```

### 功能色 (Functional)
```css
/* 成功 */
--green-400: #4ADE80;
--green-500: #22C55E;

/* 警告 */
--yellow-400: #FACC15;
--yellow-500: #EAB308;

/* 错误 */
--red-400: #F87171;
--red-500: #EF4444;

/* 信息 */
--cyan-400: #22D3EE;
--cyan-500: #06B6D4;
```

### 渐变色 (Gradients)
```css
/* 主渐变 */
.gradient-primary {
  background: linear-gradient(to right, #3B82F6, #A855F7);
}

/* 彩虹渐变 */
.gradient-rainbow {
  background: linear-gradient(to right, #3B82F6, #A855F7, #EC4899);
}

/* 背景渐变 */
.gradient-background {
  background: linear-gradient(to bottom right, #111827, #111827, #1F2937);
}
```

---

## 📝 字体系统

### 字体家族
```css
/* 主字体 */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* 代码字体 */
--font-mono: 'Fira Code', 'Courier New', monospace;
```

### 字体大小
```css
/* 标题 */
--text-5xl: 3rem;      /* 48px - 主标题 */
--text-4xl: 2.25rem;   /* 36px - 次标题 */
--text-3xl: 1.875rem;  /* 30px - 三级标题 */
--text-2xl: 1.5rem;    /* 24px - 四级标题 */
--text-xl: 1.25rem;    /* 20px - 五级标题 */

/* 正文 */
--text-lg: 1.125rem;   /* 18px - 大正文 */
--text-base: 1rem;     /* 16px - 标准正文 */
--text-sm: 0.875rem;   /* 14px - 小正文 */
--text-xs: 0.75rem;    /* 12px - 辅助文字 */
```

### 字重
```css
--font-light: 300;     /* 细体 */
--font-normal: 400;    /* 常规 */
--font-medium: 500;    /* 中等 */
--font-semibold: 600;  /* 半粗 */
--font-bold: 700;      /* 粗体 */
--font-extrabold: 800; /* 特粗 */
```

### 行高
```css
--leading-tight: 1.25;   /* 紧凑 */
--leading-normal: 1.5;   /* 标准 */
--leading-relaxed: 1.75; /* 宽松 */
```

---

## 📏 间距系统

### 基础间距
```css
--spacing-0: 0;
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
--spacing-20: 5rem;    /* 80px */
--spacing-24: 6rem;    /* 96px */
--spacing-32: 8rem;    /* 128px */
```

### 使用规范
- **xs (4px)**: 图标与文字间距
- **sm (8px)**: 小元素间距
- **md (16px)**: 标准元素间距
- **lg (24px)**: 区块内间距
- **xl (32px)**: 区块间间距
- **2xl (48px)**: 大区块间距

---

## 🔲 圆角系统

### 圆角大小
```css
--rounded-none: 0;
--rounded-sm: 0.25rem;   /* 4px - 小圆角 */
--rounded: 0.375rem;     /* 6px - 默认圆角 */
--rounded-md: 0.5rem;    /* 8px - 中等圆角 */
--rounded-lg: 0.75rem;   /* 12px - 大圆角 */
--rounded-xl: 1rem;      /* 16px - 特大圆角 */
--rounded-2xl: 1.5rem;   /* 24px - 超大圆角 */
--rounded-3xl: 2rem;     /* 32px - 巨大圆角 */
--rounded-full: 9999px;  /* 完全圆形 */
```

### 使用规范
- **sm (4px)**: 小按钮、标签
- **md (8px)**: 输入框、卡片
- **lg (12px)**: 大按钮、面板
- **xl (16px)**: 大卡片、模态框
- **2xl (24px)**: 特大卡片
- **full**: 圆形按钮、头像

---

## 🌑 阴影系统

### 阴影层级
```css
/* 基础阴影 */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);

/* 光晕效果 */
--shadow-glow-blue: 0 0 30px rgba(59, 130, 246, 0.5);
--shadow-glow-purple: 0 0 30px rgba(168, 85, 247, 0.5);
--shadow-glow-pink: 0 0 30px rgba(236, 72, 153, 0.5);
```

### 使用规范
- **sm**: 小卡片、标签
- **md**: 按钮、输入框
- **lg**: 卡片、面板
- **xl**: 模态框、弹窗
- **2xl**: 大型弹窗
- **glow**: 强调元素、CTA

---

## 🎭 动画系统

### 过渡时长
```css
--duration-75: 75ms;
--duration-100: 100ms;
--duration-150: 150ms;
--duration-200: 200ms;
--duration-300: 300ms;
--duration-500: 500ms;
--duration-700: 700ms;
--duration-1000: 1000ms;
```

### 缓动函数
```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 预设动画
```css
/* 淡入 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 上滑 */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 浮动 */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* 光晕 */
@keyframes glow {
  from {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  }
  to {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.8),
                0 0 40px rgba(147, 51, 234, 0.5);
  }
}

/* 渐变移动 */
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 闪烁 */
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
```

---

## 🧩 组件规范

### 按钮 (Button)

#### 主要按钮
```tsx
<button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all">
  开始合作
</button>
```

#### 次要按钮
```tsx
<button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 transition-all">
  了解更多
</button>
```

#### 文字按钮
```tsx
<button className="text-blue-400 hover:text-blue-300 transition-colors">
  查看详情 →
</button>
```

### 卡片 (Card)

#### 基础卡片
```tsx
<div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
  {/* 内容 */}
</div>
```

#### 悬停上浮卡片
```tsx
<motion.div
  whileHover={{ y: -10 }}
  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
>
  {/* 内容 */}
</motion.div>
```

### 输入框 (Input)

#### 文本输入
```tsx
<input
  type="text"
  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
  placeholder="请输入..."
/>
```

#### 文本域
```tsx
<textarea
  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
  rows={4}
  placeholder="请输入..."
/>
```

### 标签 (Tag)

#### 基础标签
```tsx
<span className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-full border border-white/10">
  标签
</span>
```

#### 彩色标签
```tsx
<span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm rounded-full">
  标签
</span>
```

---

## 📱 响应式设计

### 断点系统
```css
/* 移动端 */
@media (max-width: 767px) {
  /* 手机样式 */
}

/* 平板 */
@media (min-width: 768px) and (max-width: 1023px) {
  /* 平板样式 */
}

/* 桌面端 */
@media (min-width: 1024px) {
  /* 桌面样式 */
}

/* 大屏 */
@media (min-width: 1280px) {
  /* 大屏样式 */
}
```

### 响应式规范
- **移动优先**: 从小屏幕开始设计
- **触摸友好**: 按钮最小 44x44px
- **可读性**: 移动端字体不小于 14px
- **简化布局**: 移动端单列布局

---

## ♿ 无障碍设计

### 颜色对比度
- 正文文字: 至少 4.5:1
- 大文字: 至少 3:1
- 图标: 至少 3:1

### 键盘导航
- 所有交互元素可通过 Tab 访问
- 焦点状态清晰可见
- 支持 Enter/Space 触发

### 语义化 HTML
- 使用正确的 HTML 标签
- 添加 aria-label 属性
- 提供替代文本

---

## 🎯 最佳实践

### 性能优化
1. 使用 CSS transform 而非 position
2. 避免频繁的 DOM 操作
3. 图片懒加载
4. 代码分割

### 可维护性
1. 组件化开发
2. 统一的命名规范
3. 详细的注释
4. 版本控制

### 用户体验
1. 即时反馈
2. 加载状态
3. 错误提示
4. 成功确认

---

## 📚 参考资源

### 设计工具
- Figma: 界面设计
- Adobe XD: 原型设计
- Sketch: UI 设计

### 开发工具
- VS Code: 代码编辑
- Chrome DevTools: 调试
- Lighthouse: 性能测试

### 学习资源
- Material Design
- Apple Human Interface Guidelines
- Ant Design
- Tailwind CSS

---

## 🔄 版本历史

### v1.6.0 (2026-02-08)
- 完善色彩系统
- 优化动画规范
- 新增组件规范
- 更新响应式设计

### v1.5.0 (2026-02-08)
- 初始版本
- 基础设计系统
- 核心组件规范

---

**维护者**: XYVN 设计团队  
**最后更新**: 2026-02-08  
**下次更新**: 根据项目需求持续迭代
