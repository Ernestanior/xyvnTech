'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Users, Award, Zap, Shield, Clock, CheckCircle2, Star, Quote, Play, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import HeroSectionEnhanced from '@/components/sections/HeroSectionEnhanced'
import FeaturesGrid from '@/components/sections/FeaturesGrid'
import ServicesSection from '@/components/sections/ServicesSection'
import StatsSection from '@/components/sections/StatsSection'
import ProcessSection from '@/components/sections/ProcessSection'
import PortfolioSectionEnhanced from '@/components/sections/PortfolioSectionEnhanced'
import TechStackSectionEnhanced from '@/components/sections/TechStackSectionEnhanced'
import TestimonialsSectionEnhanced from '@/components/sections/TestimonialsSectionEnhanced'
import PricingSection from '@/components/sections/PricingSection'
import FAQSection from '@/components/sections/FAQSection'
import ContactSection from '@/components/sections/ContactSection'
import CTASection from '@/components/sections/CTASection'
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Home() {
  const [activeTab, setActiveTab] = useState('innovation');

  return (
    <>
      <HeroSectionEnhanced />

      {/* Value Proposition */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                我们的
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {' '}核心优势
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                专业团队 · 创新技术 · 卓越品质 · 贴心服务
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: '快速交付',
                  desc: '敏捷开发流程，平均项目周期缩短 40%',
                  color: 'from-yellow-500 to-orange-500',
                  features: ['敏捷开发', '快速迭代', '按时交付', '灵活调整'],
                },
                {
                  icon: Shield,
                  title: '品质保证',
                  desc: '严格的质量控制，确保每个项目都达到最高标准',
                  color: 'from-blue-500 to-cyan-500',
                  features: ['代码审查', '自动化测试', '性能优化', '安全加固'],
                },
                {
                  icon: Users,
                  title: '专业团队',
                  desc: '80+ 资深工程师，平均 7 年行业经验',
                  color: 'from-purple-500 to-pink-500',
                  features: ['全栈开发', '设计团队', '产品经理', '技术顾问'],
                },
                {
                  icon: TrendingUp,
                  title: '持续优化',
                  desc: '项目上线后持续跟踪优化，确保长期成功',
                  color: 'from-green-500 to-emerald-500',
                  features: ['数据分析', '用户反馈', '功能迭代', '性能监控'],
                },
                {
                  icon: Award,
                  title: '行业认可',
                  desc: '多次获得行业大奖，客户满意度 98%',
                  color: 'from-pink-500 to-rose-500',
                  features: ['设计大奖', '技术创新', '客户好评', '行业标杆'],
                },
                {
                  icon: Clock,
                  title: '7x24 支持',
                  desc: '全天候技术支持，快速响应客户需求',
                  color: 'from-indigo-500 to-purple-500',
                  features: ['即时响应', '远程支持', '问题解决', '技术培训'],
                },
              ].map((advantage, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group overflow-hidden"
                  >
                    {/* 背景装饰 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${advantage.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    
                    {/* 图标 */}
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <advantage.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* 内容 */}
                    <h3 className="relative text-2xl font-bold text-white mb-3">{advantage.title}</h3>
                    <p className="relative text-gray-400 mb-6 leading-relaxed">{advantage.desc}</p>

                    {/* 特性列表 */}
                    <ul className="relative space-y-2">
                      {advantage.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                          <CheckCircle2 className={`w-4 h-4 bg-gradient-to-r ${advantage.color} text-transparent`} style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* 装饰元素 */}
                    <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${advantage.color} opacity-20 blur-2xl group-hover:scale-150 transition-transform`} />
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturesGrid />
      <ServicesSection />
      <StatsSection />

      {/* Interactive Showcase */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                我们的
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {' '}创新能力
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                探索我们在不同领域的专业能力
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { id: 'innovation', label: '技术创新', icon: '🚀' },
                { id: 'design', label: '设计美学', icon: '🎨' },
                { id: 'performance', label: '性能优化', icon: '⚡' },
                { id: 'security', label: '安全保障', icon: '🔒' },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12"
            >
              {activeTab === 'innovation' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">技术创新驱动</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      我们始终站在技术前沿，采用最新的开发框架和工具，为客户提供创新的解决方案。从 AI 集成到区块链应用，我们不断探索新技术的可能性。
                    </p>
                    <ul className="space-y-3">
                      {['AI 人工智能集成', '微服务架构设计', '云原生应用开发', '实时数据处理'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-8xl">
                      🚀
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl" />
                  </div>
                </div>
              )}

              {activeTab === 'design' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1 relative">
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center text-8xl">
                      🎨
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl blur-3xl" />
                  </div>
                  <div className="order-1 md:order-2">
                    <h3 className="text-3xl font-bold text-white mb-4">设计美学追求</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      我们相信好的设计不仅是美观的，更是有意义的。我们的设计团队专注于创造直观、优雅且富有创意的用户体验。
                    </p>
                    <ul className="space-y-3">
                      {['用户体验研究', '视觉设计系统', '交互动画设计', '品牌形象塑造'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'performance' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">性能极致优化</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      我们深知性能对用户体验的重要性。通过代码优化、缓存策略和 CDN 加速，确保应用快速响应，提供流畅体验。
                    </p>
                    <ul className="space-y-3">
                      {['代码分割与懒加载', 'CDN 全球加速', '数据库查询优化', '前端性能监控'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center text-8xl">
                      ⚡
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl blur-3xl" />
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1 relative">
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center text-8xl">
                      🔒
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-3xl" />
                  </div>
                  <div className="order-1 md:order-2">
                    <h3 className="text-3xl font-bold text-white mb-4">安全可靠保障</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      安全是我们的首要任务。从代码审查到渗透测试，我们采用多层安全策略，确保您的数据和用户信息得到最高级别的保护。
                    </p>
                    <ul className="space-y-3">
                      {['数据加密传输', '安全漏洞扫描', '权限管理系统', '定期安全审计'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <ProcessSection />
      <PortfolioSectionEnhanced />
      <TechStackSectionEnhanced />

      {/* Social Proof */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                客户的
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {' '}真实评价
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                听听他们怎么说
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: '专业的团队，高效的执行力，项目按时交付，效果超出预期！强烈推荐！',
                author: '张总',
                role: 'CEO',
                company: '某电商平台',
                avatar: '👨‍💼',
                rating: 5,
              },
              {
                quote: '从设计到开发都很专业，沟通顺畅，后期维护也很及时。合作非常愉快！',
                author: '李经理',
                role: 'CTO',
                company: '某科技公司',
                avatar: '👩‍💼',
                rating: 5,
              },
              {
                quote: '性价比很高，技术实力强，团队响应速度快。已经推荐给其他朋友了！',
                author: '王总',
                role: '创始人',
                company: '某教育机构',
                avatar: '👨‍🏫',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
                >
                  {/* 引号装饰 */}
                  <Quote className="w-12 h-12 text-blue-400/20 absolute top-6 right-6" />
                  
                  {/* 评分 */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* 评价内容 */}
                  <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                    "{testimonial.quote}"
                  </p>

                  {/* 作者信息 */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-white font-bold">{testimonial.author}</div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role} · {testimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSectionEnhanced />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <CTASection />
    </>
  )
}
