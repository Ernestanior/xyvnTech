# 管理员账号创建指南

## 方法：使用脚本（推荐）

### 步骤

1. **修改账号密码**（可选）
   
   打开 `scripts/quick-create-admin.js`，修改第 35-40 行的账号信息：
   ```javascript
   const adminData = {
     username: 'admin',
     email: 'admin@xyvnai.com',    // 修改为你需要的邮箱
     password: 'admin123456',       // 修改为你需要的密码
   };
   ```

2. **运行脚本**
   ```bash
   node scripts/quick-create-admin.js
   ```

3. **登录**
   
   访问 `http://localhost:3000/admin/login`
   
   使用脚本输出的邮箱和密码登录。

### 脚本做了什么

- 使用 `bcryptjs` **实时生成**正确的密码 hash（不是硬编码的）
- 验证生成的 hash 可以正确解密
- 如果账号已存在则更新密码
- 如果账号不存在则创建新账号

---

## ⚠️ 重要提示

**不要直接复制网上的 bcrypt hash 字符串使用！**  
bcrypt hash 必须使用相同的算法和库生成，否则验证会失败。

错误做法：
```sql
-- ❌ 不要这样做！这个 hash 可能不匹配你的后端
INSERT INTO admins (password_hash) VALUES ('$2a$10$xxxxx...');
```

正确做法：
```bash
# ✅ 使用脚本生成正确的 hash
node scripts/quick-create-admin.js
```

---

## 故障排除

### "无法读取 Supabase 配置"

确保 `.env.local` 文件存在且包含：
```
NEXT_PUBLIC_SUPABASE_URL=https://你的项目.supabase.co
SUPABASE_SERVICE_ROLE_KEY=你的service_role_key
```

### "admins 表不存在"

在 Supabase Dashboard > SQL Editor 中执行 `supabase-setup.sql` 文件。

### 密码正确但登录失败

运行脚本重置密码：
```bash
node scripts/quick-create-admin.js
```

---

## 手动 SQL（仅用于查询）

查看所有管理员：
```sql
SELECT id, username, email, role, is_active, created_at 
FROM admins ORDER BY created_at DESC;
```

删除管理员（谨慎操作）：
```sql
DELETE FROM admins WHERE email = 'admin@xyvnai.com';
```

**注意：不要手动插入密码 hash！始终使用脚本。**
