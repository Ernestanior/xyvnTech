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
import { useTranslations } from 'next-intl';

export default function ProcessSection() {
  const t = useTranslations('home.process');
  
  const processes = [
    {
      icon: MessageSquare,
      processKey: 'communication',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1,
    },
    {
      icon: Lightbulb,
      processKey: 'design',
      color: 'from-purple-500 to-pink-500',
      delay: 0.2,
    },
    {
      icon: Code,
      processKey: 'development',
      color: 'from-orange-500 to-red-500',
      delay: 0.3,
    },
    {
      icon: TestTube,
      processKey: 'testing',
      color: 'from-green-500 to-emerald-500',
      delay: 0.4,
    },
    {
      icon: Rocket,
      processKey: 'launch',
      color: 'from-yellow-500 to-orange-500',
      delay: 0.5,
    },
    {
      icon: HeadphonesIcon,
      processKey: 'support',
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('subtitle')}
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
                    {t(`items.${process.processKey}.title`)}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-400 mb-6">
                    {t(`items.${process.processKey}.description`)}
                  </p>

                  {/* 详细步骤 */}
                  <ul className="space-y-2">
                    {(t.raw(`items.${process.processKey}.details`) as string[]).map((detail, idx) => (
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
              {t('cta.question')}
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
              {t('cta.button')}
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
