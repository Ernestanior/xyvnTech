// 日期格式化工具
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export function formatDate(date: string | Date, formatStr: string = 'yyyy-MM-dd'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: zhCN });
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, 'yyyy-MM-dd HH:mm:ss');
}

export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: zhCN });
}

export function getReadingTime(content: string): number {
  // 中文：每分钟约 300-400 字
  // 英文：每分钟约 200-250 词
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = content
    .replace(/[\u4e00-\u9fa5]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  const chineseTime = chineseChars / 350;
  const englishTime = englishWords / 225;

  return Math.ceil(chineseTime + englishTime) || 1;
}
