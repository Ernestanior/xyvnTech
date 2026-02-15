#!/usr/bin/env node

/**
 * 重置管理员密码脚本
 * 使用方法：node scripts/reset-password.js
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
  console.log('=== 管理员密码重置工具 ===\n');

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

  // 获取邮箱
  const email = await question('请输入要重置密码的管理员邮箱: ');
  
  if (!email) {
    console.error('❌ 邮箱不能为空');
    process.exit(1);
  }

  // 检查管理员是否存在
  const { data: admin, error: findError } = await supabase
    .from('admins')
    .select('id, username, email, role')
    .eq('email', email)
    .single();

  if (findError || !admin) {
    console.error(`❌ 未找到邮箱为 ${email} 的管理员`);
    process.exit(1);
  }

  console.log(`\n找到管理员：`);
  console.log(`  用户名: ${admin.username}`);
  console.log(`  邮箱: ${admin.email}`);
  console.log(`  角色: ${admin.role}\n`);

  // 获取新密码
  const newPassword = await question('请输入新密码 (至少6位): ');
  
  if (!newPassword || newPassword.length < 6) {
    console.error('❌ 密码至少需要6个字符');
    process.exit(1);
  }

  const confirmPassword = await question('请再次输入新密码: ');
  
  if (newPassword !== confirmPassword) {
    console.error('❌ 两次输入的密码不一致');
    process.exit(1);
  }

  // 加密新密码
  console.log('\n正在更新密码...');
  const passwordHash = await bcrypt.hash(newPassword, 10);

  // 更新密码
  const { error: updateError } = await supabase
    .from('admins')
    .update({ password_hash: passwordHash })
    .eq('id', admin.id);

  if (updateError) {
    console.error('❌ 更新密码失败:', updateError.message);
    process.exit(1);
  }

  console.log('\n✅ 密码重置成功！');
  console.log(`\n账号信息：`);
  console.log(`  邮箱: ${admin.email}`);
  console.log(`  新密码: ${newPassword}`);
  console.log(`\n请访问 /admin/login 使用新密码登录`);

  rl.close();
}

main().catch((error) => {
  console.error('\n❌ 发生错误：', error.message);
  process.exit(1);
});
