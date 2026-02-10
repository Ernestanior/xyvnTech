# 所有组件完整代码

请按照以下步骤创建文件并复制代码：

## 1. 创建 src/components/Footer.tsx

```typescript
'use client'
import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* 公司信息 */}
          <div>
            <h3 className="text-2xl font-bold mb-4">XYVN</h3>
            <p className="text-gray-400 mb-6">
              打造卓越数字体验，专注网站和 APP 开发
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* 服务 */}
          <div>
            <h4 className="font-semibold mb-4">服务</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition">网站开发</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">APP 开发</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">产品设计</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">技术咨询</Link></li>
            </ul>
          </div>

          {/* 公司 */}
          <div>
            <h4 className="font-semibold mb-4">公司</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition">关于我们</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">团队介绍</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">加入我们</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">联系方式</Link></li>
            </ul>
          </div>

          {/* 资源 */}
          <div>
            <h4 className="font-semibold mb-4">资源</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition">博客</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">案例研究</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">文档</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">帮助中心</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} XYVN. 保留所有权利。
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
              隐私政策
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
              使用条款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

## 2. 创建 src/components/ui/ScrollReveal.tsx

```typescript
'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
}

export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

## 3. 创建 src/components/ui/Button.tsx

```typescript
'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-full transition-all duration-300'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800',
    outline: 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
```

## 4. 创建 src/components/ui/Card.tsx

```typescript
'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-white rounded-2xl p-8 shadow-lg',
        hover && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
```

## 5. 创建 src/components/sections/HeroSection.tsx

```typescript
'use client'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* 渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-20" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            打造卓越
            <span className="text-gradient block">数字体验</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
        >
          从创意到实现，我们将技术与设计完美融合
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg">了解更多</Button>
          <Button size="lg" variant="outline">开始项目</Button>
        </motion.div>
      </div>

      {/* 滚动提示 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8 text-gray-400" />
      </motion.div>
    </section>
  )
}
```

继续下一部分...


## 6. 创建 src/components/sections/ServicesSection.tsx

```typescript
'use client'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Card from '@/components/ui/Card'
import { Code, Smartphone, Palette, Zap } from 'lucide-react'

export default function ServicesSection() {
  const services = [
    {
      icon: <Code className="w-12 h-12 text-blue-600" />,
      title: '网站开发',
      description: '打造快速、美观、易用的网站，帮助您的业务在数字世界中脱颖而出',
      features: ['响应式设计', '极速加载', 'SEO 优化'],
    },
    {
      icon: <Smartphone className="w-12 h-12 text-purple-600" />,
      title: 'APP 开发',
      description: '原生性能，流畅体验。我们开发的 APP 让用户爱不释手',
      features: ['iOS 应用', 'Android 应用', '跨平台方案'],
    },
    {
      icon: <Palette className="w-12 h-12 text-pink-600" />,
      title: '产品设计',
      description: '每一个像素都经过精心打磨，每一次交互都令人愉悦',
      features: ['UI/UX 设计', '品牌设计', '交互设计'],
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-600" />,
      title: '技术咨询',
      description: '提供专业的技术咨询服务，助力您的数字化转型',
      features: ['架构设计', '性能优化', '技术选型'],
    },
  ]

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">我们的服务</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              提供全方位的数字产品开发服务
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card>
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## 7. 创建 src/components/sections/PortfolioSection.tsx

```typescript
'use client'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Card from '@/components/ui/Card'
import Image from 'next/image'

export default function PortfolioSection() {
  const projects = [
    {
      title: '电商平台',
      category: '网站开发',
      description: '现代化的电商解决方案，提升转化率 200%',
      image: '/placeholder-project-1.jpg',
      tags: ['Next.js', 'TypeScript', 'Tailwind'],
    },
    {
      title: '健身 APP',
      category: 'APP 开发',
      description: '智能健身追踪应用，用户留存率 95%',
      image: '/placeholder-project-2.jpg',
      tags: ['React Native', 'Node.js', 'MongoDB'],
    },
    {
      title: '企业官网',
      category: '网站开发',
      description: '高端企业官网，Lighthouse 分数 98',
      image: '/placeholder-project-3.jpg',
      tags: ['Next.js', 'Framer Motion', 'Prisma'],
    },
    {
      title: '社交平台',
      category: 'APP 开发',
      description: '创新的社交体验，日活用户 10万+',
      image: '/placeholder-project-4.jpg',
      tags: ['Flutter', 'Firebase', 'GraphQL'],
    },
  ]

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">精选案例</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              为各行业客户打造的成功案例
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="overflow-hidden p-0">
                <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100">
                  {/* 占位符 - 实际项目中替换为真实图片 */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    项目截图
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-semibold mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## 8. 创建 src/components/sections/TechStackSection.tsx

```typescript
'use client'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function TechStackSection() {
  const technologies = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Framework' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Prisma', category: 'ORM' },
    { name: 'Vercel', category: 'Deployment' },
  ]

  return (
    <section id="tech" className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">技术栈</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              使用业界领先的技术，确保产品快速、稳定、可扩展
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition">
                <div className="text-2xl font-bold mb-2">{tech.name}</div>
                <div className="text-sm text-gray-400">{tech.category}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## 9. 创建 src/components/sections/TestimonialsSection.tsx

```typescript
'use client'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Card from '@/components/ui/Card'
import { Star } from 'lucide-react'

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: '张总',
      company: '某科技公司 CEO',
      content: 'XYVN 团队的专业度和执行力令人印象深刻，他们不仅按时交付了高质量的产品，还提供了很多有价值的建议。',
      rating: 5,
    },
    {
      name: '李经理',
      company: '某电商平台负责人',
      content: '与 XYVN 合作是一次非常愉快的经历。他们的技术实力强，沟通顺畅，完全理解我们的需求。',
      rating: 5,
    },
    {
      name: '王总监',
      company: '某互联网公司产品总监',
      content: '项目上线后，用户反馈非常好。XYVN 在细节把控和用户体验方面做得很出色。',
      rating: 5,
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">客户评价</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              听听客户怎么说
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.company}</div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## 10. 创建 src/components/sections/CTASection.tsx

```typescript
'use client'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

export default function CTASection() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            准备开始您的项目？
          </h2>
          <p className="text-xl mb-12 opacity-90">
            让我们一起将您的想法变为现实
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              联系我们
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              查看更多案例
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="opacity-90">成功项目</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="opacity-90">合作客户</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="opacity-90">客户满意度</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

## 完成！

现在你已经有了所有组件的完整代码。

### 最后步骤：

1. 确保所有文件都已创建在正确的位置
2. 运行 `npm install` 安装依赖
3. 运行 `npm run dev` 启动开发服务器
4. 访问 http://localhost:3000

### 你将看到：

✅ 动态粒子背景
✅ 鼠标跟随光效
✅ 平滑滚动体验
✅ 响应式导航栏
✅ Hero 区域
✅ 服务展示
✅ 案例展示
✅ 技术栈展示
✅ 客户评价
✅ CTA 区域
✅ 完整页脚

### 下一步优化：

1. 添加真实的项目图片到 `public/` 目录
2. 根据实际需求修改文案
3. 添加更多交互动画
4. 集成后端 API
5. 添加联系表单功能

祝你开发顺利！🚀
