'use client';

import { Smartphone, Zap, Users, Layers, Bell, Lock } from 'lucide-react';
import CTASection from '@/components/sections/CTASection';

export default function AppDevelopmentPage() {
  const features = [
    {
      icon: Smartphone,
      title: '原生体验',
      description: '使用原生技术开发，确保应用流畅度和性能达到最佳状态',
    },
    {
      icon: Layers,
      title: '跨平台方案',
      description: 'React Native 一套代码，同时支持 iOS 和 Android，降低开发成本',
    },
    {
      icon: Zap,
      title: '高性能优化',
      description: '启动速度、响应速度、内存占用全方位优化，提供丝滑体验',
    },
    {
      icon: Users,
      title: '用户体验',
      description: '遵循 iOS HIG 和 Material Design 规范，符合用户使用习惯',
    },
    {
      icon: Bell,
      title: '推送通知',
      description: '集成 APNs 和 FCM，实现精准的消息推送功能',
    },
    {
      icon: Lock,
      title: '数据安全',
      description: '本地加密存储，HTTPS 通信，生物识别认证，保护用户隐私',
    },
  ];

  const platforms = [
    {
      name: 'iOS 原生',
      desc: 'Swift / SwiftUI',
      features: ['完美适配 iPhone/iPad', 'App Store 上架', '支持最新 iOS 特性'],
    },
    {
      name: 'Android 原生',
      desc: 'Kotlin / Jetpack Compose',
      features: ['Material Design 3', 'Google Play 上架', '多设备适配'],
    },
    {
      name: 'React Native',
      desc: '跨平台方案',
      features: ['一套代码双端运行', '热更新支持', '降低开发成本'],
    },
  ];

  const process = [
    { step: '01', title: '产品规划', desc: '功能定义、用户画像、竞品分析' },
    { step: '02', title: 'UI/UX 设计', desc: '交互设计、视觉设计、设计规范' },
    { step: '03', title: '技术选型', desc: '原生 or 跨平台，架构设计' },
    { step: '04', title: '开发实现', desc: '前端开发、后端 API、数据库设计' },
    { step: '05', title: '测试优化', desc: '功能测试、性能测试、兼容性测试' },
    { step: '06', title: '上架发布', desc: 'App Store / Google Play 上架' },
  ];

  const cases = [
    {
      name: '电商 APP',
      desc: '商品浏览、购物车、支付、订单管理',
      stats: '日活 10万+',
    },
    {
      name: '社交 APP',
      desc: '即时通讯、动态发布、好友系统',
      stats: '用户 50万+',
    },
    {
      name: '工具 APP',
      desc: '效率工具、数据同步、离线使用',
      stats: '评分 4.8',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              打造用户喜爱的
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {' '}移动应用
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              原生性能，流畅体验，支持 iOS 和 Android 双平台
              <br />
              从产品设计到上架发布，提供一站式移动应用开发服务
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
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

      {/* Features */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              核心优势
            </h2>
            <p className="text-xl text-gray-400">
              专注移动端开发，打造高质量应用
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              支持平台
            </h2>
            <p className="text-xl text-gray-400">
              根据您的需求选择最合适的技术方案
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <h3 className="text-3xl font-bold text-white mb-2">{platform.name}</h3>
                <p className="text-purple-400 mb-6">{platform.desc}</p>
                <ul className="space-y-3">
                  {platform.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      {feature}
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
              开发流程
            </h2>
            <p className="text-xl text-gray-400">
              从想法到上架，全程专业指导
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
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
              成功案例
            </h2>
            <p className="text-xl text-gray-400">
              我们开发的应用深受用户喜爱
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cases.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <h3 className="text-2xl font-bold text-white mb-3">{item.name}</h3>
                <p className="text-gray-400 mb-4">{item.desc}</p>
                <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
                  <span className="text-purple-400 text-sm font-medium">{item.stats}</span>
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
