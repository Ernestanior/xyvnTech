'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function TestimonialsSectionEnhanced() {
  const t = useTranslations('home.testimonials');
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: t('items.1.name'),
      position: t('items.1.position'),
      company: t('items.1.company'),
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      rating: 5,
      content: t('items.1.content'),
      project: t('items.1.project'),
      tags: t.raw('items.1.tags'),
    },
    {
      id: 2,
      name: t('items.2.name'),
      position: t('items.2.position'),
      company: t('items.2.company'),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      rating: 5,
      content: t('items.2.content'),
      project: t('items.2.project'),
      tags: t.raw('items.2.tags'),
    },
    {
      id: 3,
      name: t('items.3.name'),
      position: t('items.3.position'),
      company: t('items.3.company'),
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      rating: 5,
      content: t('items.3.content'),
      project: t('items.3.project'),
      tags: t.raw('items.3.tags'),
    },
    {
      id: 4,
      name: t('items.4.name'),
      position: t('items.4.position'),
      company: t('items.4.company'),
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      rating: 5,
      content: t('items.4.content'),
      project: t('items.4.project'),
      tags: t.raw('items.4.tags'),
    },
    {
      id: 5,
      name: t('items.5.name'),
      position: t('items.5.position'),
      company: t('items.5.company'),
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
      rating: 5,
      content: t('items.5.content'),
      project: t('items.5.project'),
      tags: t.raw('items.5.tags'),
    },
  ];

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
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

        {/* 主要评价展示 */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative h-[500px] md:h-[400px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 h-full">
                  <div className="flex flex-col md:flex-row gap-8 h-full">
                    {/* 左侧：头像和信息 */}
                    <div className="flex-shrink-0 text-center md:text-left">
                      <div className="relative w-24 h-24 mx-auto md:mx-0 mb-4">
                        <Image
                          src={testimonials[activeIndex].avatar}
                          alt={testimonials[activeIndex].name}
                          fill
                          className="rounded-full object-cover border-4 border-amber-500/30"
                        />
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                          <Quote className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {testimonials[activeIndex].name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-1">
                        {testimonials[activeIndex].position}
                      </p>
                      <p className="text-sm text-amber-400 mb-4">
                        {testimonials[activeIndex].company}
                      </p>
                      <div className="flex justify-center md:justify-start gap-1 mb-4">
                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs text-amber-400">
                        {testimonials[activeIndex].project}
                      </div>
                    </div>

                    {/* 右侧：评价内容 */}
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        "{testimonials[activeIndex].content}"
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {testimonials[activeIndex].tags.map((tag:any, idx:any) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-full border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 导航按钮 */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 指示器 */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === activeIndex
                    ? 'w-8 bg-gradient-to-r from-amber-500 to-orange-500'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 统计数据 */}
        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '500+', key: 'clients' },
              { value: '99%', key: 'satisfaction' },
              { value: '4.9', key: 'rating' },
              { value: '95%', key: 'recommendation' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
              >
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{t(`stats.${stat.key}`)}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
