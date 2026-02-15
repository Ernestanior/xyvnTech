import { Locale } from '@/i18n/config';

/**
 * 格式化日期
 * @param date 日期对象或字符串
 * @param locale 语言代码
 * @param options Intl.DateTimeFormatOptions
 */
export function formatDate(
  date: Date | string,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
}

/**
 * 格式化数字
 * @param number 数字
 * @param locale 语言代码
 * @param options Intl.NumberFormatOptions
 */
export function formatNumber(
  number: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(number);
}

/**
 * 格式化货币
 * @param amount 金额
 * @param locale 语言代码
 * @param currency 货币代码（如 'USD', 'CNY', 'EUR'）
 * @param options 额外的格式化选项
 */
export function formatCurrency(
  amount: number,
  locale: Locale,
  currency: string = 'CNY',
  options?: Intl.NumberFormatOptions
): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    ...options,
  };

  return new Intl.NumberFormat(locale, defaultOptions).format(amount);
}

/**
 * 翻译回退函数
 * 当翻译键不存在时，返回默认值或键名
 * @param translations 翻译对象
 * @param key 翻译键（支持嵌套，如 'nav.home'）
 * @param fallback 回退值
 */
export function getTranslationWithFallback(
  translations: Record<string, any>,
  key: string,
  fallback?: string
): string {
  const keys = key.split('.');
  let value: any = translations;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return fallback || key;
    }
  }

  return typeof value === 'string' ? value : fallback || key;
}

/**
 * 格式化相对时间（如"3天前"）
 * @param date 日期对象或字符串
 * @param locale 语言代码
 */
export function formatRelativeTime(
  date: Date | string,
  locale: Locale
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }
}

/**
 * 格式化百分比
 * @param value 数值（0-1 或 0-100）
 * @param locale 语言代码
 * @param options 格式化选项
 */
export function formatPercentage(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  };

  // 如果值大于 1，假设是百分比形式（如 85），需要除以 100
  const normalizedValue = value > 1 ? value / 100 : value;

  return new Intl.NumberFormat(locale, defaultOptions).format(normalizedValue);
}
