import { Metadata } from 'next';
import ServicesSection from '@/components/sections/ServicesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: '我们的服务 - XYVN',
  description: '提供专业的网站开发、APP开发、小程序开发等服务',
};

export default function ServicesPage() {
  return (
    <>
      {/* 页面标题 */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              我们的服务
            </h1>
            <p className="text-xl text-gray-400">
              为您提供全方位的数字化解决方案
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
