#!/usr/bin/env node

/**
 * Supabase 数据迁移脚本
 * 用于将数据从旧 Supabase 项目迁移到新项目
 * 
 * 使用方法：
 * 1. 安装依赖：npm install @supabase/supabase-js
 * 2. 配置下面的环境变量
 * 3. 运行：node scripts/migrate-supabase.js
 */

const { createClient } = require('@supabase/supabase-js');

// ============================================
// 配置区域 - 请填写你的 Supabase 信息
// ============================================

// 旧 Supabase 项目配置
const OLD_SUPABASE_URL = 'https://bmolkigulwqkziwynkqt.supabase.co';
const OLD_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtb2xraWd1bHdxa3ppd3lua3F0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDg0NzEwOSwiZXhwIjoyMDg2NDIzMTA5fQ.TBWRjQko89V2wk8krIY-rjzEw3bQ_rmx26TQrRt8zFs';

// 新 Supabase 项目配置（请替换为你的新项目信息）
const NEW_SUPABASE_URL = 'https://ylqemhnfvbmbarmsaojx.supabase.co'; // 例如：https://xxxxx.supabase.co
const NEW_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlscWVtaG5mdmJtYmFybXNhb2p4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTEyMzA1NiwiZXhwIjoyMDg2Njk5MDU2fQ.zIm1yLcPNAumjgrWOmnFKvFcDU6e7ZX3aBWxBa7RWXA';

// ============================================
// 初始化客户端
// ============================================

const oldSupabase = createClient(OLD_SUPABASE_URL, OLD_SERVICE_ROLE_KEY);
const newSupabase = createClient(NEW_SUPABASE_URL, NEW_SERVICE_ROLE_KEY);

// ============================================
// 迁移函数
// ============================================

async function migrateTable(tableName, orderBy = 'created_at', options = {}) {
  console.log(`\n📦 开始迁移表: ${tableName}`);
  
  try {
    // 从旧数据库读取数据
    const { data, error } = await oldSupabase
      .from(tableName)
      .select('*')
      .order(orderBy, { ascending: true });
    
    if (error) {
      console.error(`❌ 读取 ${tableName} 失败:`, error.message);
      return { success: false, count: 0 };
    }
    
    if (!data || data.length === 0) {
      console.log(`⚠️  ${tableName} 表为空，跳过`);
      return { success: true, count: 0 };
    }
    
    console.log(`📊 找到 ${data.length} 条记录`);
    
    // 如果需要清空目标表（用于有默认数据的表）
    if (options.clearFirst) {
      console.log(`🗑️  清空目标表 ${tableName} 中的现有数据...`);
      const { error: deleteError } = await newSupabase
        .from(tableName)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // 删除所有记录
      
      if (deleteError) {
        console.warn(`⚠️  清空表失败（可能表为空）: ${deleteError.message}`);
      }
    }
    
    // 插入到新数据库（使用 upsert 避免冲突）
    const { error: insertError } = await newSupabase
      .from(tableName)
      .upsert(data, { 
        onConflict: options.conflictColumn || 'id',
        ignoreDuplicates: false 
      });
    
    if (insertError) {
      console.error(`❌ 插入 ${tableName} 失败:`, insertError.message);
      return { success: false, count: 0 };
    }
    
    console.log(`✅ ${tableName} 迁移成功！共 ${data.length} 条记录`);
    return { success: true, count: data.length };
    
  } catch (err) {
    console.error(`❌ 迁移 ${tableName} 时发生错误:`, err.message);
    return { success: false, count: 0 };
  }
}

async function migrateStorage(bucketName) {
  console.log(`\n🗂️  开始迁移 Storage bucket: ${bucketName}`);
  
  try {
    // 列出旧 bucket 中的所有文件
    const { data: files, error: listError } = await oldSupabase
      .storage
      .from(bucketName)
      .list('', {
        limit: 1000,
        sortBy: { column: 'name', order: 'asc' }
      });
    
    if (listError) {
      console.error(`❌ 列出 ${bucketName} 文件失败:`, listError.message);
      return { success: false, count: 0 };
    }
    
    if (!files || files.length === 0) {
      console.log(`⚠️  ${bucketName} bucket 为空，跳过`);
      return { success: true, count: 0 };
    }
    
    console.log(`📊 找到 ${files.length} 个文件`);
    
    let successCount = 0;
    let failCount = 0;
    
    // 迁移每个文件
    for (const file of files) {
      try {
        // 跳过文件夹
        if (file.id === null) continue;
        
        console.log(`  📄 迁移: ${file.name}`);
        
        // 从旧 bucket 下载
        const { data: fileData, error: downloadError } = await oldSupabase
          .storage
          .from(bucketName)
          .download(file.name);
        
        if (downloadError) {
          console.error(`    ❌ 下载失败: ${downloadError.message}`);
          failCount++;
          continue;
        }
        
        // 上传到新 bucket
        const { error: uploadError } = await newSupabase
          .storage
          .from(bucketName)
          .upload(file.name, fileData, {
            contentType: file.metadata?.mimetype || 'application/octet-stream',
            upsert: true
          });
        
        if (uploadError) {
          console.error(`    ❌ 上传失败: ${uploadError.message}`);
          failCount++;
          continue;
        }
        
        console.log(`    ✅ 成功`);
        successCount++;
        
      } catch (err) {
        console.error(`    ❌ 错误: ${err.message}`);
        failCount++;
      }
    }
    
    console.log(`✅ ${bucketName} 迁移完成！成功: ${successCount}, 失败: ${failCount}`);
    return { success: failCount === 0, count: successCount };
    
  } catch (err) {
    console.error(`❌ 迁移 ${bucketName} 时发生错误:`, err.message);
    return { success: false, count: 0 };
  }
}

// ============================================
// 主迁移流程
// ============================================

async function main() {
  console.log('🚀 开始 Supabase 数据迁移\n');
  console.log('⚠️  请确保：');
  console.log('   1. 已在新项目中执行了 supabase-setup.sql');
  console.log('   2. 已在新项目中执行了 supabase-rls-policies.sql');
  console.log('   3. 已在新项目中创建了 Storage buckets');
  console.log('   4. 已正确配置了本脚本中的新项目 URL 和 KEY\n');
  
  // 验证配置
  if (NEW_SUPABASE_URL === 'YOUR_NEW_SUPABASE_URL' || 
      NEW_SERVICE_ROLE_KEY === 'YOUR_NEW_SERVICE_ROLE_KEY') {
    console.error('❌ 错误：请先在脚本中配置新 Supabase 项目的 URL 和 KEY！');
    process.exit(1);
  }
  
  const results = {
    tables: {},
    storage: {}
  };
  
  // 迁移数据表（按依赖顺序）
  console.log('\n📋 第一步：迁移数据表\n');
  console.log('=' .repeat(50));
  
  // 定义表迁移配置
  const tableConfigs = [
    { name: 'admins', orderBy: 'created_at' },
    { name: 'categories', orderBy: 'created_at', options: { clearFirst: true, conflictColumn: 'slug' } },
    { name: 'tags', orderBy: 'created_at' },
    { name: 'articles', orderBy: 'created_at' },
    { name: 'inquiries', orderBy: 'created_at' },
    { name: 'media', orderBy: 'created_at' },
    { name: 'comments', orderBy: 'created_at' },
    { name: 'site_settings', orderBy: 'key', options: {} } // site_settings 用 key 排序
  ];
  
  for (const config of tableConfigs) {
    const result = await migrateTable(config.name, config.orderBy, config.options || {});
    results.tables[config.name] = result;
    
    // 添加延迟，避免请求过快
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // 迁移 Storage
  console.log('\n\n🗂️  第二步：迁移 Storage 文件\n');
  console.log('=' .repeat(50));
  
  const buckets = ['article-images', 'media-library', 'avatars'];
  
  for (const bucket of buckets) {
    const result = await migrateStorage(bucket);
    results.storage[bucket] = result;
    
    // 添加延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // 打印总结
  console.log('\n\n📊 迁移总结\n');
  console.log('=' .repeat(50));
  
  console.log('\n数据表迁移结果：');
  let totalRecords = 0;
  let failedTables = [];
  
  for (const [table, result] of Object.entries(results.tables)) {
    const status = result.success ? '✅' : '❌';
    console.log(`  ${status} ${table}: ${result.count} 条记录`);
    totalRecords += result.count;
    if (!result.success) failedTables.push(table);
  }
  
  console.log(`\n总计迁移记录数: ${totalRecords}`);
  
  console.log('\nStorage 迁移结果：');
  let totalFiles = 0;
  let failedBuckets = [];
  
  for (const [bucket, result] of Object.entries(results.storage)) {
    const status = result.success ? '✅' : '❌';
    console.log(`  ${status} ${bucket}: ${result.count} 个文件`);
    totalFiles += result.count;
    if (!result.success) failedBuckets.push(bucket);
  }
  
  console.log(`\n总计迁移文件数: ${totalFiles}`);
  
  // 最终状态
  console.log('\n' + '=' .repeat(50));
  
  if (failedTables.length === 0 && failedBuckets.length === 0) {
    console.log('\n🎉 迁移完成！所有数据和文件已成功迁移。');
    console.log('\n下一步：');
    console.log('  1. 更新 .env.local 文件中的 Supabase 配置');
    console.log('  2. 重启开发服务器测试');
    console.log('  3. 验证所有功能正常工作');
    console.log('  4. 更新生产环境的环境变量');
  } else {
    console.log('\n⚠️  迁移完成，但有部分失败：');
    if (failedTables.length > 0) {
      console.log(`  失败的表: ${failedTables.join(', ')}`);
    }
    if (failedBuckets.length > 0) {
      console.log(`  失败的 buckets: ${failedBuckets.join(', ')}`);
    }
    console.log('\n请检查错误信息并手动处理失败的项目。');
  }
  
  console.log('\n');
}

// 运行迁移
main().catch(err => {
  console.error('\n❌ 迁移过程中发生严重错误:', err);
  process.exit(1);
});
