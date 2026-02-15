#!/usr/bin/env node

/**
 * 验证管理员账号和密码
 */

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

async function main() {
  console.log('=== 验证管理员账号 ===\n');

  require('dotenv').config({ path: '.env.local' });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const supabase = createClient(supabaseUrl, supabaseKey);

  const email = 'ern@xyvnai.com';
  const password = 'xyvn123456';

  console.log(`检查邮箱: ${email}\n`);

  // 查询管理员
  const { data: admin, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !admin) {
    console.error('❌ 未找到该管理员');
    console.error('错误:', error?.message);
    process.exit(1);
  }

  console.log('✅ 找到管理员：');
  console.log(`  ID: ${admin.id}`);
  console.log(`  用户名: ${admin.username}`);
  console.log(`  邮箱: ${admin.email}`);
  console.log(`  角色: ${admin.role}`);
  console.log(`  激活状态: ${admin.is_active}`);
  console.log(`  密码哈希: ${admin.password_hash.substring(0, 20)}...`);

  // 验证密码
  console.log(`\n验证密码: ${password}`);
  const isValid = await bcrypt.compare(password, admin.password_hash);

  if (isValid) {
    console.log('✅ 密码验证成功！');
  } else {
    console.log('❌ 密码验证失败！');
    
    // 重新生成正确的密码哈希
    console.log('\n正在重新设置密码...');
    const newHash = await bcrypt.hash(password, 10);
    
    const { error: updateError } = await supabase
      .from('admins')
      .update({ password_hash: newHash })
      .eq('id', admin.id);
    
    if (updateError) {
      console.error('❌ 更新失败:', updateError.message);
    } else {
      console.log('✅ 密码已重新设置！');
      console.log('请重新尝试登录');
    }
  }
}

main().catch((error) => {
  console.error('❌ 发生错误：', error.message);
  process.exit(1);
});
