# Cloudflare Pages 部署指南

## 前置要求

1. Cloudflare 账号
2. 已安装 Node.js 18+
3. 已安装 npm 或 pnpm

## 方式一：通过 Cloudflare Dashboard（推荐）

### 1. 连接 Git 仓库

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**
3. 选择你的 GitHub/GitLab 仓库
4. 授权 Cloudflare 访问

### 2. 配置构建设置

```
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Root directory: xyvn-website
Node version: 18
```

### 3. 配置环境变量

在 **Settings** > **Environment variables** 添加：

```bash
# 生产环境变量
NEXT_PUBLIC_SUPABASE_URL=https://bmolkigulwqkziwynkqt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的密钥
SUPABASE_SERVICE_ROLE_KEY=你的密钥
NEXTAUTH_URL=https://你的域名.pages.dev
NEXTAUTH_SECRET=你的密钥
NODE_VERSION=18
```

### 4. 部署

点击 **Save and Deploy**，Cloudflare 会自动构建和部署。

---

## 方式二：通过 Wrangler CLI

### 1. 安装 Wrangler

```bash
npm install -g wrangler
```

### 2. 登录 Cloudflare

```bash
wrangler login
```

### 3. 构建项目

```bash
cd xyvn-website
npm install
npm run build
```

### 4. 部署到 Cloudflare Pages

```bash
npx wrangler pages deploy .next --project-name=xyvn-website
```

### 5. 配置环境变量

```bash
# 设置生产环境变量
wrangler pages secret put NEXT_PUBLIC_SUPABASE_URL
wrangler pages secret put NEXT_PUBLIC_SUPABASE_ANON_KEY
wrangler pages secret put SUPABASE_SERVICE_ROLE_KEY
wrangler pages secret put NEXTAUTH_URL
wrangler pages secret put NEXTAUTH_SECRET
```

---

## 自定义域名

1. 在 Cloudflare Dashboard 进入你的 Pages 项目
2. **Custom domains** > **Set up a custom domain**
3. 输入你的域名（如 `www.xyvn.com`）
4. 按照提示配置 DNS 记录

---

## 本地测试 Cloudflare 环境

```bash
# 使用 Wrangler 本地开发
npm run build
npx wrangler pages dev .next
```

---

## 常见问题

### Q: 部署后 404 错误
A: 确保 `next.config.js` 没有 `output: 'export'` 配置

### Q: API Routes 不工作
A: Cloudflare Pages 完全支持 Next.js API Routes，检查环境变量是否正确配置

### Q: 中间件不生效
A: 确保 `wrangler.toml` 包含 `compatibility_flags = ["nodejs_compat"]`

### Q: 构建失败
A: 检查 Node 版本是否为 18+，可以在项目根目录添加 `.node-version` 文件

---

## 监控和日志

1. 在 Cloudflare Dashboard 查看部署日志
2. **Analytics** 查看访问统计
3. **Functions** > **Logs** 查看实时日志

---

## 回滚部署

1. 进入 **Deployments** 页面
2. 找到之前的成功部署
3. 点击 **Rollback to this deployment**

---

## 性能优化建议

1. 启用 Cloudflare CDN 缓存
2. 配置图片优化（Cloudflare Images）
3. 使用 Cloudflare Workers KV 存储会话数据（可选）
4. 启用 HTTP/3 和 Brotli 压缩
