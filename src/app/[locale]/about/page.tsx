'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Zap, Users, Award, TrendingUp, Code2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import StatsSection from '@/components/sections/StatsSection';
import TechStackSectionEnhanced from '@/components/sections/TechStackSectionEnhanced';
import ProcessSectionEnhanced from '@/components/sections/ProcessSectionEnhanced';
import CTASection from '@/components/sections/CTASection';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function AboutPage() {
  const t = useTranslations('about');
  const values = [
    {
      icon: Target,
      title: t('values.excellence.title'),
      desc: t('values.excellence.description'),
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Heart,
      title: t('values.userFirst.title'),
      desc: t('values.userFirst.description'),
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Zap,
      title: t('values.innovation.title'),
      desc: t('values.innovation.description'),
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Users,
      title: t('values.teamwork.title'),
      desc: t('values.teamwork.description'),
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const milestones = [
    { year: '2020', title: t('milestones.2020.title'), desc: t('milestones.2020.description') },
    { year: '2021', title: t('milestones.2021.title'), desc: t('milestones.2021.description') },
    { year: '2022', title: t('milestones.2022.title'), desc: t('milestones.2022.description') },
    { year: '2023', title: t('milestones.2023.title'), desc: t('milestones.2023.description') },
    { year: '2024', title: t('milestones.2024.title'), desc: t('milestones.2024.description') },
  ];

  const team = [
    {
      role: t('team.tech.role'),
      count: t('team.tech.count'),
      desc: t('team.tech.description'),
      skills: t.raw('team.tech.skills'),
    },
    {
      role: t('team.design.role'),
      count: t('team.design.count'),
      desc: t('team.design.description'),
      skills: t.raw('team.design.skills'),
    },
    {
      role: t('team.product.role'),
      count: t('team.product.count'),
      desc: t('team.product.description'),
      skills: t.raw('team.product.skills'),
    },
  ];

  const achievements = [
    { icon: Award, label: t('achievements.awards'), value: '12+' },
    { icon: CheckCircle2, label: t('achievements.projects'), value: '200+' },
    { icon: Users, label: t('achievements.clients'), value: '150+' },
    { icon: TrendingUp, label: t('achievements.satisfaction'), value: '98%' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-orange-600/10" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                {t('hero.title')}
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 bg-clip-text text-transparent">
                  {' '}{t('hero.titleHighlight')}
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {t('hero.description')}
                <br />
                {t('hero.descriptionLine2')}
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all flex items-center gap-2"
                >
                  {t('hero.startCollaboration')}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:scale-105 transition-transform">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{t('mission.title')}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {t('mission.description')}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:scale-105 transition-transform">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{t('vision.title')}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {t('vision.description')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('values.title')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('values.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {achievements.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                  <item.icon className="w-10 h-10 text-amber-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">{item.value}</div>
                  <div className="text-gray-400 text-sm">{item.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('team.title')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('team.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
                  <div className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">
                    {item.count}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.role}</h3>
                  <p className="text-gray-400 mb-6">{item.desc}</p>
                  <div className="space-y-2">
                    {item.skills.map((skill: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('milestones.title')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('milestones.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-orange-500 to-red-500" />
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <div className="relative pl-20">
                      <div className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center font-bold text-white">
                        {milestone.year}
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                        <h3 className="text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                        <p className="text-gray-400">{milestone.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <TechStackSectionEnhanced />
      <ProcessSectionEnhanced />
      <CTASection />
    </>
  );
}
