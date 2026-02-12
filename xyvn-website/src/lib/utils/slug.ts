// URL Slug 生成工具
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // 移除特殊字符
    .replace(/[^\w\s-]/g, '')
    // 替换空格为连字符
    .replace(/[\s_-]+/g, '-')
    // 移除开头和结尾的连字符
    .replace(/^-+|-+$/g, '');
}

export function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

// 从标题生成 slug
export function titleToSlug(title: string): string {
  // 处理中文字符 - 使用拼音或保持原样
  const slug = title
    .toLowerCase()
    .trim()
    // 替换中文字符为拼音（简化版，实际项目可使用 pinyin 库）
    .replace(/[\u4e00-\u9fa5]/g, (char) => {
      // 这里可以集成拼音库，暂时保持中文
      return char;
    })
    // 移除特殊字符，保留中文、字母、数字和连字符
    .replace(/[^\u4e00-\u9fa5\w\s-]/g, '')
    // 替换空格为连字符
    .replace(/[\s_]+/g, '-')
    // 移除多余的连字符
    .replace(/-+/g, '-')
    // 移除开头和结尾的连字符
    .replace(/^-+|-+$/g, '');

  return slug || 'untitled';
}
