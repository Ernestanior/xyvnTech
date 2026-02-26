'use client';

import { MessageSquare, Zap, Users, ShoppingCart, QrCode, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CTASection from '@/components/sections/CTASection';

export default function MiniprogramPage() {
  const t = useTranslations('services.miniprogram');

  const features = [
    {
      icon: MessageSquare,
      title: t('features.ecosystem.title'),
      description: t('features.ecosystem.description'),
    },
    {
      icon: Zap,
      title: t('features.instant.title'),
      description: t('features.instant.description'),
    },
    {
      icon: Users,
      title: t('features.userBase.title'),
      description: t('features.userBase.description'),
    },
    {
      icon: ShoppingCart,
      title: t('features.ecommerce.title'),
      description: t('features.ecommerce.description'),
    },
    {
      icon: QrCode,
      title: t('features.offline.title'),
      description: t('features.offline.description'),
    },
    {
      icon: TrendingUp,
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
    },
  ];

  const types = [
    {
      name: t('platforms.wechat.name'),
      desc: t('platforms.wechat.desc'),
      features: t.raw('platforms.wechat.features'),
    },
    {
      name: t('platforms.alipay.name'),
      desc: t('platforms.alipay.desc'),
      features: t.raw('platforms.alipay.features'),
    },
    {
      name: t('platforms.douyin.name'),
      desc: t('platforms.douyin.desc'),
      features: t.raw('platforms.douyin.features'),
    },
  ];

  const scenarios = [
    {
      title: t('scenarios.retail.title'),
      desc: t('scenarios.retail.description'),
      icon: '🛍️',
    },
    {
      title: t('scenarios.food.title'),
      desc: t('scenarios.food.description'),
      icon: '🍜',
    },
    {
      title: t('scenarios.education.title'),
      desc: t('scenarios.education.description'),
      icon: '📚',
    },
    {
      title: t('scenarios.booking.title'),
      desc: t('scenarios.booking.description'),
      icon: '📅',
    },
    {
      title: t('scenarios.community.title'),
      desc: t('scenarios.community.description'),
      icon: '👥',
    },
    {
      title: t('scenarios.enterprise.title'),
      desc: t('scenarios.enterprise.description'),
      icon: '💼',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {t('hero.title')}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                {' '}{t('hero.titleHighlight')}
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              {t('hero.description')}
              <br />
              {t('hero.descriptionLine2')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all"
              >
                {t('hero.startConsulting')}
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
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('platforms.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {types.map((type, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <h3 className="text-3xl font-bold text-white mb-2">{type.name}</h3>
                <p className="text-amber-400 mb-6">{type.desc}</p>
                <ul className="space-y-3">
                  {type.features.map((feature:any, idx:any) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('scenarios.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <div className="text-5xl mb-4">{scenario.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{scenario.title}</h3>
                <p className="text-gray-400">{scenario.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
