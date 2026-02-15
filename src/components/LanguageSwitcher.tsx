'use client';

import { useState, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname as useI18nPathname } from '@/i18n/routing';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname(); // 完整路径，包含语言前缀
  const i18nPathname = useI18nPathname(); // 不带语言前缀的路径

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      // 构建新的路径：新语言前缀 + 当前路径（不带语言前缀）
      const newPath = `/${newLocale}${i18nPathname}`;
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
        <span className="hidden md:inline">{localeNames[locale]}</span>
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
                    locale === loc
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'hover:bg-white/5 text-gray-300'
                  } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{localeFlags[loc]}</span>
                    <span className="font-medium">{localeNames[loc]}</span>
                  </div>
                  {locale === loc && <Check className="w-5 h-5" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
