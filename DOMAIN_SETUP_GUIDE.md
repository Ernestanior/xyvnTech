# 🌐 新域名配置指南 - Cloudflare + Vercel

## 📋 前提条件

- ✅ 在 Cloudflare 购买了新域名
- ✅ Vercel 项目已部署
- ✅ 需要将新域名连接到 Vercel

---

## 🎯 完整步骤

### 第一步：在 Vercel 添加新域名

1. **登录 Vercel**
   - 访问 https://vercel.com
   - 进入你的项目（xyvn-website）

2. **进入项目设置**
   - 点击项目名称
   - 点击顶部的 "Settings" 标签

3. **添加域名**
   - 在左侧菜单选择 "Domains"
   - 在输入框中输入你的新域名（例如：`newdomain.com`）
   - 点击 "Add" 按钮

4. **记录 Vercel 提供的配置信息**
   
   Vercel 会显示需要配置的 DNS 记录，通常是：
   
   **方式 A：使用 A 记录（推荐）**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```
   
   **方式 B：使用 CNAME 记录**
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```
   
   **www 子域名：**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

### 第二步：在 Cloudflare 配置 DNS

1. **登录 Cloudflare**
   - 访问 https://dash.cloudflare.com
   - 选择你的新域名

2. **进入 DNS 设置**
   - 点击左侧菜单的 "DNS" > "Records"

3. **添加 DNS 记录**

   **选项 A：使用 A 记录（推荐）**
   
   添加根域名记录：
   - Type: `A`
   - Name: `@`
   - IPv4 address: `76.76.21.21`
   - Proxy status: 🟠 DNS only（关闭代理）
   - TTL: Auto
   - 点击 "Save"

   添加 www 子域名：
   - Type: `CNAME`
   - Name: `www`
   - Target: `cname.vercel-dns.com`
   - Proxy status: 🟠 DNS only（关闭代理）
   - TTL: Auto
   - 点击 "Save"

   **选项 B：使用 CNAME 记录**
   
   添加根域名记录：
   - Type: `CNAME`
   - Name: `@`
   - Target: `cname.vercel-dns.com`
   - Proxy status: 🟠 DNS only（关闭代理）
   - TTL: Auto
   - 点击 "Save"

   添加 www 子域名：
   - Type: `CNAME`
   - Name: `www`
   - Target: `cname.vercel-dns.com`
   - Proxy status: 🟠 DNS only（关闭代理）
   - TTL: Auto
   - 点击 "Save"

4. **重要：关闭 Cloudflare 代理**
   
   ⚠️ 在配置 Vercel 域名时，必须关闭 Cloudflare 的代理（橙色云朵变成灰色云朵）
   
   原因：Vercel 需要直接验证域名所有权，Cloudflare 代理会阻止验证。

---

### 第三步：等待 DNS 传播和验证

1. **DNS 传播时间**
   - 通常需要 5-30 分钟
   - 最长可能需要 48 小时

2. **检查 DNS 传播状态**
   
   使用在线工具检查：
   - https://dnschecker.org
   - 输入你的域名
   - 选择 A 或 CNAME 记录类型
   - 查看全球各地的 DNS 解析结果

3. **在 Vercel 检查状态**
   - 回到 Vercel 项目的 Domains 页面
   - 等待域名状态变为 "Valid"
   - 如果显示错误，点击 "Refresh" 按钮

---

### 第四步：配置 SSL 证书

1. **Vercel 自动配置**
   - Vercel 会自动为你的域名申请 Let's Encrypt SSL 证书
   - 通常在域名验证成功后 1-5 分钟内完成
   - 状态会显示为 "Valid" 并带有绿色锁图标

2. **如果 SSL 配置失败**
   - 确认 DNS 记录正确
   - 确认 Cloudflare 代理已关闭
   - 在 Vercel 点击域名旁的 "..." > "Remove" 然后重新添加

---

### 第五步：配置域名重定向（可选）

如果你想让 www 自动跳转到根域名（或反之）：

1. **在 Vercel 设置**
   - 进入 Settings > Domains
   - 找到你想设置为主域名的那个
   - 点击 "..." > "Set as Primary"
   - 其他域名会自动重定向到主域名

---

### 第六步：启用 Cloudflare 代理（可选）

⚠️ 只有在 Vercel 完全配置成功后才能启用！

1. **确认 Vercel 配置完成**
   - SSL 证书已颁发
   - 域名状态为 "Valid"
   - 网站可以正常访问

2. **启用 Cloudflare 代理**
   - 回到 Cloudflare DNS 设置
   - 点击 DNS 记录旁的灰色云朵
   - 变成橙色云朵表示代理已启用

3. **Cloudflare 额外配置**
   
   进入 SSL/TLS 设置：
   - 加密模式选择：**Full (strict)**
   - 自动 HTTPS 重写：**开启**
   - 始终使用 HTTPS：**开启**

---

## 🔧 常见问题解决

### 问题 1：域名验证失败

**原因：**
- DNS 记录配置错误
- Cloudflare 代理未关闭
- DNS 还未传播完成

**解决方案：**
1. 检查 DNS 记录是否正确
2. 确认 Cloudflare 代理已关闭（灰色云朵）
3. 等待 10-30 分钟后重试
4. 使用 `dig` 或 `nslookup` 命令检查 DNS：
   ```bash
   dig yourdomain.com
   nslookup yourdomain.com
   ```

---

### 问题 2：SSL 证书无法颁发

**原因：**
- DNS 记录不正确
- Cloudflare 代理干扰
- 域名验证未完成

**解决方案：**
1. 确认域名已验证成功
2. 关闭 Cloudflare 代理
3. 在 Vercel 删除域名后重新添加
4. 等待 5-10 分钟

---

### 问题 3：网站显示 "Deployment not found"

**原因：**
- 域名配置正确但项目未部署
- 域名指向错误的项目

**解决方案：**
1. 确认项目已成功部署
2. 检查域名是否添加到正确的 Vercel 项目
3. 重新部署项目

---

### 问题 4：DNS 传播缓慢

**解决方案：**
1. 清除本地 DNS 缓存：
   
   **macOS:**
   ```bash
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   ```
   
   **Windows:**
   ```bash
   ipconfig /flushdns
   ```
   
   **Linux:**
   ```bash
   sudo systemd-resolve --flush-caches
   ```

2. 使用不同的 DNS 服务器测试：
   - Google DNS: 8.8.8.8
   - Cloudflare DNS: 1.1.1.1

---

## ✅ 验证清单

完成配置后，检查以下项目：

- [ ] 域名可以在浏览器中访问
- [ ] HTTPS 正常工作（绿色锁图标）
- [ ] www 和根域名都能访问
- [ ] 域名重定向正常工作
- [ ] 网站内容显示正确
- [ ] 所有页面都能正常访问

---

## 📝 配置示例

假设你的新域名是 `example.com`：

### Cloudflare DNS 配置：

| Type  | Name | Content              | Proxy Status | TTL  |
|-------|------|----------------------|--------------|------|
| A     | @    | 76.76.21.21          | DNS only     | Auto |
| CNAME | www  | cname.vercel-dns.com | DNS only     | Auto |

### Vercel Domains 配置：

```
example.com          ✓ Valid (Primary)
www.example.com      ✓ Valid (Redirects to example.com)
```

---

## 🚀 完成后的步骤

1. **更新环境变量**
   
   如果你的项目中有硬编码的域名，需要更新：
   - `.env.local` 文件
   - Vercel 环境变量
   - 数据库配置
   - API 端点

2. **更新 SEO 设置**
   
   更新以下文件中的域名：
   - `src/app/layout.tsx` - metadata
   - `sitemap.ts`
   - `robots.txt`

3. **测试所有功能**
   - 登录功能
   - API 调用
   - 图片上传
   - 外部链接

---

## 💡 最佳实践

1. **先在 Vercel 添加域名，再配置 DNS**
   - 这样可以看到 Vercel 要求的具体配置

2. **关闭 Cloudflare 代理直到完全配置成功**
   - 避免验证问题

3. **使用 A 记录而不是 CNAME**
   - A 记录更稳定，兼容性更好

4. **保留旧域名一段时间**
   - 设置 301 重定向到新域名
   - 给用户和搜索引擎时间适应

5. **配置完成后再启用 Cloudflare 代理**
   - 享受 CDN 加速和 DDoS 防护

---

## 📞 需要帮助？

如果遇到问题：

1. **检查 Vercel 文档**
   - https://vercel.com/docs/concepts/projects/domains

2. **检查 Cloudflare 文档**
   - https://developers.cloudflare.com/dns/

3. **使用诊断工具**
   - https://dnschecker.org
   - https://www.whatsmydns.net

---

**准备好了吗？按照这些步骤操作，你的新域名很快就能正常工作！** 🎉
