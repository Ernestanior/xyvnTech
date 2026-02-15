#!/usr/bin/env node

/**
 * 初始化管理员账号脚本
 * 使用方法：node scripts/init-admin.js
 */

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function main() {
  console.log('=== XYVN 管理员账号初始化 ===\n');

  // 从 .env.local 读取配置
  require('dotenv').config({ path: '.env.local' });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ 错误：无法读取 Supabase 配置');
    console.error('请确保 .env.local 文件存在并包含正确的配置');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // 获取管理员信息
  const username = await question('用户名: ');
  const email = await question('邮箱: ');
  const password = await question('密码 (至少6位): ');

  if (!username || !email || !password) {
    console.error('❌ 错误：所有字段都是必填的');
    rl.close();
    process.exit(1);
  }

  if (password.length < 6) {
    console.error('❌ 错误：密码至少需要6个字符');
    rl.close();
    process.exit(1);
  }

  // 加密密码
  console.log('\n正在创建管理员账号...');
  const passwordHash = await bcrypt.hash(password, 10);

  // 插入管理员
  const { data, error } = await supabase
    .from('admins')
    .insert({
      username,
      email,
      password_hash: passwordHash,
      role: 'admin',
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    console.error('❌ 错误：', error.message);
    if (error.message.includes('duplicate')) {
      console.error('该邮箱或用户名已存在');
    }
    rl.close();
    process.exit(1);
  }

  console.log('\n✅ 管理员账号创建成功！');
  console.log('\n账号信息：');
  console.log(`  用户名: ${username}`);
  console.log(`  邮箱: ${email}`);
  console.log(`  角色: 管理员`);
  console.log(`\n请访问 http://localhost:3000/admin/login 登录`);

  rl.close();
}

main().catch((error) => {
  console.error('❌ 发生错误：', error.message);
  process.exit(1);
});
