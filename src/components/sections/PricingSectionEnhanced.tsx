'use client';

import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Sparkles, TrendingUp, Gift } from 'lucide-react';
import { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import Button from '../ui/Button';

export default function PricingSectionEnhanced() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  const plans = [
    {
      name: '基础版',
      icon: Star,
      monthlyPrice: 5,
      yearlyPrice: 50,
      description: '适合初创企业和小型项目',
      features: [
        '响应式网站设计',
        '5-10 个页面',
        '基础 SEO 优化',
        '移动端适配',
        '3 个月免费维护',
        '基础数据统计',
        '邮件支持',
        '工作日响应',
      ],
      color: 'from-amber-500 to-orange-500',
      popular: false,
      savings: 10,
    },
    {
      name: '专业版',
      icon: Zap,
      monthlyPrice: 10,
      yearlyPrice: 100,
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
        '优先技术支持',
        '7x12 在线支持',
      ],
      color: 'from-orange-500 to-red-500',
      popular: true,
      savings: 20,
    },
    {
      name: '企业版',
      icon: Crown,
      monthlyPrice: 20,
      yearlyPrice: 200,
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
        '7x24 专属支持',
        '源代码交付',
      ],
      color: 'from-violet-500 to-purple-500',
      popular: false,
      savings: 40,
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              选择适合您的方案
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              透明的价格，专业的服务，为您的项目提供最佳性价比
            </p>

            {/* 计费周期切换 */}
            <div className="inline-flex items-center gap-3 p-1.5 bg-white/5 border border-white/10 rounded-full">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                按月付费
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2.5 rounded-full font-medium transition-all relative ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                按年付费
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full">
                  省20%
                </span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredPlan(index)}
                onHoverEnd={() => setHoveredPlan(null)}
                className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {/* 热门标签 */}
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium rounded-full shadow-lg z-10 flex items-center gap-1"
                  >
                    <Sparkles className="w-4 h-4" />
                    最受欢迎
                  </motion.div>
                )}

                {/* 年付优惠标签 */}
                {billingCycle === 'yearly' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg z-10"
                  >
                    <div className="text-center">
                      <div className="text-white text-xs font-bold">省</div>
                      <div className="text-white text-sm font-bold">{plan.savings}万</div>
                    </div>
                  </motion.div>
                )}

                {/* 卡片 */}
                <div className={`relative p-8 bg-white/5 backdrop-blur-sm border ${
                  plan.popular ? 'border-orange-500/50 shadow-2xl shadow-orange-500/20' : 'border-white/10'
                } rounded-3xl overflow-hidden h-full flex flex-col transition-all duration-300 ${
                  hoveredPlan === index ? 'shadow-2xl' : ''
                }`}>
                  {/* 渐变背景 */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredPlan === index ? 0.15 : 0 }}
                    className={`absolute inset-0 bg-gradient-to-br ${plan.color}`}
                  />

                  {/* 装饰圆点 */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <div className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r ${plan.color}`} />
                    <div className={`absolute top-8 right-8 w-3 h-3 rounded-full bg-gradient-to-r ${plan.color}`} />
                    <div className={`absolute top-12 right-12 w-2 h-2 rounded-full bg-gradient-to-r ${plan.color}`} />
                  </div>

                  {/* 图标 */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6 relative z-10`}
                  >
                    <plan.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* 标题 */}
                  <h3 className="text-2xl font-bold text-white mb-2 relative z-10">
                    {plan.name}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-400 text-sm mb-6 relative z-10">
                    {plan.description}
                  </p>

                  {/* 价格 */}
                  <div className="mb-8 relative z-10">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                        {getPrice(plan)}万
                      </span>
                      <span className="text-gray-500 text-sm">
                        / {billingCycle === 'monthly' ? '月' : '年'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 flex items-center gap-2 text-sm"
                      >
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium">
                          相比月付节省 {plan.savings}万
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* 功能列表 */}
                  <ul className="space-y-4 mb-8 flex-grow relative z-10">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3 group"
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* 按钮 */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-10"
                  >
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
                      {plan.popular ? '立即开始' : '立即咨询'}
                    </Button>
                  </motion.div>

                  {/* 底部装饰线 */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredPlan === index ? 1 : 0 }}
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.color} origin-left`}
                  />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* 底部说明 */}
        <ScrollReveal delay={0.4}>
          <div className="mt-20 text-center space-y-6">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2 text-gray-400">
                <Gift className="w-5 h-5 text-amber-400" />
                <span>首次合作享 9 折优惠</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Check className="w-5 h-5 text-green-400" />
                <span>7 天无理由退款</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Sparkles className="w-5 h-5 text-orange-400" />
                <span>免费技术咨询</span>
              </div>
            </div>
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
