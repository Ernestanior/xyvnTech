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
import { useTranslations } from 'next-intl';

export default function FeaturesGrid() {
  const t = useTranslations('home.featuresGrid');
  
  const features = [
    {
      icon: Palette,
      titleKey: 'design',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Code2,
      titleKey: 'quality',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Smartphone,
      titleKey: 'responsive',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Rocket,
      titleKey: 'performance',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Shield,
      titleKey: 'security',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Zap,
      titleKey: 'delivery',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Users,
      titleKey: 'team',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: TrendingUp,
      titleKey: 'optimization',
      gradient: 'from-teal-500 to-cyan-500',
    },
  ];

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('subtitle')}
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
                    {t(`items.${feature.titleKey}.title`)}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {t(`items.${feature.titleKey}.description`)}
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
