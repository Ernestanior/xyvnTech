// 测试 Supabase 连接和权限
// 在终端运行: node xyvn-website/test-supabase.js

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://bmolkigulwqkziwynkqt.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtb2xraWd1bHdxa3ppd3lua3F0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDg0NzEwOSwiZXhwIjoyMDg2NDIzMTA5fQ.TBWRjQko89V2wk8krIY-rjzEw3bQ_rmx26TQrRt8zFs';

async function testSupabase() {
  console.log('🔍 测试 Supabase 连接...\n');

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // 测试 1: 检查连接
  console.log('1️⃣ 测试数据库连接...');
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('*')
    .limit(1);

  if (catError) {
    console.error('❌ 连接失败:', catError.message);
    return;
  }
  console.log('✅ 连接成功\n');

  // 测试 2: 检查 articles 表的 RLS 状态
  console.log('2️⃣ 检查 articles 表 RLS 状态...');
  const { data: rlsStatus, error: rlsError } = await supabase
    .rpc('check_rls_status');
  
  if (rlsError) {
    console.log('⚠️  无法检查 RLS 状态（这是正常的）\n');
  }

  // 测试 3: 尝试插入文章
  console.log('3️⃣ 测试插入文章...');
  const testArticle = {
    title: '测试文章',
    slug: 'test-article-' + Date.now(),
    content: '这是测试内容',
    excerpt: '测试摘要',
    status: 'draft',
    author_id: '00000000-0000-0000-0000-000000000000' // 假的 UUID
  };

  const { data: article, error: insertError } = await supabase
    .from('articles')
    .insert(testArticle)
    .select()
    .single();

  if (insertError) {
    console.error('❌ 插入失败:', insertError.message);
    console.error('错误详情:', insertError);
    
    if (insertError.message.includes('row-level security')) {
      console.log('\n💡 解决方案:');
      console.log('1. 打开 Supabase Dashboard');
      console.log('2. 进入 SQL Editor');
      console.log('3. 执行: ALTER TABLE articles DISABLE ROW LEVEL SECURITY;');
    }
    return;
  }

  console.log('✅ 插入成功!');
  console.log('文章 ID:', article.id);

  // 清理测试数据
  console.log('\n4️⃣ 清理测试数据...');
  await supabase.from('articles').delete().eq('id', article.id);
  console.log('✅ 清理完成\n');

  console.log('🎉 所有测试通过！');
}

testSupabase().catch(console.error);
