'use client';

import { Code2, Zap, Search, Smartphone, Shield, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CTASection from '@/components/sections/CTASection';

export default function WebDevelopmentPage() {
  const t = useTranslations('services.web');
  const features = [
    {
      icon: Zap,
      title: t('features.performance.title'),
      description: t('features.performance.description'),
    },
    {
      icon: Search,
      title: t('features.seo.title'),
      description: t('features.seo.description'),
    },
    {
      icon: Smartphone,
      title: t('features.responsive.title'),
      description: t('features.responsive.description'),
    },
    {
      icon: Shield,
      title: t('features.security.title'),
      description: t('features.security.description'),
    },
    {
      icon: TrendingUp,
      title: t('features.scalable.title'),
      description: t('features.scalable.description'),
    },
    {
      icon: Code2,
      title: t('features.modern.title'),
      description: t('features.modern.description'),
    },
  ];

  const techStack = [
    { name: 'Next.js 14', desc: t('techStack.nextjs') },
    { name: 'React 18', desc: t('techStack.react') },
    { name: 'TypeScript', desc: t('techStack.typescript') },
    { name: 'Tailwind CSS', desc: t('techStack.tailwind') },
    { name: 'Framer Motion', desc: t('techStack.framer') },
    { name: 'Vercel', desc: t('techStack.vercel') },
  ];

  const process = [
    { step: '01', title: t('process.step1.title'), desc: t('process.step1.description') },
    { step: '02', title: t('process.step2.title'), desc: t('process.step2.description') },
    { step: '03', title: t('process.step3.title'), desc: t('process.step3.description') },
    { step: '04', title: t('process.step4.title'), desc: t('process.step4.description') },
    { step: '05', title: t('process.step5.title'), desc: t('process.step5.description') },
    { step: '06', title: t('process.step6.title'), desc: t('process.step6.description') },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {t('hero.title')}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                {t('hero.startConsulting')}
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-all">
                {t('hero.viewCases')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
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
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('techStack.title')}
            </h2>
            <p className="text-xl text-gray-400">
              {t('techStack.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all"
              >
                <div className="text-2xl font-bold text-white mb-2">{tech.name}</div>
                <div className="text-sm text-gray-400">{tech.desc}</div>
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
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
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

      <CTASection />
    </>
  );
}
