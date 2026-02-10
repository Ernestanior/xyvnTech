'use client';

import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Lightbulb, 
  Code, 
  TestTube, 
  Rocket, 
  HeadphonesIcon 
} from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

export default function ProcessSection() {
  const processes = [
    {
      icon: MessageSquare,
      title: '需求沟通',
      description: '深入了解您的业务目标和项目需求',
      details: ['需求分析', '目标确定', '预算评估'],
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1,
    },
    {
      icon: Lightbulb,
      title: '方案设计',
      description: '制定最适合的技术方案和设计方案',
      details: ['原型设计', '技术选型', '架构规划'],
      color: 'from-purple-500 to-pink-500',
      delay: 0.2,
    },
    {
      icon: Code,
      title: '开发实现',
      description: '高效开发，定期同步进度和演示',
      details: ['敏捷开发', '代码审查', '进度跟踪'],
      color: 'from-orange-500 to-red-500',
      delay: 0.3,
    },
    {
      icon: TestTube,
      title: '测试优化',
      description: '全面测试，确保产品质量和性能',
      details: ['功能测试', '性能优化', '兼容测试'],
      color: 'from-green-500 to-emerald-500',
      delay: 0.4,
    },
    {
      icon: Rocket,
      title: '上线部署',
      description: '平滑上线，确保稳定运行',
      details: ['部署上线', '数据迁移', '监控配置'],
      color: 'from-yellow-500 to-orange-500',
      delay: 0.5,
    },
    {
      icon: HeadphonesIcon,
      title: '持续支持',
      description: '提供长期技术支持和维护服务',
      details: ['技术支持', '功能迭代', '性能监控'],
      color: 'from-indigo-500 to-purple-500',
      delay: 0.6,
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4"
            >
              <span className="text-blue-400 text-sm font-medium">工作流程</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              专业的开发流程
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              从需求到上线，每一步都精心把控，确保项目成功
            </p>
          </div>
        </ScrollReveal>

        {/* 流程卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {processes.map((process, index) => (
            <ScrollReveal key={index} delay={process.delay}>
              <motion.div
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {/* 步骤编号 */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                  {index + 1}
                </div>

                {/* 卡片 */}
                <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-full">
                  {/* 渐变背景 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${process.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  {/* 图标 */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${process.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <process.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* 标题 */}
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {process.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-400 mb-6">
                    {process.description}
                  </p>

                  {/* 详细步骤 */}
                  <ul className="space-y-2">
                    {process.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${process.color} mr-2`} />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* 连接线（除了最后一个） */}
                  {index < processes.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* 底部 CTA */}
        <ScrollReveal delay={0.7}>
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              想了解更多关于我们的工作流程？
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
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              联系我们咨询
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
