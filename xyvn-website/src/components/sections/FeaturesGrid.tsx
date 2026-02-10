'use client';

import { motion } from 'framer-motion';
import { 
  Palette, 
  Code2, 
  Smartphone, 
  Rocket, 
  Shield, 
  Zap,
  Users,
  TrendingUp 
} from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

export default function FeaturesGrid() {
  const features = [
    {
      icon: Palette,
      title: '精美设计',
      description: '现代化的 UI/UX 设计，提升品牌形象',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Code2,
      title: '代码质量',
      description: '严格的代码规范，易于维护和扩展',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Smartphone,
      title: '响应式设计',
      description: '完美适配所有设备，提供一致体验',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Rocket,
      title: '极速性能',
      description: '优化加载速度，提升用户体验',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Shield,
      title: '安全可靠',
      description: '企业级安全防护，保障数据安全',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Zap,
      title: '快速交付',
      description: '敏捷开发流程，按时交付项目',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Users,
      title: '专业团队',
      description: '经验丰富的技术专家，提供专业服务',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: TrendingUp,
      title: '持续优化',
      description: '长期技术支持，持续改进产品',
      gradient: 'from-teal-500 to-cyan-500',
    },
  ];

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4"
            >
              <span className="text-blue-400 text-sm font-medium">核心优势</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              为什么选择我们
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              专业的技术团队，完善的服务体系，为您的项目保驾护航
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-full">
                  {/* 渐变背景 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* 图标 */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* 标题 */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* 装饰线 */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
