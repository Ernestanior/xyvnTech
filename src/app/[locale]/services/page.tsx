'use client';

import ServicesSection from '@/components/sections/ServicesSection';
import CTASection from '@/components/sections/CTASection';

export default function ServicesPage() {
  return (
    <>
      {/* 主体内容 - ServicesSection 包含了自己的标题 */}
      <ServicesSection />
      <CTASection />
    </>
  );
}
