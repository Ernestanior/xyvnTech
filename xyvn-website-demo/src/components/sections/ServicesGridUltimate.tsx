'use client';

import { motion } from 'framer-motion';
import { Code2, Smartphone, Palette, Rocket, Database, Shield, Zap, Globe } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GlowCard from '@/components/GlowCard';

export default function ServicesGridUltimate() {
  const services = [
    {
      icon: Code2,
      title: '网站开发',
      description: '响应式网站、企业官网、电商平台，打造极致的用户体验',
      features: ['响应式设计', 'SEO优化', '高性能', '易维护'],
      color: 'from-blue-500 to-cyan-500',
      delay: 0,
    },
    {
      icon: Smartphone,
      title: 'APP 开发',
      description: 'iOS、Android 原生应用，跨平台解决方案，流畅体验',
      features: ['原生开发', '跨平台', '高性能', '用户友好'],
      color: 'from-purple-500 to-pink-500',
      delay: 0.1,
    },
    {
      icon: Palette,
      title: 'UI/UX 设计',
      description: '用户研究、交互设计、视觉设计，创造令人难忘的体验',
      features: ['用户研究', '原型设计', '视觉设计', '可用性测试'],
      color: 'from-pink-500 to-rose-500',
      delay: 0.2,
    },
    {
      icon: Rocket,
      title: '产品策划',
      description: '从概念到落地，全流程产品规划和项目管理服务',
      features: ['需求分析', '产品规划', '项目管理', '敏捷开发'],
      color: 'from-orange-500 to-red-500',
      delay: 0.3,
    },
    {
      icon: Database,
      title: '后端开发',
      description: '高性能API、微服务架构、数据库设计，稳定可靠',
      features: ['API开发', '微服务', '数据库', '云部署'],
      color: 'from-green-500 to-emerald-500',
      delay: 0.4,
    },
    {
      icon: Shield,
      title: '安全保障',
      description: '数据加密、安全审计、漏洞修复，保护您的数字资产',
      features: ['数据加密', '安全审计', '漏洞修复', '合规认证'],
      color: 'from-indigo-500 to-purple-500',
      delay: 0.5,
    },
    {
      icon: Zap,
      title: '性能优化',
      description: '代码优化、CDN加速、缓存策略，提升用户体验',
      features: ['代码优化', 'CDN加速', '缓存策略', '监控告警'],
      color: 'from-yellow-500 to-orange-500',
      delay: 0.6,
    },
    {
      icon: Globe,
      title: '技术咨询',
      description: '技术选型、架构设计、团队培训，助力企业数字化',
      features: ['技术选型', '架构设计', '团队培训', '持续支持'],
      color: 'from-cyan-500 to-blue-500',
      delay: 0.7,
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6"
            >
              <span className="text-blue-400 text-sm font-medium">我们的服务</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              全方位数字化解决方案
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              从设计到开发，从上线到运维，我们提供一站式服务
            </p>
          </div>
        </ScrollReveal>

        {/* 服务网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={service.delay}>
              <GlowCard className="h-full">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 group"
                >
                  {/* 渐变背景 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`} />
                  
                  {/* 图标 */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    {/* 装饰圆点 */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                  </div>

                  {/* 标题 */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* 特性列表 */}
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: service.delay + idx * 0.1 }}
                        className="flex items-center gap-2 text-sm text-gray-500"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* 底部装饰线 */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl`} />
                </motion.div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>

        {/* 底部 CTA */}
        <ScrollReveal delay={0.8}>
          <div className="mt-20 text-center">
            <p className="text-gray-400 mb-6 text-lg">
              不确定选择哪个服务？让我们帮您分析
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              免费咨询
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
