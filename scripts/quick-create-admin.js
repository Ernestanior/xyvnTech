#!/usr/bin/env node

/**
 * 快速创建管理员账号
 * 使用方法: node scripts/quick-create-admin.js
 * 
 * 此脚本会：
 * 1. 使用 bcrypt 实时生成正确的密码 hash（不是硬编码的 hash）
 * 2. 检查账号是否已存在，存在则更新密码
 * 3. 验证生成的 hash 可以正确解密
 */

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

async function main() {
  console.log('=== 快速创建管理员账号 ===\n');

  // 从 .env.local 读取配置
  require('dotenv').config({ path: '.env.local' });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ 错误：无法读取 Supabase 配置');
    console.log('请确保 .env.local 文件中包含：');
    console.log('  NEXT_PUBLIC_SUPABASE_URL=你的supabase地址');
    console.log('  SUPABASE_SERVICE_ROLE_KEY=你的service_role_key');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // 管理员信息 - 如需修改账号密码，请修改这里
  const adminData = {
    username: 'admin',
    email: 'admin@xyvnai.com',    // 修改为你需要的邮箱
    password: 'admin123456',       // 修改为你需要的密码
  };

  console.log('准备创建管理员账号：');
  console.log(`  用户名: ${adminData.username}`);
  console.log(`  邮箱: ${adminData.email}`);
  console.log(`  密码: ${adminData.password}\n`);

  // 加密密码（实时生成，确保正确）
  console.log('正在生成密码 hash...');
  const passwordHash = await bcrypt.hash(adminData.password, 10);
  console.log(`  生成成功，hash前缀: ${passwordHash.substring(0, 30)}...\n`);

  // 验证 hash 可以正确比对
  console.log('验证 hash...');
  const verifyTest = await bcrypt.compare(adminData.password, passwordHash);
  if (!verifyTest) {
    console.error('❌ Hash 验证失败，中止操作');
    process.exit(1);
  }
  console.log('✅ Hash 验证通过\n');

  // 先检查是否已存在
  const { data: existing } = await supabase
    .from('admins')
    .select('id, email')
    .eq('email', adminData.email)
    .single();

  if (existing) {
    console.log('⚠️  该邮箱已存在，更新密码...\n');
    
    // 更新密码
    const { error: updateError } = await supabase
      .from('admins')
      .update({ 
        password_hash: passwordHash,
        username: adminData.username,
        is_active: true 
      })
      .eq('email', adminData.email);

    if (updateError) {
      console.error('❌ 更新失败：', updateError.message);
      process.exit(1);
    }

    console.log('✅ 密码已重置！');
  } else {
    // 创建新管理员
    console.log('创建新账号...\n');
    
    const { data, error } = await supabase
      .from('admins')
      .insert({
        username: adminData.username,
        email: adminData.email,
        password_hash: passwordHash,
        role: 'admin',
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error('❌ 创建失败：', error.message);
      console.log('\n可能原因：');
      console.log('  - admins 表不存在（请先在 Supabase 执行 supabase-setup.sql）');
      console.log('  - 邮箱格式错误');
      console.log('  - 连接配置错误');
      process.exit(1);
    }

    console.log('✅ 管理员账号创建成功！');
  }

  console.log('\n========================================');
  console.log('登录信息：');
  console.log(`  邮箱: ${adminData.email}`);
  console.log(`  密码: ${adminData.password}`);
  console.log('\n请访问 http://localhost:3000/admin/login 登录');
  console.log('⚠️  登录后请立即修改密码！');
  console.log('========================================\n');
}

main().catch((error) => {
  console.error('❌ 发生错误：', error.message);
  process.exit(1);
});
