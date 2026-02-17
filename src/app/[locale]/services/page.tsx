'use client';

import { useTranslations } from 'next-intl';
import ServicesSection from '@/components/sections/ServicesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import CTASection from '@/components/sections/CTASection';

export default function ServicesPage() {
  const t = useTranslations('services.page');
  
  return (
    <>
      {/* 页面标题 */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-400">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      <ServicesSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
