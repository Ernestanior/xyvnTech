# 🌐 arvixai.com 域名配置到 Vercel 详细指南

## 📋 你的配置信息

- **原域名：** `www.xyvnai.com`（需要恢复）
- **新域名：** `arvixai.com`（连接到 Vercel）
- **Vercel 项目：** xyvn-website

---

## 🎯 完整操作步骤

### 第一步：恢复原域名 www.xyvnai.com

#### 1.1 在 Vercel 移除原域名

1. 访问：https://vercel.com
2. 登录并进入项目 **xyvn-website**
3. 点击 **Settings** → **Domains**
4. 找到 `www.xyvnai.com` 和 `xyvnai.com`（如果有）
5. 点击每个域名旁边的 **"..."** → **Remove**
6. 确认删除

#### 1.2 在 Cloudflare 恢复原域名配置

1. 访问：https://dash.cloudflare.com
2. 选择域名 **xyvnai.com**
3. 进入 **DNS** → **Records**
4. 找到指向 Vercel 的记录（`cname.vercel-dns.com` 或 `76.76.21.21`）
5. 删除或修改回原来的配置

**如果原来是 Cloudflare Pages，恢复为：**
```
类型: CNAME
名称: www
目标: [你的项目名].pages.dev
代理状态: 已代理（橙色云朵 🟠）
```

6. 等待 5-10 分钟，访问 `www.xyvnai.com` 确认恢复正常

---

### 第二步：在 Vercel 添加新域名 arvixai.com

#### 2.1 添加根域名

1. 在 Vercel Dashboard，进入项目 **xyvn-website**
2. 点击 **Settings** → **Domains**
3. 在输入框输入：`arvixai.com`
4. 点击 **Add**

Vercel 会显示需要配置的 DNS 记录：
```
类型: A
名称: @
值: 76.76.21.21
```

#### 2.2 添加 www 子域名

1. 继续在 Domains 页面
2. 在输入框输入：`www.arvixai.com`
3. 点击 **Add**

Vercel 会显示：
```
类型: CNAME
名称: www
值: cname.vercel-dns.com
```

#### 2.3 记录配置信息

保持 Vercel 页面打开，记下这些信息：
- 根域名 A 记录：`76.76.21.21`
- www CNAME 记录：`cname.vercel-dns.com`

---

### 第三步：在 Cloudflare 配置 arvixai.com 的 DNS

#### 3.1 登录 Cloudflare

1. 访问：https://dash.cloudflare.com
2. 选择域名 **arvixai.com**
3. 进入 **DNS** → **Records**

#### 3.2 添加根域名 A 记录

点击 **Add record**，填写：

```
Type: A
Name: @
IPv4 address: 76.76.21.21
Proxy status: DNS only（灰色云朵 ☁️）
TTL: Auto
```

⚠️ **重要：** 必须选择 **DNS only**（灰色云朵），不要选择 Proxied（橙色云朵）

点击 **Save**

#### 3.3 添加 www 子域名 CNAME 记录

点击 **Add record**，填写：

```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only（灰色云朵 ☁️）
TTL: Auto
```

⚠️ **重要：** 同样必须选择 **DNS only**（灰色云朵）

点击 **Save**

#### 3.4 确认配置

你的 DNS 记录应该看起来像这样：

| Type  | Name | Content              | Proxy Status | TTL  |
|-------|------|----------------------|--------------|------|
| A     | @    | 76.76.21.21          | DNS only ☁️  | Auto |
| CNAME | www  | cname.vercel-dns.com | DNS only ☁️  | Auto |

---

### 第四步：等待 DNS 传播和验证

#### 4.1 等待 DNS 传播

- 通常需要：**5-30 分钟**
- 最长可能：**48 小时**

#### 4.2 检查 DNS 传播状态

**方法 1：使用在线工具**
1. 访问：https://dnschecker.org
2. 输入：`arvixai.com`
3. 选择记录类型：`A`
4. 查看全球解析结果，应该显示 `76.76.21.21`

5. 再次检查：`www.arvixai.com`
6. 选择记录类型：`CNAME`
7. 应该显示 `cname.vercel-dns.com`

**方法 2：使用命令行**
```bash
# 检查根域名
dig arvixai.com

# 检查 www 子域名
dig www.arvixai.com

# 或使用 nslookup
nslookup arvixai.com
nslookup www.arvixai.com
```

#### 4.3 在 Vercel 检查验证状态

1. 回到 Vercel → Settings → Domains
2. 查看域名状态：
   - ⏳ **Pending** - 正在验证
   - ✅ **Valid** - 验证成功
   - ❌ **Invalid Configuration** - 配置错误

3. 如果显示错误，点击 **Refresh** 按钮
4. 等待状态变为 **Valid**

#### 4.4 SSL 证书自动配置

- Vercel 会自动申请 Let's Encrypt SSL 证书
- 通常在域名验证后 **1-5 分钟**完成
- 状态会显示 **Valid** 并带有绿色锁图标 🔒

---

### 第五步：设置主域名

#### 5.1 选择主域名

推荐设置：
- **主域名：** `arvixai.com`（不带 www）
- **重定向：** `www.arvixai.com` → `arvixai.com`

#### 5.2 在 Vercel 设置

1. 在 Vercel → Settings → Domains
2. 找到 `arvixai.com`
3. 点击 **"..."** → **Set as Primary**
4. `www.arvixai.com` 会自动重定向到 `arvixai.com`

---

### 第六步：更新项目配置

#### 6.1 更新 Vercel 环境变量

1. 在 Vercel → Settings → **Environment Variables**
2. 找到 `NEXTAUTH_URL`
3. 点击 **Edit**
4. 修改为：
   ```
   NEXTAUTH_URL=https://arvixai.com
   ```
5. 选择应用到：**Production, Preview, Development**
6. 点击 **Save**

#### 6.2 更新本地 .env.local 文件

打开项目根目录的 `.env.local` 文件，修改：

```bash
# 原来的
NEXTAUTH_URL=https://www.xyvnai.com

# 改为
NEXTAUTH_URL=https://arvixai.com
```

#### 6.3 检查并更新代码中的域名引用

需要检查的文件：

**1. src/app/layout.tsx**
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://arvixai.com'), // 更新这里
  title: {
    default: '你的网站标题',
    template: '%s | 你的网站标题'
  },
  // ...
}
```

**2. src/app/sitemap.ts**
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://arvixai.com' // 更新这里
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      // ...
    },
    // ...
  ]
}
```

**3. 检查其他可能的硬编码域名**
```bash
# 在项目根目录运行，搜索旧域名
grep -r "xyvnai.com" src/
```

#### 6.4 提交代码更改

```bash
# 查看修改
git status

# 添加修改的文件
git add .env.local src/app/layout.tsx src/app/sitemap.ts

# 提交
git commit -m "更新域名为 arvixai.com"

# 推送到 GitHub
git push
```

Vercel 会自动检测到推送并重新部署。

#### 6.5 或手动触发重新部署

如果没有代码更改，在 Vercel Dashboard：
1. 进入 **Deployments**
2. 找到最新的部署
3. 点击 **"..."** → **Redeploy**
4. 选择 **Use existing Build Cache**
5. 点击 **Redeploy**

---

### 第七步：验证配置

#### 7.1 测试域名访问

1. **测试根域名：**
   - 访问：https://arvixai.com
   - 应该能正常访问网站
   - 检查浏览器地址栏有绿色锁图标 🔒

2. **测试 www 子域名：**
   - 访问：https://www.arvixai.com
   - 应该自动重定向到 https://arvixai.com

3. **测试 HTTP 自动跳转：**
   - 访问：http://arvixai.com
   - 应该自动跳转到 https://arvixai.com

#### 7.2 测试管理后台

1. 访问：https://arvixai.com/admin/login
2. 使用管理员账号登录
3. 测试以下功能：
   - ✅ 查看仪表板
   - ✅ 创建/编辑文章
   - ✅ 上传图片
   - ✅ 管理分类和标签
   - ✅ 查看咨询

#### 7.3 测试前台功能

1. 访问首页：https://arvixai.com
2. 访问博客列表：https://arvixai.com/blog
3. 访问文章详情页
4. 测试联系表单提交
5. 检查所有页面链接

#### 7.4 测试 API 端点

打开浏览器开发者工具（F12），检查：
- ✅ API 请求正常
- ✅ 没有 CORS 错误
- ✅ 没有 401/403 认证错误
- ✅ 图片正常加载

---

### 第八步：启用 Cloudflare 代理（可选）

⚠️ **只有在 Vercel 完全配置成功后才能启用！**

#### 8.1 确认 Vercel 配置完成

确保以下都正常：
- ✅ Vercel 域名状态为 "Valid"
- ✅ SSL 证书已颁发
- ✅ 网站可以通过 HTTPS 访问
- ✅ 所有功能正常工作
- ✅ 管理后台可以登录

#### 8.2 启用 Cloudflare 代理

1. 回到 Cloudflare → DNS → Records
2. 找到 `arvixai.com` 的 A 记录
3. 点击灰色云朵 ☁️，变成橙色云朵 🟠
4. 找到 `www.arvixai.com` 的 CNAME 记录
5. 点击灰色云朵 ☁️，变成橙色云朵 🟠
6. 保存更改

#### 8.3 配置 Cloudflare SSL

1. 进入 **SSL/TLS** → **Overview**
2. 加密模式选择：**Full (strict)**

3. 进入 **SSL/TLS** → **Edge Certificates**
4. 开启以下选项：
   - ✅ **Always Use HTTPS**
   - ✅ **Automatic HTTPS Rewrites**
   - ✅ **Opportunistic Encryption**
   - ✅ **TLS 1.3**

5. 进入 **Speed** → **Optimization**
6. 开启以下选项：
   - ✅ **Auto Minify**（HTML, CSS, JavaScript）
   - ✅ **Brotli**
   - ✅ **Early Hints**

#### 8.4 测试代理后的访问

1. 清除浏览器缓存
2. 访问：https://arvixai.com
3. 确认网站正常访问
4. 检查速度是否有提升

---

## 🔍 故障排查

### 问题 1：域名验证失败

**症状：** Vercel 显示 "Invalid Configuration"

**可能原因：**
- DNS 记录配置错误
- Cloudflare 代理未关闭
- DNS 还未传播完成

**解决方案：**
1. 检查 Cloudflare DNS 记录是否完全正确
2. 确认代理状态是 **DNS only**（灰色云朵）
3. 等待 10-30 分钟后点击 Vercel 的 **Refresh** 按钮
4. 使用 `dig arvixai.com` 检查 DNS 是否生效
5. 如果还是失败，删除域名后重新添加

### 问题 2：SSL 证书无法颁发

**症状：** 域名验证成功但没有 SSL 证书

**解决方案：**
1. 确认域名状态为 "Valid"
2. 确认 Cloudflare 代理已关闭
3. 等待 5-10 分钟
4. 如果还是失败：
   - 在 Vercel 删除域名
   - 等待 5 分钟
   - 重新添加域名

### 问题 3：网站显示 404 或 "Deployment not found"

**可能原因：**
- 项目未部署
- 域名指向错误的项目

**解决方案：**
1. 检查 Vercel 项目是否已成功部署
2. 查看最新部署的状态
3. 确认域名添加到正确的项目
4. 重新部署项目

### 问题 4：登录功能不工作

**症状：** 登录后立即退出或显示错误

**可能原因：**
- `NEXTAUTH_URL` 环境变量未更新
- Cookie 域名不匹配

**解决方案：**
1. 检查 Vercel 环境变量中的 `NEXTAUTH_URL`
2. 确认值为 `https://arvixai.com`
3. 重新部署项目
4. 清除浏览器 Cookie 和缓存
5. 重新登录

### 问题 5：图片或资源加载失败

**可能原因：**
- 硬编码了旧域名
- CORS 配置问题

**解决方案：**
1. 检查代码中是否有硬编码的旧域名
2. 检查 Supabase 存储桶的 CORS 配置
3. 查看浏览器控制台的错误信息

### 问题 6：DNS 传播缓慢

**解决方案：**

**清除本地 DNS 缓存：**
```bash
# macOS
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# Windows
ipconfig /flushdns

# Linux
sudo systemd-resolve --flush-caches
```

**使用不同的 DNS 服务器测试：**
- Google DNS: `8.8.8.8`
- Cloudflare DNS: `1.1.1.1`

---

## ✅ 完成检查清单

### 原域名恢复
- [ ] 原域名 `www.xyvnai.com` 已从 Vercel 移除
- [ ] 原域名 DNS 已恢复原配置
- [ ] 原域名可以正常访问原服务

### 新域名配置
- [ ] 新域名 `arvixai.com` 已添加到 Vercel
- [ ] 新域名 `www.arvixai.com` 已添加到 Vercel
- [ ] Cloudflare DNS A 记录已配置（@ → 76.76.21.21）
- [ ] Cloudflare DNS CNAME 记录已配置（www → cname.vercel-dns.com）
- [ ] Cloudflare 代理已关闭（灰色云朵）
- [ ] Vercel 域名状态显示 "Valid"
- [ ] SSL 证书已自动配置
- [ ] 主域名已设置为 `arvixai.com`

### 项目配置
- [ ] Vercel 环境变量 `NEXTAUTH_URL` 已更新
- [ ] 本地 `.env.local` 文件已更新
- [ ] `src/app/layout.tsx` 中的域名已更新
- [ ] `src/app/sitemap.ts` 中的域名已更新
- [ ] 代码已提交并推送
- [ ] 项目已重新部署

### 功能测试
- [ ] https://arvixai.com 可以访问
- [ ] https://www.arvixai.com 自动重定向
- [ ] HTTPS 正常工作（绿色锁图标）
- [ ] 管理后台可以登录
- [ ] 文章创建/编辑功能正常
- [ ] 图片上传功能正常
- [ ] 前台页面显示正常
- [ ] API 调用正常
- [ ] 所有链接正常工作

### 可选优化
- [ ] Cloudflare 代理已启用（如需要）
- [ ] Cloudflare SSL 模式设置为 Full (strict)
- [ ] Cloudflare 性能优化已开启

---

## 📝 最终配置总结

### Cloudflare DNS 配置（arvixai.com）

| Type  | Name | Content              | Proxy Status      | TTL  |
|-------|------|----------------------|-------------------|------|
| A     | @    | 76.76.21.21          | DNS only ☁️       | Auto |
| CNAME | www  | cname.vercel-dns.com | DNS only ☁️       | Auto |

*注：配置完成后可以启用代理（橙色云朵 🟠）*

### Vercel Domains 配置

```
arvixai.com          ✓ Valid (Primary) 🔒
www.arvixai.com      ✓ Valid (Redirects to arvixai.com) 🔒
```

### Vercel 环境变量

```bash
NEXTAUTH_URL=https://arvixai.com
NEXT_PUBLIC_SUPABASE_URL=https://bmolkigulwqkziwynkqt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXTAUTH_SECRET=wI/+Cf95xayNEcaZyez7RFc9cAoSwJurPX6/G7l1OF4=
```

### 本地 .env.local 文件

```bash
NEXTAUTH_URL=https://arvixai.com
NEXT_PUBLIC_SUPABASE_URL=https://bmolkigulwqkziwynkqt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXTAUTH_SECRET=wI/+Cf95xayNEcaZyez7RFc9cAoSwJurPX6/G7l1OF4=
```

---

## 🎉 完成！

按照这些步骤操作后：
- ✅ 原域名 `www.xyvnai.com` 恢复正常
- ✅ 新域名 `arvixai.com` 成功连接到 Vercel
- ✅ 网站在新域名下正常运行
- ✅ 所有功能正常工作
- ✅ HTTPS 和 SSL 证书配置完成

---

## 💡 后续建议

### 1. SEO 优化
- 在 Google Search Console 添加新域名
- 提交新的 sitemap
- 更新 robots.txt

### 2. 更新外部链接
- 社交媒体账号
- 名片和宣传材料
- 合作伙伴网站
- 邮件签名

### 3. 监控和分析
- 使用 Vercel Analytics 监控流量
- 检查页面加载速度
- 监控错误日志

### 4. 备份和文档
- 保存 DNS 配置截图
- 记录环境变量
- 更新项目文档

---

## 📞 需要帮助？

如果遇到任何问题：

1. **检查 Vercel 文档**
   - https://vercel.com/docs/concepts/projects/domains

2. **检查 Cloudflare 文档**
   - https://developers.cloudflare.com/dns/

3. **使用诊断工具**
   - https://dnschecker.org
   - https://www.whatsmydns.net
   - https://www.ssllabs.com/ssltest/

4. **查看日志**
   - Vercel 部署日志
   - 浏览器控制台
   - Network 请求

---

**祝你配置顺利！🚀**

有任何问题随时问我！
