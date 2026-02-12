'use client';

import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import Button from '../ui/Button';

export default function PricingSection() {
  const plans = [
    {
      name: '基础版',
      icon: Star,
      price: '5万起',
      description: '适合初创企业和小型项目',
      features: [
        '响应式网站设计',
        '5-10 个页面',
        '基础 SEO 优化',
        '移动端适配',
        '3 个月免费维护',
        '基础数据统计',
      ],
      color: 'from-blue-500 to-cyan-500',
      popular: false,
    },
    {
      name: '专业版',
      icon: Zap,
      price: '10万起',
      description: '适合成长型企业和中型项目',
      features: [
        '高级定制设计',
        '10-20 个页面',
        '高级 SEO 优化',
        '动画和交互效果',
        '6 个月免费维护',
        '高级数据分析',
        '内容管理系统',
        '多语言支持',
      ],
      color: 'from-purple-500 to-pink-500',
      popular: true,
    },
    {
      name: '企业版',
      icon: Crown,
      price: '20万起',
      description: '适合大型企业和复杂项目',
      features: [
        '完全定制开发',
        '无限页面',
        '企业级 SEO',
        '高级动画特效',
        '12 个月免费维护',
        '实时数据看板',
        '高级 CMS 系统',
        '多语言 + 多站点',
        'API 集成',
        '专属技术顾问',
      ],
      color: 'from-orange-500 to-red-500',
      popular: false,
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              选择适合您的方案
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              透明的价格，专业的服务，为您的项目提供最佳性价比
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {/* 热门标签 */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full shadow-lg z-10">
                    最受欢迎
                  </div>
                )}

                {/* 卡片 */}
                <div className={`relative p-8 bg-white/5 backdrop-blur-sm border ${
                  plan.popular ? 'border-purple-500/50' : 'border-white/10'
                } rounded-2xl overflow-hidden h-full flex flex-col`}>
                  {/* 渐变背景 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 hover:opacity-10 transition-opacity duration-500`} />

                  {/* 图标 */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center mb-6`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* 标题 */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-400 text-sm mb-6">
                    {plan.description}
                  </p>

                  {/* 价格 */}
                  <div className="mb-8">
                    <span className={`text-4xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                      {plan.price}
                    </span>
                  </div>

                  {/* 功能列表 */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 按钮 */}
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    立即咨询
                  </Button>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* 底部说明 */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center space-y-4">
            <p className="text-gray-400">
              * 以上价格为参考起步价，具体费用根据项目需求评估
            </p>
            <p className="text-gray-500 text-sm">
              支持定制开发 · 灵活付款方式 · 长期技术支持
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
