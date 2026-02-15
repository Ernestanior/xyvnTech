import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* 导航栏 */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">
              {t('metadata.siteName')}
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-gray-300 hover:text-white transition">
                {t('nav.home')}
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition">
                {t('nav.about')}
              </Link>
              <Link href="/services" className="text-gray-300 hover:text-white transition">
                {t('nav.services')}
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition">
                {t('nav.contact')}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            {t('metadata.siteTitle')}
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            {t('metadata.siteDescription')}
          </p>
          
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition">
              {t('common.getStarted')}
            </button>
            <button className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition">
              {t('common.learnMore')}
            </button>
          </div>

          {/* 测试区域 */}
          <div className="mt-20 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              🎉 多语言功能测试
            </h2>
            <p className="text-gray-300 mb-4">
              点击右上角的语言切换器来测试多语言功能！
            </p>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <div className="text-sm text-gray-400 mb-1">导航项测试：</div>
                <div className="text-white">
                  {t('nav.home')} | {t('nav.about')} | {t('nav.services')}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">按钮文本测试：</div>
                <div className="text-white">
                  {t('common.getStarted')} | {t('common.contactUs')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
