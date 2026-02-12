'use client';

import { motion } from 'framer-motion';
import { Code, Smartphone, Palette, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: '网站开发',
      description: '采用最新技术栈打造高性能网站，确保快速、安全、易维护',
      features: ['Next.js 全栈', 'TypeScript', '自动化部署'],
      gradient: 'from-blue-500 to-cyan-500',
      link: '/services/web-development',
    },
    {
      icon: Smartphone,
      title: 'APP 开发',
      description: '原生与跨平台完美结合，打造流畅的移动应用体验',
      features: ['iOS/Android', 'React Native', '离线支持'],
      gradient: 'from-purple-500 to-pink-500',
      link: '/services/app-development',
    },
    {
      icon: MessageSquare,
      title: '小程序开发',
      description: '快速触达亿级用户，深度融入社交生态',
      features: ['微信小程序', '支付宝', '抖音'],
      gradient: 'from-green-500 to-emerald-500',
      link: '/services/miniprogram',
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-[#0a0a0f]">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            我们的服务
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            提供全方位的数字产品开发服务，从设计到上线一站式解决
          </p>
        </motion.div>

        {/* 服务卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={service.link}>
                <div className="group relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                  {/* 渐变光晕 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  
                  {/* 图标 */}
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* 标题 */}
                  <h3 className="relative text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {service.title}
                  </h3>

                  {/* 描述 */}
                  <p className="relative text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* 特性标签 */}
                  <div className="relative flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-gray-400"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* 查看详情 */}
                  <div className="relative flex items-center gap-2 text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                    <span>查看详情</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
