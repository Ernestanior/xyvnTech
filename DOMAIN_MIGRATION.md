# 域名迁移到 Vercel 指南

本指南将帮助你将域名 `www.xyvnai.com` 从 Cloudflare Pages 迁移到 Vercel。

## 📋 前提条件

- ✅ 已有 Vercel 账号
- ✅ 项目已部署到 Vercel
- ✅ 域名在 Cloudflare 管理（或其他域名提供商）
- ✅ 有域名的 DNS 管理权限

---

## 🚀 迁移步骤

### 第一步：在 Vercel 部署项目

1. **登录 Vercel Dashboard**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择 GitHub 仓库：`Ernestanior/xyvnTech`
   - 点击 "Import"

3. **配置项目设置**
   ```
   Framework Preset: Next.js
   Root Directory: ./（留空）
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **添加环境变量**
   
   在 "Environment Variables" 部分添加以下变量：
   
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://bmolkigulwqkziwynkqt.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtb2xraWd1bHdxa3ppd3lua3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NDcxMDksImV4cCI6MjA4NjQyMzEwOX0.p-HaE0HFdRKadH-M_j2hJwGfFYJ6AV-u3lZ_IFei4bQ
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtb2xraWd1bHdxa3ppd3lua3F0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDg0NzEwOSwiZXhwIjoyMDg2NDIzMTA5fQ.TBWRjQko89V2wk8krIY-rjzEw3bQ_rmx26TQrRt8zFs
   NEXTAUTH_URL=https://www.xyvnai.com
   NEXTAUTH_SECRET=wI/+Cf95xayNEcaZyez7RFc9cAoSwJurPX6/G7l1OF4=
   ```

5. **点击 Deploy**
   - 等待 2-3 分钟完成部署
   - 记下 Vercel 提供的临时域名（如 `xyvntech.vercel.app`）

---

### 第二步：在 Vercel 添加自定义域名

1. **进入项目设置**
   - 在 Vercel Dashboard 中，进入你的项目
   - 点击 "Settings" → "Domains"

2. **添加域名**
   - 点击 "Add Domain"
   - 输入：`www.xyvnai.com`
   - 点击 "Add"

3. **记录 DNS 配置信息**
   
   Vercel 会显示需要配置的 DNS 记录，通常是：
   
   ```
   类型: CNAME
   名称: www
   目标: cname.vercel-dns.com
   ```
   
   或者可能是 A 记录：
   
   ```
   类型: A
   名称: www
   目标: 76.76.21.21
   ```

4. **（可选）添加根域名**
   
   如果你也想使用 `xyvnai.com`（不带 www）：
   - 再次点击 "Add Domain"
   - 输入：`xyvnai.com`
   - Vercel 会自动设置重定向到 `www.xyvnai.com`

---

### 第三步：在 Cloudflare 配置 DNS

1. **登录 Cloudflare Dashboard**
   - 访问 https://dash.cloudflare.com
   - 选择你的域名 `xyvnai.com`

2. **进入 DNS 设置**
   - 点击左侧菜单的 "DNS" → "Records"

3. **删除或修改现有记录**
   
   找到指向 Cloudflare Pages 的记录并删除或修改：
   
   - 删除类型为 `CNAME`，名称为 `www`，指向 Cloudflare Pages 的记录
   - 或者直接编辑这条记录

4. **添加新的 CNAME 记录**
   
   点击 "Add record"，填写：
   
   ```
   类型 (Type): CNAME
   名称 (Name): www
   目标 (Target): cname.vercel-dns.com
   TTL: Auto
   代理状态 (Proxy status): DNS only（灰色云朵，不要橙色）
   ```
   
   ⚠️ **重要**：必须选择 "DNS only"（灰色云朵），不要使用 Cloudflare 代理（橙色云朵），否则 Vercel 的 SSL 证书无法正常工作。

5. **（可选）配置根域名**
   
   如果你添加了根域名 `xyvnai.com`：
   
   ```
   类型 (Type): A
   名称 (Name): @
   目标 (Target): 76.76.21.21
   TTL: Auto
   代理状态: DNS only（灰色云朵）
   ```

6. **保存更改**
   - 点击 "Save"
   - DNS 更改可能需要几分钟到 48 小时生效（通常 5-10 分钟）

---

### 第四步：验证域名配置

1. **在 Vercel 检查状态**
   - 返回 Vercel Dashboard → Settings → Domains
   - 等待域名状态变为 "Valid Configuration"
   - Vercel 会自动配置 SSL 证书（Let's Encrypt）

2. **测试域名访问**
   
   等待几分钟后，访问：
   - https://www.xyvnai.com
   - 检查是否能正常访问网站
   - 检查 SSL 证书是否有效（浏览器地址栏显示锁图标）

3. **测试管理后台**
   - 访问：https://www.xyvnai.com/admin/login
   - 尝试登录
   - 检查所有功能是否正常

---

### 第五步：清理 Cloudflare Pages

1. **停止 Cloudflare Pages 部署**
   - 登录 Cloudflare Dashboard
   - 进入 "Workers & Pages"
   - 找到你的项目
   - 可以选择删除项目或暂停部署

2. **断开 GitHub 连接**（可选）
   - 在 Cloudflare Pages 项目设置中
   - 断开与 GitHub 仓库的连接
   - 这样推送代码时不会触发 Cloudflare 部署

---

## 🔧 DNS 传播检查

使用以下工具检查 DNS 是否已经生效：

1. **在线工具**
   - https://dnschecker.org
   - 输入 `www.xyvnai.com`
   - 查看全球各地的 DNS 解析结果

2. **命令行检查**
   
   ```bash
   # macOS/Linux
   dig www.xyvnai.com
   
   # 或者
   nslookup www.xyvnai.com
   
   # Windows
   nslookup www.xyvnai.com
   ```
   
   应该看到指向 Vercel 的 CNAME 记录

---

## ⚠️ 常见问题

### Q1: DNS 更改后多久生效？
A: 通常 5-10 分钟，最长可能需要 48 小时。可以清除浏览器缓存或使用无痕模式测试。

### Q2: SSL 证书错误怎么办？
A: 
- 确保 Cloudflare 的代理状态是 "DNS only"（灰色云朵）
- 等待 Vercel 自动配置 SSL 证书（可能需要几分钟）
- 在 Vercel Dashboard 检查域名状态

### Q3: 网站显示 404 错误？
A: 
- 检查 Vercel 部署是否成功
- 检查环境变量是否正确配置
- 查看 Vercel 的部署日志

### Q4: 可以同时保留 Cloudflare 的 CDN 加速吗？
A: 不建议。Vercel 自带全球 CDN，使用 Cloudflare 代理可能导致 SSL 证书问题。如果一定要用，需要配置 Cloudflare 的 SSL 模式为 "Full (strict)"。

### Q5: 如何回滚到 Cloudflare Pages？
A: 
- 在 Cloudflare DNS 中，将 CNAME 记录改回指向 Cloudflare Pages
- 重新启用 Cloudflare Pages 部署
- 等待 DNS 生效

---

## 📊 迁移检查清单

完成以下检查确保迁移成功：

- [ ] Vercel 项目部署成功
- [ ] 环境变量已配置
- [ ] 在 Vercel 添加了自定义域名
- [ ] Cloudflare DNS 记录已更新
- [ ] DNS 代理状态设置为 "DNS only"
- [ ] 域名可以正常访问
- [ ] SSL 证书有效
- [ ] 管理后台可以登录
- [ ] 所有功能正常工作
- [ ] 已停止 Cloudflare Pages 部署

---

## 🎉 迁移完成！

恭喜！你的网站现在已经运行在 Vercel 上了。

**Vercel 的优势：**
- ✅ 自动部署（推送到 GitHub 自动触发）
- ✅ 全球 CDN 加速
- ✅ 自动 SSL 证书
- ✅ 完美支持 Next.js SSR 和 API Routes
- ✅ 实时日志和监控
- ✅ 预览部署（每个 PR 都有独立预览链接）

**下一步：**
1. 在 `/admin/init` 初始化管理员账号（如果还没有）
2. 在 `/admin/settings` 配置网站信息
3. 开始创建内容！

---

## 📞 需要帮助？

如果遇到问题：
1. 查看 Vercel 部署日志
2. 检查 DNS 配置是否正确
3. 使用 DNS 检查工具验证
4. 查看浏览器控制台错误信息

