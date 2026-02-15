#!/usr/bin/env node

/**
 * 快速创建管理员账号
 * 直接运行，无需交互
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
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // 管理员信息
  const adminData = {
    username: 'admin',
    email: 'ern@xyvnai.com',
    password: 'xyvn123456', // 临时密码，登录后请修改
  };

  console.log('创建管理员账号：');
  console.log(`  用户名: ${adminData.username}`);
  console.log(`  邮箱: ${adminData.email}`);
  console.log(`  密码: ${adminData.password}\n`);

  // 加密密码
  const passwordHash = await bcrypt.hash(adminData.password, 10);

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
      process.exit(1);
    }

    console.log('✅ 管理员账号创建成功！');
  }

  console.log('\n登录信息：');
  console.log(`  邮箱: ${adminData.email}`);
  console.log(`  密码: ${adminData.password}`);
  console.log('\n请访问 /admin/login 登录');
  console.log('⚠️  登录后请立即修改密码！\n');
}

main().catch((error) => {
  console.error('❌ 发生错误：', error.message);
  process.exit(1);
});
