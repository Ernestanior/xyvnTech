export const locales = ['en','zh-TW','zh-CN'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  'en': 'English',
  'zh-TW': '繁體中文',
  'zh-CN': '简体中文',
};



export const i18nConfig = {
  locales,
  defaultLocale,
  localePrefix: 'always' as const, // 总是显示语言前缀
  localeDetection: true, // 启用自动语言检测
};
