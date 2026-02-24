import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Poppins, Noto_Sans_SC } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n/config';
import NavbarEnhanced from '@/components/NavbarEnhanced';
import FooterEnhanced from '@/components/FooterEnhanced';
import SmoothScroll from '@/components/SmoothScroll';
import MouseGlow from '@/components/MouseGlow';
import BackToTop from '@/components/BackToTop';
import '../globals.css';

// 英文字体 - Poppins
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

// 中文字体
const notoSansSC = Noto_Sans_SC({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {
      template: `%s | ${t('siteName')}`,
      default: t('siteTitle'),
    },
    description: t('siteDescription'),
    keywords: t('keywords'),
    authors: [{ name: 'ARVIX Tech' }],
    creator: 'ARVIX Tech',
    publisher: 'ARVIX Tech',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://arvixai.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'zh-CN': '/zh-CN',
        'zh-TW': '/zh-TW',
        'en': '/en',
        'x-default': '/zh-CN', // 默认语言
      },
    },
    openGraph: {
      title: t('siteTitle'),
      description: t('siteDescription'),
      url: `https://arvixai.com/${locale}`,
      siteName: t('siteName'),
      locale: locale,
      alternateLocale: locales.filter(l => l !== locale),
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: t('siteName'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('siteTitle'),
      description: t('siteDescription'),
      images: ['/og-image.png'],
      creator: '@arvixtech',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code', // 用户需要替换
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  // Await params to ensure we get the correct locale
  const { locale } = await Promise.resolve(params);
  
  // 验证语言是否有效
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // 提供一个空的 messages 对象，让 next-intl 通过 request.ts 加载
  const messages = await getMessages();

  // 根据语言选择字体
  const fontClass = locale === 'en' ? poppins.className : notoSansSC.className;

  return (
    <html lang={locale}>
      <body className={`bg-gray-950 text-white ${fontClass}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll>
            <MouseGlow />
            <NavbarEnhanced />
            <main>{children}</main>
            <FooterEnhanced />
            <BackToTop />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
