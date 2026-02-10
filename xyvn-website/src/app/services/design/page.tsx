'use client';

import { Palette, Eye, Layers, Sparkles, Target, Heart } from 'lucide-react';
import CTASection from '@/components/sections/CTASection';

export default function DesignPage() {
  const features = [
    {
      icon: Eye,
      title: '用户研究',
      description: '深入了解目标用户，通过访谈、问卷、数据分析，洞察用户真实需求',
    },
    {
      icon: Layers,
      title: '交互设计',
      description: '设计清晰的信息架构和流畅的交互流程，让用户轻松完成目标',
    },
    {
      icon: Palette,
      title: '视觉设计',
      description: '打造符合品牌调性的视觉方案，每一个像素都经过精心打磨',
    },
    {
      icon: Sparkles,
      title: '动效设计',
      description: '恰到好处的动画效果，提升产品的愉悦感和高级感',
    },
    {
      icon: Target,
      title: '可用性测试',
      description: '通过真实用户测试，发现问题并持续优化，确保设计有效性',
    },
    {
      icon: Heart,
      title: '设计系统',
      description: '建立完整的设计规范和组件库，保证产品体验的一致性',
    },
  ];

  const services = [
    {
      title: 'UI 设计',
      desc: '界面视觉设计',
      items: ['界面设计', '图标设计', '插画设计', '品牌视觉'],
    },
    {
      title: 'UX 设计',
      desc: '用户体验设计',
      items: ['用户研究', '信息架构', '交互设计', '原型设计'],
    },
    {
      title: '品牌设计',
      desc: '品牌视觉体系',
      items: ['Logo 设计', 'VI 设计', '品牌指南', '物料设计'],
    },
  ];

  const process = [
    {
      step: '01',
      title: '需求分析',
      desc: '了解业务目标、用户需求、竞品情况',
    },
    {
      step: '02',
      title: '用户研究',
      desc: '用户访谈、问卷调查、数据分析',
    },
    {
      step: '03',
      title: '信息架构',
      desc: '梳理功能结构、页面流程、内容层级',
    },
    {
      step: '04',
      title: '原型设计',
      desc: '低保真原型、交互流程、可用性测试',
    },
    {
      step: '05',
      title: '视觉设计',
      desc: '视觉风格、界面设计、设计规范',
    },
    {
      step: '06',
      title: '交付跟进',
      desc: '设计标注、切图输出、开发跟进',
    },
  ];

  const cases = [
    {
      title: '电商平台',
      desc: '提升转化率 180%',
      metrics: ['用户满意度 95%', '跳出率降低 40%', '客单价提升 60%'],
    },
    {
      title: '企业官网',
      desc: '品牌形象升级',
      metrics: ['访问时长 +120%', '询盘量 +200%', '品牌认知度 +85%'],
    },
    {
      title: '移动应用',
      desc: '用户留存率 85%',
      metrics: ['日活提升 150%', '使用时长 +90%', '应用评分 4.8'],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-rose-500/10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              设计驱动
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                {' '}业务增长
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              以用户为中心的设计理念，数据驱动的设计决策
              <br />
              打造令人难忘的产品体验，提升业务转化率
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-pink-500/50 transition-all"
              >
                开始咨询
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              设计能力
            </h2>
            <p className="text-xl text-gray-400">
              全方位的设计服务
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              设计服务
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <h3 className="text-3xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-pink-400 mb-6">{service.desc}</p>
                <ul className="space-y-3">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                      {item}
                    </li>
                  ))}
                </ul>
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
              设计流程
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <div key={index}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-4">
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

      {/* Cases */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              设计成果
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cases.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-pink-400 mb-6">{item.desc}</p>
                <ul className="space-y-2">
                  {item.metrics.map((metric, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
