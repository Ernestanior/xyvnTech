import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import NavbarEnhanced from '@/components/NavbarEnhanced';
import FooterEnhanced from '@/components/FooterEnhanced';
import { CheckCircle2, Zap, HeadphonesIcon, Sparkles } from 'lucide-react';

export default function Home() {
  const t = useTranslations();

  const features = [
    {
      icon: CheckCircle2,
      title: t('features.items.quality.title'),
      description: t('features.items.quality.description'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: t('features.items.speed.title'),
      description: t('features.items.speed.description'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: HeadphonesIcon,
      title: t('features.items.support.title'),
      description: t('features.items.support.description'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Sparkles,
      title: t('features.items.innovation.title'),
      description: t('features.items.innovation.description'),
      color: 'from-orange-500 to-red-500',
    },
  ];

  const stats = [
    { value: '200+', label: t('stats.projects') },
    { value: '150+', label: t('stats.clients') },
    { value: '8+', label: t('stats.experience') },
    { value: '98%', label: t('stats.satisfaction') },
  ];

  return (
    <>
      <NavbarEnhanced />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-gray-400 mb-12">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                {t('hero.cta.primary')}
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-all"
              >
                {t('hero.cta.secondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-400">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900/50 to-purple-900/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              {t('cta.description')}
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              {t('cta.button')}
            </Link>
          </div>
        </div>
      </section>

      <FooterEnhanced />
    </>
  );
}
