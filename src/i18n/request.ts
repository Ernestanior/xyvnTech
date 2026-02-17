import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // 这个 API 在 next-intl v3.15.0+ 中可用
  // 它从请求中获取 locale，而不是从路由参数
  let locale = await requestLocale;

  // 确保 locale 有效
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // 加载所有翻译文件并合并
  const common = (await import(`@/locales/${locale}/common.json`)).default;
  const about = (await import(`@/locales/${locale}/about.json`)).default;
  const services = (await import(`@/locales/${locale}/services.json`)).default;
  const home = (await import(`@/locales/${locale}/home.json`)).default;

  return {
    locale,
    messages: {
      ...common,
      about,
      services,
      home,
    }
  };
});
