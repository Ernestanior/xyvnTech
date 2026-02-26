'use client';

import { ArrowRight, Smartphone, Zap, Shield, Globe, Bell, Database, Layers, Apple, Play, CheckCircle2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import HeroSectionEnhanced from '@/components/sections/HeroSectionEnhanced'
import CTASection from '@/components/sections/CTASection'
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function AppDevelopmentPage() {
  const t = useTranslations('services.app');

  const features = [
    {
      icon: Smartphone,
      title: t('features.nativeExperience.title'),
      description: t('features.nativeExperience.description'),
    },
    {
      icon: Layers,
      title: t('features.crossPlatform.title'),
      description: t('features.crossPlatform.description'),
    },
    {
      icon: Zap,
      title: t('features.highPerformance.title'),
      description: t('features.highPerformance.description'),
    },
    {
      icon: Users,
      title: t('features.userExperience.title'),
      description: t('features.userExperience.description'),
    },
    {
      icon: Bell,
      title: t('features.pushNotifications.title'),
      description: t('features.pushNotifications.description'),
    },
    {
      icon: Shield,
      title: t('features.dataSecurity.title'),
      description: t('features.dataSecurity.description'),
    },
  ];

  const platforms = [
    {
      name: t('platforms.ios.name'),
      icon: Apple,
      tech: 'Swift / SwiftUI',
      features: t.raw('platforms.ios.features'),
    },
    {
      name: t('platforms.android.name'),
      icon: Play,
      tech: 'Kotlin / Jetpack Compose',
      features: t.raw('platforms.android.features'),
    },
    {
      name: t('platforms.reactNative.name'),
      icon: Smartphone,
      tech: 'React Native',
      features: t.raw('platforms.reactNative.features'),
    },
  ];

  const processSteps = [
    { step: '01', title: t('process.step1.title'), desc: t('process.step1.description') },
    { step: '02', title: t('process.step2.title'), desc: t('process.step2.description') },
    { step: '03', title: t('process.step3.title'), desc: t('process.step3.description') },
    { step: '04', title: t('process.step4.title'), desc: t('process.step4.description') },
    { step: '05', title: t('process.step5.title'), desc: t('process.step5.description') },
    { step: '06', title: t('process.step6.title'), desc: t('process.step6.description') },
  ];

  const cases = [
    {
      name: t('cases.ecommerceApp.name'),
      desc: t('cases.ecommerceApp.description'),
      stats: t('cases.ecommerceApp.stats'),
    },
    {
      name: t('cases.socialApp.name'),
      desc: t('cases.socialApp.description'),
      stats: t('cases.socialApp.stats'),
    },
    {
      name: t('cases.utilityApp.name'),
      desc: t('cases.utilityApp.description'),
      stats: t('cases.utilityApp.stats'),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {t('hero.title')}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                {' '}{t('hero.highlight')}
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all"
              >
                {t('hero.cta.primary')}
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-all">
                {t('hero.cta.secondary')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-400">
              {t('features.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('platforms.title')}
            </h2>
            <p className="text-xl text-gray-400">
              {t('platforms.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <h3 className="text-3xl font-bold text-white mb-2">{platform.name}</h3>
                <p className="text-orange-400 mb-6">{platform.tech}</p>
                <ul className="space-y-3">
                  {platform.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('process.title')}
            </h2>
            <p className="text-xl text-gray-400">
              {t('process.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
                  <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('cases.title')}
            </h2>
            <p className="text-xl text-gray-400">
              {t('cases.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cases.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <h3 className="text-2xl font-bold text-white mb-3">{item.name}</h3>
                <p className="text-gray-400 mb-4">{item.desc}</p>
                <div className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
                  <span className="text-orange-400 text-sm font-medium">{item.stats}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
