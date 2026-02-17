'use client';

import { useLocale } from 'next-intl';

export default function TestI18nPage() {
  const locale = useLocale();

  // 直接从 window 获取翻译数据来测试
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">i18n Test Page</h1>
      
      <div className="space-y-4">
        <p className="text-2xl"><strong>Current Locale:</strong> {locale}</p>
        
        <div className="border border-white/20 p-4 rounded mt-8">
          <p className="text-xl">If you see the locale above, the basic i18n routing is working.</p>
          <p className="text-xl mt-4">Try switching between:</p>
          <ul className="list-disc ml-8 mt-2">
            <li>/zh-CN/test-i18n</li>
            <li>/en/test-i18n</li>
            <li>/zh-TW/test-i18n</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
