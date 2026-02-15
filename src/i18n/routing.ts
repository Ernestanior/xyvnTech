import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { i18nConfig } from './config';

export const routing = defineRouting({
  locales: i18nConfig.locales,
  defaultLocale: i18nConfig.defaultLocale,
  localePrefix: i18nConfig.localePrefix,
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
