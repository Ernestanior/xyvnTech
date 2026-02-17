import { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://xyvnai.com'
  
  // 定义所有页面路径
  const pages = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/services/web-development', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/services/app-development', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/services/miniprogram', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/portfolio', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.7, changeFrequency: 'daily' as const },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
  ]
  
  // 为每种语言生成 sitemap 条目
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  locales.forEach((locale) => {
    pages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })
    })
  })
  
  return sitemapEntries
}
