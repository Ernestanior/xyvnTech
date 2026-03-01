'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Image from 'next/image';
import { ExternalLink, TrendingUp, Users, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function PortfolioSectionEnhanced() {
  const t = useTranslations('home.portfolio');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'website', label: t('categories.website') },
    { id: 'app', label: t('categories.app') },
    { id: 'ecommerce', label: t('categories.ecommerce') },
    { id: 'enterprise', label: t('categories.enterprise') },
  ];

  const projects = [
    {
      id: 1,
      title: t('projects.1.title'),
      category: 'ecommerce',
      client: t('projects.1.client'),
      description: t('projects.1.description'),
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1200&q=80',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis'],
      metrics: [
        { icon: TrendingUp, label: t('projects.1.metrics.conversion'), value: '230%' },
        { icon: Users, label: t('projects.1.metrics.dau'), value: '50万+' },
        { icon: Award, label: t('projects.1.metrics.satisfaction'), value: '99%' },
      ],
      highlights: Array.isArray(t.raw('projects.1.highlights')) ? t.raw('projects.1.highlights') : [],
      year: '2025',
      duration: t('projects.1.duration'),
    },
    {
      id: 2,
      title: t('projects.2.title'),
      category: 'enterprise',
      client: t('projects.2.client'),
      description: t('projects.2.description'),
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      tags: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'Docker'],
      metrics: [
        { icon: Users, label: t('projects.2.metrics.users'), value: '10万+' },
        { icon: TrendingUp, label: t('projects.2.metrics.efficiency'), value: '180%' },
        { icon: Award, label: t('projects.2.metrics.stability'), value: '99.9%' },
      ],
      highlights: Array.isArray(t.raw('projects.2.highlights')) ? t.raw('projects.2.highlights') : [],
      year: '2025',
      duration: t('projects.2.duration'),
    },
    {
      id: 3,
      title: t('projects.3.title'),
      category: 'app',
      client: t('projects.3.client'),
      description: t('projects.3.description'),
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80',
      tags: ['React Native', 'TensorFlow', 'Firebase', 'GraphQL'],
      metrics: [
        { icon: Users, label: t('projects.3.metrics.active'), value: '100万+' },
        { icon: TrendingUp, label: t('projects.3.metrics.retention'), value: '85%' },
        { icon: Award, label: t('projects.3.metrics.rating'), value: '4.8' },
      ],
      highlights: Array.isArray(t.raw('projects.3.highlights')) ? t.raw('projects.3.highlights') : [],
      year: '2025',
      duration: t('projects.3.duration'),
    },
    {
      id: 4,
      title: t('projects.4.title'),
      category: 'website',
      client: t('projects.4.client'),
      description: t('projects.4.description'),
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=80',
      tags: ['Next.js', 'WebRTC', 'AWS', 'Tailwind CSS'],
      metrics: [
        { icon: Users, label: t('projects.4.metrics.students'), value: '50万+' },
        { icon: TrendingUp, label: t('projects.4.metrics.completion'), value: '92%' },
        { icon: Award, label: t('projects.4.metrics.satisfaction'), value: '96%' },
      ],
      highlights: Array.isArray(t.raw('projects.4.highlights')) ? t.raw('projects.4.highlights') : [],
      year: '2025',
      duration: t('projects.4.duration'),
    },
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-32 relative">
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

        {/* 分类筛选 */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
              >
                {/* 项目图片 */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />
                  
                  {/* 年份标签 */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-sm">
                    {project.year}
                  </div>
                </div>

                {/* 项目信息 */}
                <div className="p-8">
                  {/* 客户和分类 */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-amber-400 font-medium">
                      {project.client}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className="text-sm text-gray-500">
                      {project.duration}
                    </span>
                  </div>

                  {/* 标题 */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* 核心亮点 */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">{t('highlights')}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {(project.highlights || []).map((highlight:any, idx:any) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 数据指标 */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/5 rounded-xl">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <metric.icon className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                        <div className="text-lg font-bold text-white mb-1">
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-500">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 技术栈 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/5 text-gray-400 text-xs rounded-full border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 查看详情按钮 */}
                  <button className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group/btn">
                    <span>{t('viewDetails')}</span>
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* 悬停效果 */}
                <div className="absolute inset-0 border-2 border-amber-500/0 group-hover:border-amber-500/50 rounded-2xl transition-all pointer-events-none" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* 底部 CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              {t('cta.question')}
            </p>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all"
            >
              {t('cta.button')}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
