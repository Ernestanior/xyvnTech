-- XYVN 博客系统 RLS (Row Level Security) 策略
-- 在 Supabase Dashboard > SQL Editor 中执行此脚本

-- ============================================
-- 1. 启用 RLS
-- ============================================

-- 为所有表启用 RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. 管理员表策略
-- ============================================

-- 允许 service_role 完全访问
CREATE POLICY "Service role can do everything on admins"
ON admins FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 允许认证用户读取管理员信息
CREATE POLICY "Authenticated users can read admins"
ON admins FOR SELECT
TO authenticated
USING (true);

-- ============================================
-- 3. 分类表策略
-- ============================================

-- 允许所有人读取分类
CREATE POLICY "Anyone can read categories"
ON categories FOR SELECT
TO anon, authenticated
USING (true);

-- 允许 service_role 管理分类
CREATE POLICY "Service role can manage categories"
ON categories FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- 4. 标签表策略
-- ============================================

-- 允许所有人读取标签
CREATE POLICY "Anyone can read tags"
ON tags FOR SELECT
TO anon, authenticated
USING (true);

-- 允许 service_role 管理标签
CREATE POLICY "Service role can manage tags"
ON tags FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- 5. 文章表策略
-- ============================================

-- 允许所有人读取已发布的文章
CREATE POLICY "Anyone can read published articles"
ON articles FOR SELECT
TO anon, authenticated
USING (status = 'published');

-- 允许 service_role 完全管理文章
CREATE POLICY "Service role can manage articles"
ON articles FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- 6. 咨询表策略
-- ============================================

-- 允许匿名用户创建咨询
CREATE POLICY "Anyone can create inquiries"
ON inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 允许 service_role 管理咨询
CREATE POLICY "Service role can manage inquiries"
ON inquiries FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- 7. 媒体库表策略
-- ============================================

-- 允许所有人读取媒体
CREATE POLICY "Anyone can read media"
ON media FOR SELECT
TO anon, authenticated
USING (true);

-- 允许 service_role 管理媒体
CREATE POLICY "Service role can manage media"
ON media FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- 8. 文章浏览记录表策略
-- ============================================

-- 允许所有人创建浏览记录
CREATE POLICY "Anyone can create article views"
ON article_views FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 允许 service_role 读取浏览记录
CREATE POLICY "Service role can read article views"
ON article_views FOR SELECT
TO service_role
USING (true);

-- ============================================
-- 9. 评论表策略
-- ============================================

-- 允许所有人读取已批准的评论
CREATE POLICY "Anyone can read approved comments"
ON comments FOR SELECT
TO anon, authenticated
USING (status = 'approved');

-- 允许匿名用户创建评论
CREATE POLICY "Anyone can create comments"
ON comments FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 允许 service_role 管理评论
CREATE POLICY "Service role can manage comments"
ON comments FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- 10. 网站设置表策略
-- ============================================

-- 允许所有人读取网站设置
CREATE POLICY "Anyone can read site settings"
ON site_settings FOR SELECT
TO anon, authenticated
USING (true);

-- 允许 service_role 管理网站设置
CREATE POLICY "Service role can manage site settings"
ON site_settings FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- 11. Storage 策略
-- ============================================

-- 注意：Storage 策略需要在 Supabase Dashboard > Storage > Policies 中配置
-- 或者使用以下 SQL（如果你的 Supabase 版本支持）

-- article-images bucket 策略
-- 允许所有人读取
-- 允许认证用户上传

-- 如果你想通过 SQL 创建 storage policies，可以使用：
/*
-- 允许所有人读取 article-images
CREATE POLICY "Public read access for article-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'article-images');

-- 允许认证用户上传到 article-images
CREATE POLICY "Authenticated users can upload to article-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'article-images');

-- 允许认证用户删除自己上传的文件
CREATE POLICY "Authenticated users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'article-images');
*/

-- ============================================
-- 完成！
-- ============================================
-- RLS 策略配置完成
-- 现在你的数据库已经有了适当的安全策略
