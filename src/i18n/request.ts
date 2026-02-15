import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  // 验证语言是否有效
  if (!routing.locales.includes(locale as any)) {
    return {
      locale: routing.defaultLocale,
      messages: {},
    };
  }

  return {
    locale,
    messages: (await import(`@/locales/${locale}/common.json`)).default,
  };
});
