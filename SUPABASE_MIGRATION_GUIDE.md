# Supabase 数据库迁移指南

本指南将帮助你将现有的 Supabase 数据库迁移到新的 Supabase 账号。

## 迁移步骤

### 第一步：导出旧数据库的数据

1. 登录到你的**旧 Supabase 项目**
2. 进入 **SQL Editor**
3. 执行以下 SQL 导出所有数据：

```sql
-- 导出管理员数据
SELECT * FROM admins;

-- 导出分类数据
SELECT * FROM categories;

-- 导出标签数据
SELECT * FROM tags;

-- 导出文章数据
SELECT * FROM articles;

-- 导出咨询数据
SELECT * FROM inquiries;

-- 导出媒体数据
SELECT * FROM media;

-- 导出评论数据（如果有）
SELECT * FROM comments;

-- 导出网站设置数据（如果有）
SELECT * FROM site_settings;
```

4. 将每个查询结果复制保存到文本文件中（或使用 Supabase 的导出功能）

### 第二步：在新 Supabase 项目中创建表结构

1. 登录到你的**新 Supabase 项目**
2. 进入 **SQL Editor**
3. 执行项目根目录下的 `supabase-setup.sql` 文件内容
4. 执行完成后，执行 `supabase-rls-policies.sql` 文件内容

### 第三步：创建 Storage Buckets

在新 Supabase 项目中创建以下 Storage buckets：

1. 进入 **Storage** 页面
2. 点击 **New bucket**
3. 创建以下 buckets（全部设置为 **Public**）：
   - `article-images`
   - `media-library`
   - `avatars`

### 第四步：配置 Storage 策略

为每个 bucket 设置访问策略：

1. 点击 bucket 名称
2. 进入 **Policies** 标签
3. 添加以下策略：

**对于所有 buckets：**

- **读取策略（SELECT）**：
  - Policy name: `Public read access`
  - Target roles: `public`
  - Policy definition: `true`

- **上传策略（INSERT）**：
  - Policy name: `Authenticated users can upload`
  - Target roles: `authenticated`
  - Policy definition: `true`

- **删除策略（DELETE）**：
  - Policy name: `Authenticated users can delete`
  - Target roles: `authenticated`
  - Policy definition: `true`

### 第五步：导入数据到新数据库

#### 方法 1：使用 SQL INSERT（推荐用于少量数据）

在新 Supabase 项目的 SQL Editor 中执行：

```sql
-- 示例：导入分类数据
INSERT INTO categories (id, name, slug, description, icon, order_index, created_at) VALUES
('uuid-1', '网站开发', 'web-development', '网站开发相关技术和案例分享', '🌐', 1, '2024-01-01 00:00:00+00'),
('uuid-2', 'APP开发', 'app-development', 'iOS和Android应用开发', '📱', 2, '2024-01-01 00:00:00+00');
-- ... 添加更多数据

-- 导入管理员数据（注意：密码哈希需要保持一致）
INSERT INTO admins (id, username, email, password_hash, role, created_at) VALUES
('uuid-1', 'admin', 'admin@example.com', 'hash-value', 'admin', '2024-01-01 00:00:00+00');
-- ... 添加更多数据
```

#### 方法 2：使用 Supabase CLI（推荐用于大量数据）

```bash
# 安装 Supabase CLI（如果还没安装）
npm install -g supabase

# 从旧项目导出数据
supabase db dump --db-url "postgresql://[OLD_CONNECTION_STRING]" > backup.sql

# 导入到新项目
supabase db push --db-url "postgresql://[NEW_CONNECTION_STRING]" < backup.sql
```

### 第六步：迁移 Storage 文件

如果你有上传的图片和文件，需要迁移它们：

#### 选项 1：手动下载并重新上传（适合文件少的情况）

1. 从旧项目的 Storage 下载所有文件
2. 在新项目的 Storage 中重新上传

#### 选项 2：使用脚本批量迁移（适合文件多的情况）

创建一个迁移脚本 `migrate-storage.js`：

```javascript
const { createClient } = require('@supabase/supabase-js');

// 旧项目配置
const oldSupabase = createClient(
  'OLD_SUPABASE_URL',
  'OLD_SERVICE_ROLE_KEY'
);

// 新项目配置
const newSupabase = createClient(
  'NEW_SUPABASE_URL',
  'NEW_SERVICE_ROLE_KEY'
);

async function migrateStorage() {
  const buckets = ['article-images', 'media-library', 'avatars'];
  
  for (const bucket of buckets) {
    console.log(`Migrating bucket: ${bucket}`);
    
    // 列出旧 bucket 中的所有文件
    const { data: files, error } = await oldSupabase
      .storage
      .from(bucket)
      .list();
    
    if (error) {
      console.error(`Error listing files in ${bucket}:`, error);
      continue;
    }
    
    // 迁移每个文件
    for (const file of files) {
      try {
        // 从旧 bucket 下载
        const { data: fileData } = await oldSupabase
          .storage
          .from(bucket)
          .download(file.name);
        
        // 上传到新 bucket
        await newSupabase
          .storage
          .from(bucket)
          .upload(file.name, fileData, {
            contentType: file.metadata?.mimetype,
            upsert: true
          });
        
        console.log(`Migrated: ${file.name}`);
      } catch (err) {
        console.error(`Error migrating ${file.name}:`, err);
      }
    }
  }
  
  console.log('Migration complete!');
}

migrateStorage();
```

运行脚本：
```bash
node migrate-storage.js
```

### 第七步：更新环境变量

1. 在新 Supabase 项目的 **Settings > API** 页面获取：
   - Project URL
   - anon/public key
   - service_role key

2. 更新 `.env.local` 文件：

```env
# 新的 Supabase 配置
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_NEW_PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_NEW_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="YOUR_NEW_SERVICE_ROLE_KEY"

# 保持不变
NEXTAUTH_URL="https://www.xyvnai.com"
NEXTAUTH_SECRET="wI/+Cf95xayNEcaZyez7RFc9cAoSwJurPX6/G7l1OF4="
```

3. 同时更新 `.dev.vars` 文件（如果有）

### 第八步：测试验证

1. 重启开发服务器：
```bash
npm run dev
```

2. 测试以下功能：
   - [ ] 管理员登录
   - [ ] 查看文章列表
   - [ ] 创建新文章
   - [ ] 上传图片
   - [ ] 查看分类和标签
   - [ ] 提交咨询表单
   - [ ] 前台页面显示

3. 检查数据完整性：
   - 所有文章是否正确显示
   - 图片是否正常加载
   - 分类和标签是否完整

### 第九步：更新生产环境

如果测试通过，更新生产环境的环境变量：

#### Vercel 部署：
1. 进入 Vercel 项目设置
2. 进入 **Environment Variables**
3. 更新以下变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. 重新部署项目

#### Cloudflare Pages 部署：
1. 进入 Cloudflare Pages 项目设置
2. 进入 **Environment variables**
3. 更新相同的变量
4. 重新部署

## 常见问题

### Q: 如何确保数据完整性？
A: 在迁移前后，对比以下数据的数量：
```sql
SELECT COUNT(*) FROM admins;
SELECT COUNT(*) FROM articles;
SELECT COUNT(*) FROM categories;
SELECT COUNT(*) FROM tags;
```

### Q: 图片 URL 会改变吗？
A: 是的，Storage URL 会改变。你需要：
1. 更新数据库中的图片 URL
2. 或者在代码中动态构建 URL

### Q: 如何处理管理员密码？
A: 密码哈希可以直接复制，不需要重新加密。确保 `password_hash` 字段完整复制。

### Q: 迁移需要多长时间？
A: 取决于数据量：
- 小型项目（< 100 条记录）：15-30 分钟
- 中型项目（100-1000 条记录）：30-60 分钟
- 大型项目（> 1000 条记录）：1-2 小时

## 回滚计划

如果迁移出现问题，可以快速回滚：

1. 恢复 `.env.local` 中的旧配置
2. 重启开发服务器
3. 系统将继续使用旧数据库

## 迁移后清理

迁移成功并稳定运行一段时间后：

1. 保留旧 Supabase 项目 1-2 周作为备份
2. 确认新系统完全正常后，可以删除旧项目
3. 更新所有文档中的数据库连接信息

## 需要帮助？

如果在迁移过程中遇到问题，请检查：
1. SQL 执行是否有错误
2. 环境变量是否正确配置
3. Storage buckets 是否创建并设置为 Public
4. RLS 策略是否正确应用

---

**重要提示**：在执行迁移前，建议先在本地测试整个流程，确保没有问题后再迁移生产数据。
