import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  // 验证语言是否有效，如果无效则使用默认语言
  const validLocale: string = routing.locales.includes(locale as any)
    ? (locale as string)
    : routing.defaultLocale;

  return {
    locale: validLocale,
    messages: {
      ...(await import(`@/locales/${validLocale}/common.json`)).default,
      ...(await import(`@/locales/${validLocale}/home.json`)).default,
    },
  };
});
