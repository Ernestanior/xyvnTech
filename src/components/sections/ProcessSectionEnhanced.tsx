'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb, Code, TestTube, Rocket, HeadphonesIcon } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ProcessSectionEnhanced() {
  const steps = [
    {
      icon: MessageSquare,
      title: '需求沟通',
      description: '深入了解您的业务需求和目标，制定初步方案',
      details: ['需求分析', '目标确定', '预算评估', '时间规划'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Lightbulb,
      title: '方案设计',
      description: '创意策划和原型设计，确保方案符合预期',
      details: ['创意策划', '原型设计', '技术选型', '方案确认'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Code,
      title: '开发实现',
      description: '敏捷开发，定期交付，保持透明沟通',
      details: ['敏捷开发', '代码审查', '定期交付', '进度跟踪'],
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: TestTube,
      title: '测试优化',
      description: '全面测试，性能优化，确保质量',
      details: ['功能测试', '性能测试', '安全测试', '兼容测试'],
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Rocket,
      title: '上线部署',
      description: '平滑上线，数据迁移，监控运行',
      details: ['部署上线', '数据迁移', '性能监控', '问题修复'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: HeadphonesIcon,
      title: '持续支持',
      description: '技术支持，功能迭代，长期维护',
      details: ['技术支持', '功能迭代', '性能优化', '安全更新'],
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              专业的开发流程
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              6个步骤，确保项目高质量交付
            </p>
          </div>
        </ScrollReveal>

        {/* 流程时间线 */}
        <div className="relative max-w-6xl mx-auto">
          {/* 连接线 */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 -translate-y-1/2" />

          {/* 步骤网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="relative"
                >
                  {/* 步骤编号 */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                    {index + 1}
                  </div>

                  {/* 卡片 */}
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
                    {/* 渐变背景 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`} />
                    
                    {/* 图标 */}
                    <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* 标题 */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>

                    {/* 描述 */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* 详细列表 */}
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          className="flex items-center gap-2 text-sm text-gray-500"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color}`} />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>

                    {/* 底部装饰线 */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl`} />
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* 底部说明 */}
        <ScrollReveal delay={0.6}>
          <div className="mt-20 text-center">
            <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-3xl">
              <h3 className="text-2xl font-bold text-white mb-4">
                为什么选择我们的流程？
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {[
                  { title: '透明沟通', desc: '每个阶段保持密切沟通' },
                  { title: '质量保证', desc: '严格的测试和审查流程' },
                  { title: '按时交付', desc: '合理规划，准时完成' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                    <div>
                      <div className="text-white font-semibold mb-1">{item.title}</div>
                      <div className="text-sm text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
