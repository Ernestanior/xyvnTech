'use client';

import { MessageSquare, Zap, Users, ShoppingCart, QrCode, TrendingUp } from 'lucide-react';
import CTASection from '@/components/sections/CTASection';

export default function MiniprogramPage() {
  const features = [
    {
      icon: MessageSquare,
      title: '微信生态',
      description: '深度融入微信生态，利用社交关系链，实现病毒式传播',
    },
    {
      icon: Zap,
      title: '即用即走',
      description: '无需下载安装，扫码即用，降低用户使用门槛',
    },
    {
      icon: Users,
      title: '用户基数大',
      description: '微信 12 亿用户，支付宝 10 亿用户，触达更多潜在客户',
    },
    {
      icon: ShoppingCart,
      title: '电商功能',
      description: '商品展示、购物车、支付、订单管理，完整电商闭环',
    },
    {
      icon: QrCode,
      title: '线下引流',
      description: '二维码扫码，连接线上线下，提升门店客流转化',
    },
    {
      icon: TrendingUp,
      title: '数据分析',
      description: '用户行为分析，转化漏斗，帮助优化运营策略',
    },
  ];

  const types = [
    {
      name: '微信小程序',
      desc: '12亿用户生态',
      features: ['社交分享', '微信支付', '公众号关联', '朋友圈广告'],
    },
    {
      name: '支付宝小程序',
      desc: '10亿用户基础',
      features: ['芝麻信用', '支付宝支付', '生活服务', '商家工具'],
    },
    {
      name: '抖音小程序',
      desc: '短视频流量',
      features: ['视频挂载', '直播带货', '内容电商', '兴趣推荐'],
    },
  ];

  const scenarios = [
    {
      title: '电商零售',
      desc: '商品展示、在线下单、会员管理、营销活动',
      icon: '🛍️',
    },
    {
      title: '餐饮外卖',
      desc: '菜单浏览、在线点餐、外卖配送、会员积分',
      icon: '🍜',
    },
    {
      title: '教育培训',
      desc: '课程展示、在线报名、视频学习、作业提交',
      icon: '📚',
    },
    {
      title: '预约服务',
      desc: '服务展示、在线预约、订单管理、评价系统',
      icon: '📅',
    },
    {
      title: '社区团购',
      desc: '团购活动、拼团功能、配送管理、分销系统',
      icon: '👥',
    },
    {
      title: '企业工具',
      desc: '内部管理、审批流程、数据统计、移动办公',
      icon: '💼',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              轻量级应用
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {' '}即用即走
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              微信、支付宝、抖音小程序开发
              <br />
              无需下载，扫码即用，快速触达亿级用户
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-green-500/50 transition-all"
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
              小程序优势
            </h2>
            <p className="text-xl text-gray-400">
              为什么选择小程序
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              支持平台
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {types.map((type, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <h3 className="text-3xl font-bold text-white mb-2">{type.name}</h3>
                <p className="text-green-400 mb-6">{type.desc}</p>
                <ul className="space-y-3">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              应用场景
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <div className="text-5xl mb-4">{scenario.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{scenario.title}</h3>
                <p className="text-gray-400">{scenario.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
