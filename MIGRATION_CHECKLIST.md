# Supabase 迁移检查清单

按照这个清单逐步完成迁移，确保不遗漏任何步骤。

## 准备阶段

- [ ] 已创建新的 Supabase 账号
- [ ] 已在新账号中创建新项目
- [ ] 已记录新项目的以下信息：
  - [ ] Project URL: `https://________.supabase.co`
  - [ ] anon/public key: `eyJ...`
  - [ ] service_role key: `eyJ...`

## 第一步：设置新数据库结构（5 分钟）

- [ ] 1. 登录新 Supabase 项目
- [ ] 2. 进入 **SQL Editor**
- [ ] 3. 复制 `supabase-setup.sql` 的全部内容
- [ ] 4. 粘贴并执行
- [ ] 5. 确认执行成功（无错误提示）
- [ ] 6. 复制 `supabase-rls-policies.sql` 的全部内容
- [ ] 7. 粘贴并执行
- [ ] 8. 确认执行成功

## 第二步：创建 Storage Buckets（3 分钟）

- [ ] 1. 进入新项目的 **Storage** 页面
- [ ] 2. 创建 bucket: `article-images`
  - [ ] 设置为 **Public**
  - [ ] 添加读取策略（public）
  - [ ] 添加上传策略（authenticated）
- [ ] 3. 创建 bucket: `media-library`
  - [ ] 设置为 **Public**
  - [ ] 添加读取策略（public）
  - [ ] 添加上传策略（authenticated）
- [ ] 4. 创建 bucket: `avatars`
  - [ ] 设置为 **Public**
  - [ ] 添加读取策略（public）
  - [ ] 添加上传策略（authenticated）

## 第三步：迁移数据（10-30 分钟）

### 选项 A：使用自动化脚本（推荐）

- [ ] 1. 打开 `scripts/migrate-supabase.js`
- [ ] 2. 将新项目的 URL 和 service_role key 填入脚本
- [ ] 3. 确保已安装依赖：`npm install @supabase/supabase-js`
- [ ] 4. 运行脚本：`node scripts/migrate-supabase.js`
- [ ] 5. 等待脚本完成
- [ ] 6. 检查输出，确认所有表和文件都迁移成功

### 选项 B：手动迁移（备选）

#### 迁移数据表：

- [ ] 1. 在旧项目的 SQL Editor 中导出数据：
  ```sql
  SELECT * FROM admins;
  SELECT * FROM categories;
  SELECT * FROM tags;
  SELECT * FROM articles;
  SELECT * FROM inquiries;
  SELECT * FROM media;
  ```
- [ ] 2. 将每个查询结果保存
- [ ] 3. 在新项目中使用 INSERT 语句导入数据

#### 迁移 Storage 文件：

- [ ] 1. 从旧项目下载所有图片和文件
- [ ] 2. 在新项目中重新上传

## 第四步：更新配置（2 分钟）

- [ ] 1. 备份当前的 `.env.local` 文件
- [ ] 2. 更新 `.env.local` 中的以下变量：
  ```env
  NEXT_PUBLIC_SUPABASE_URL="新项目URL"
  NEXT_PUBLIC_SUPABASE_ANON_KEY="新项目anon key"
  SUPABASE_SERVICE_ROLE_KEY="新项目service role key"
  ```
- [ ] 3. 如果有 `.dev.vars` 文件，也要更新

## 第五步：本地测试（10 分钟）

- [ ] 1. 重启开发服务器：`npm run dev`
- [ ] 2. 测试管理员登录：访问 `/admin/login`
  - [ ] 能否成功登录
  - [ ] 登录后能否看到仪表板
- [ ] 3. 测试文章管理：
  - [ ] 能否查看文章列表
  - [ ] 能否查看文章详情
  - [ ] 能否创建新文章
  - [ ] 能否编辑文章
- [ ] 4. 测试图片上传：
  - [ ] 能否上传新图片
  - [ ] 已有图片是否正常显示
- [ ] 5. 测试分类和标签：
  - [ ] 能否查看分类列表
  - [ ] 能否创建新分类
  - [ ] 能否查看标签列表
- [ ] 6. 测试前台页面：
  - [ ] 首页是否正常显示
  - [ ] 博客列表是否正常
  - [ ] 文章详情页是否正常
  - [ ] 图片是否正常加载
- [ ] 7. 测试咨询表单：
  - [ ] 能否提交咨询
  - [ ] 后台能否看到咨询记录

## 第六步：数据验证（5 分钟）

在新项目的 SQL Editor 中执行以下查询，对比数量：

```sql
-- 检查各表的记录数
SELECT 'admins' as table_name, COUNT(*) as count FROM admins
UNION ALL
SELECT 'categories', COUNT(*) FROM categories
UNION ALL
SELECT 'tags', COUNT(*) FROM tags
UNION ALL
SELECT 'articles', COUNT(*) FROM articles
UNION ALL
SELECT 'inquiries', COUNT(*) FROM inquiries
UNION ALL
SELECT 'media', COUNT(*) FROM media;
```

- [ ] 记录数与旧数据库一致
- [ ] 所有重要数据都已迁移

## 第七步：更新生产环境（5 分钟）

### 如果使用 Vercel：

- [ ] 1. 登录 Vercel Dashboard
- [ ] 2. 进入项目设置
- [ ] 3. 进入 **Environment Variables**
- [ ] 4. 更新以下变量（Production 环境）：
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] 5. 触发重新部署

### 如果使用 Cloudflare Pages：

- [ ] 1. 登录 Cloudflare Dashboard
- [ ] 2. 进入 Pages 项目
- [ ] 3. 进入 **Settings > Environment variables**
- [ ] 4. 更新相同的变量（Production 环境）
- [ ] 5. 触发重新部署

## 第八步：生产环境测试（10 分钟）

- [ ] 1. 等待部署完成
- [ ] 2. 访问生产网站
- [ ] 3. 测试关键功能：
  - [ ] 前台页面正常显示
  - [ ] 文章列表和详情正常
  - [ ] 图片正常加载
  - [ ] 管理后台可以登录
  - [ ] 可以创建和编辑内容
- [ ] 4. 检查浏览器控制台，确认无错误

## 第九步：监控和观察（1-2 天）

- [ ] 1. 监控网站运行状态
- [ ] 2. 检查是否有用户报告问题
- [ ] 3. 查看 Supabase 新项目的使用情况
- [ ] 4. 确认所有功能正常

## 第十步：清理（可选，1-2 周后）

- [ ] 1. 确认新数据库稳定运行
- [ ] 2. 导出旧数据库作为最终备份
- [ ] 3. 可以考虑删除旧 Supabase 项目（谨慎操作）

## 回滚计划（如果出现问题）

如果迁移后发现问题，可以快速回滚：

- [ ] 1. 恢复 `.env.local` 备份文件
- [ ] 2. 重启开发服务器
- [ ] 3. 在生产环境恢复旧的环境变量
- [ ] 4. 重新部署

## 常见问题排查

### 问题：无法连接到新数据库
- [ ] 检查 URL 和 KEY 是否正确
- [ ] 检查新项目是否已暂停（免费版会自动暂停）
- [ ] 检查网络连接

### 问题：图片无法显示
- [ ] 检查 Storage buckets 是否设置为 Public
- [ ] 检查 Storage 策略是否正确配置
- [ ] 检查图片文件是否已迁移

### 问题：管理员无法登录
- [ ] 检查 admins 表数据是否迁移
- [ ] 检查密码哈希是否完整
- [ ] 尝试重新创建管理员账号

### 问题：RLS 策略错误
- [ ] 确认已执行 `supabase-rls-policies.sql`
- [ ] 检查策略是否正确应用
- [ ] 在 Supabase Dashboard 中查看策略配置

## 完成！

- [ ] 所有步骤已完成
- [ ] 网站运行正常
- [ ] 数据完整无误
- [ ] 已通知团队成员（如有）

---

**预计总时间：** 45-90 分钟

**建议：** 在非高峰时段进行迁移，并提前通知用户可能的短暂服务中断。
