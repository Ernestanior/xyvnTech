# Vercel 部署指南

## 🚀 快速部署步骤

### 方式一：通过 Vercel Dashboard（推荐）

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择你的 GitHub 仓库：`Ernestanior/xyvnTech`
   - 点击 "Import"

3. **配置项目**
   ```
   Framework Preset: Next.js
   Root Directory: ./（留空或选择根目录）
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **配置环境变量**
   
   在 "Environment Variables" 部分添加：
   
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://bmolkigulwqkziwynkqt.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtb2xraWd1bHdxa3ppd3lua3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NDcxMDksImV4cCI6MjA4NjQyMzEwOX0.p-HaE0HFdRKadH-M_j2hJwGfFYJ6AV-u3lZ_IFei4bQ
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtb2xraWd1bHdxa3ppd3lua3F0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDg0NzEwOSwiZXhwIjoyMDg2NDIzMTA5fQ.TBWRjQko89V2wk8krIY-rjzEw3bQ_rmx26TQrRt8zFs
   NEXTAUTH_URL=https://你的域名.vercel.app
   NEXTAUTH_SECRET=wI/+Cf95xayNEcaZyez7RFc9cAoSwJurPX6/G7l1OF4=
   ```
   
   **注意：** `NEXTAUTH_URL` 先用 Vercel 提供的域名，部署后会自动生成

5. **点击 Deploy**
   - Vercel 会自动构建和部署
   - 等待 2-3 分钟

6. **部署完成**
   - 获取你的域名：`https://你的项目名.vercel.app`
   - 访问 `/admin/init` 初始化管理员
   - 访问 `/admin/login` 登录管理后台

---

### 方式二：通过 CLI

```bash
# 1. 登录 Vercel
vercel login

# 2. 部署（在项目根目录）
vercel

# 3. 按照提示操作
# - Set up and deploy? Yes
# - Which scope? 选择你的账号
# - Link to existing project? No
# - Project name? xyvn-website
# - Directory? ./
# - Override settings? No

# 4. 生产部署
vercel --prod
```

---

## 🔧 配置自定义域名

1. **在 Vercel Dashboard**
   - 进入你的项目
   - Settings → Domains
   - 添加你的域名：`www.xyvnai.com`

2. **配置 DNS**
   
   在你的域名提供商（如 Cloudflare）添加记录：
   
   ```
   类型: CNAME
   名称: www
   目标: cname.vercel-dns.com
   ```

3. **更新环境变量**
   
   修改 `NEXTAUTH_URL` 为你的自定义域名：
   ```
   NEXTAUTH_URL=https://www.xyvnai.com
   ```

4. **重新部署**
   - Vercel 会自动重新部署
   - 或手动触发：Deployments → Redeploy

---

## 📊 监控和管理

### 查看部署状态
- Dashboard → Deployments
- 查看构建日志
- 查看运行时日志

### 查看使用量
- Dashboard → Usage
- 带宽使用
- 函数执行时间
- 构建时间

### 环境变量管理
- Settings → Environment Variables
- 可以为不同环境设置不同的值
- Production / Preview / Development

---

## 🐛 常见问题

### Q: 构建失败
A: 检查构建日志，通常是依赖问题或环境变量缺失

### Q: API Routes 不工作
A: 确保环境变量已正确配置，特别是 Supabase 相关的

### Q: 404 错误
A: 检查路由配置，确保 Next.js 应用正确构建

### Q: 超出免费额度
A: 查看 Usage 页面，优化图片和缓存策略

---

## 🔄 自动部署

Vercel 已自动配置 GitHub 集成：

- ✅ 推送到 `main` 分支 → 自动部署到生产环境
- ✅ 推送到其他分支 → 自动创建预览部署
- ✅ Pull Request → 自动创建预览链接

---

## 📝 首次部署后的步骤

1. **初始化管理员**
   ```
   访问：https://你的域名.vercel.app/admin/init
   创建管理员账号
   ```

2. **登录管理后台**
   ```
   访问：https://你的域名.vercel.app/admin/login
   使用刚创建的账号登录
   ```

3. **测试功能**
   - 创建文章
   - 上传图片
   - 管理分类和标签
   - 查看咨询

---

## 🎉 完成！

你的网站现在已经部署到 Vercel，享受：
- 🚀 全球 CDN 加速
- 🔒 自动 HTTPS
- 📊 实时分析
- 🔄 自动部署
- 💰 免费额度充足
