#!/bin/bash

# Cloudflare Pages 部署脚本

echo "🚀 开始部署到 Cloudflare Pages..."

# 检查是否安装了 wrangler
if ! command -v wrangler &> /dev/null; then
    echo "❌ 未找到 wrangler，正在安装..."
    npm install -g wrangler
fi

# 检查是否已登录
echo "📝 检查 Cloudflare 登录状态..."
if ! wrangler whoami &> /dev/null; then
    echo "🔐 请登录 Cloudflare..."
    wrangler login
fi

# 构建项目
echo "🔨 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

# 部署到 Cloudflare Pages
echo "📦 部署到 Cloudflare Pages..."
npx wrangler pages deploy .next --project-name=xyvn-website --branch=main

if [ $? -eq 0 ]; then
    echo "✅ 部署成功！"
    echo "🌐 访问你的网站："
    echo "   https://xyvn-website.pages.dev"
else
    echo "❌ 部署失败"
    exit 1
fi
