'use client';

import { useState, useTransition, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname(); // 完整路径，包含语言前缀，如 /zh-CN/about

  // 从 pathname 中提取当前的 locale
  const currentLocale = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    
    // 检查第一个 segment 是否是有效的 locale
    if (locales.includes(firstSegment as any)) {
      return firstSegment as Locale;
    }
    
    // 如果没有找到，使用 useLocale 的值
    return locale;
  }, [pathname, locale]);

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      // 从 pathname 中提取当前的 locale
      const segments = pathname.split('/').filter(Boolean);
      const currentLocaleInPath = segments[0];
      
      // 检查第一个 segment 是否是有效的 locale
      const isValidLocale = locales.includes(currentLocaleInPath as any);
      
      let pathWithoutLocale: string;
      if (isValidLocale) {
        // 移除第一个 segment（locale）
        pathWithoutLocale = '/' + segments.slice(1).join('/');
      } else {
        // 如果没有 locale 前缀，使用整个路径
        pathWithoutLocale = pathname;
      }
      
      // 确保路径以 / 开头
      if (!pathWithoutLocale.startsWith('/')) {
        pathWithoutLocale = '/' + pathWithoutLocale;
      }
      
      // 如果路径为空，使用根路径
      if (pathWithoutLocale === '/') {
        pathWithoutLocale = '';
      }
      
      // 构建新的路径
      const newPath = `/${newLocale}${pathWithoutLocale}`;
      
      router.replace(newPath);
      setIsOpen(false);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          isPending
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-white/10'
        }`}
        aria-label="切换语言"
      >
        <Globe className="w-5 h-5" />
        <span className="hidden md:inline">{localeNames[currentLocale]}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景遮罩 */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* 下拉菜单 */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50"
            >
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  disabled={isPending}
                  className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                    currentLocale === loc
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'hover:bg-white/5 text-gray-300'
                  } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{localeNames[loc]}</span>
                  </div>
                  {currentLocale === loc && <Check className="w-5 h-5" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
