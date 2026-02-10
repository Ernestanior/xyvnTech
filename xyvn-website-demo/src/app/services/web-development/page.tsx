'use client';

import { Code2, Zap, Search, Smartphone, Shield, TrendingUp } from 'lucide-react';
import CTASection from '@/components/sections/CTASection';

export default function WebDevelopmentPage() {
  const features = [
    {
      icon: Zap,
      title: '极速性能',
      description: '采用 Next.js 14 最新特性，服务端渲染 + 静态生成，首屏加载 < 1.5秒',
    },
    {
      icon: Search,
      title: 'SEO 优化',
      description: '完善的 SEO 策略，结构化数据，sitemap 自动生成，让您的网站更容易被搜索引擎发现',
    },
    {
      icon: Smartphone,
      title: '响应式设计',
      description: '完美适配所有设备，从手机到平板到桌面，提供一致的用户体验',
    },
    {
      icon: Shield,
      title: '安全可靠',
      description: 'HTTPS 加密，XSS/CSRF 防护，定期安全审计，保护您的数据安全',
    },
    {
      icon: TrendingUp,
      title: '易于扩展',
      description: '模块化架构设计，组件化开发，方便后期功能迭代和维护',
    },
    {
      icon: Code2,
      title: '现代技术栈',
      description: 'TypeScript + React + Tailwind CSS，代码质量有保障',
    },
  ];

  const techStack = [
    { name: 'Next.js 14', desc: '全栈框架' },
    { name: 'React 18', desc: '前端框架' },
    { name: 'TypeScript', desc: '类型安全' },
    { name: 'Tailwind CSS', desc: '样式方案' },
    { name: 'Framer Motion', desc: '动画库' },
    { name: 'Vercel', desc: '部署平台' },
  ];

  const process = [
    { step: '01', title: '需求分析', desc: '深入了解您的业务需求和目标用户' },
    { step: '02', title: '原型设计', desc: '制作交互原型，确认功能和流程' },
    { step: '03', title: '视觉设计', desc: '打造符合品牌调性的视觉方案' },
    { step: '04', title: '前端开发', desc: '使用最新技术栈进行开发' },
    { step: '05', title: '测试优化', desc: '多端测试，性能优化，确保质量' },
    { step: '06', title: '上线部署', desc: '域名配置，SSL证书，正式上线' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              打造高性能
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {' '}现代化网站
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              从企业官网到电商平台，从内容管理到 Web 应用
              <br />
              我们用最新的技术栈为您打造快速、安全、易维护的网站
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                开始咨询
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-all">
                查看案例
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              为什么选择我们
            </h2>
            <p className="text-xl text-gray-400">
              专业的技术团队，成熟的开发流程，保证项目质量
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              技术栈
            </h2>
            <p className="text-xl text-gray-400">
              使用业界最先进的技术和工具
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all"
              >
                <div className="text-2xl font-bold text-white mb-2">{tech.name}</div>
                <div className="text-sm text-gray-400">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              开发流程
            </h2>
            <p className="text-xl text-gray-400">
              标准化的开发流程，确保项目按时交付
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
