// 文章列表和创建 API
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { articleSchema } from '@/lib/utils/validation';
import { Article } from '@/types/database';

// GET /api/articles - 获取文章列表
export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const categoryId = searchParams.get('categoryId') || '';
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const supabase = createClient();
    
    // 构建查询
    let query = supabase
      .from('articles')
      .select(`
        *,
        category:categories(id, name, slug),
        author:admins(id, username, email)
      `, { count: 'exact' });

    // 搜索
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    // 状态筛选
    if (status) {
      query = query.eq('status', status);
    }

    // 分类筛选
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    // 排序
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // 分页
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data: articles, error, count } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: articles,
      pagination: {
        page,
        pageSize,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
      },
    });
  } catch (error: any) {
    console.error('Get articles error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '获取文章列表失败' },
      { status: 500 }
    );
  }
}

// POST /api/articles - 创建文章
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await request.json();

    console.log('📝 创建文章 - Session:', session);
    console.log('📝 创建文章 - Body:', body);

    // 验证数据
    const validatedData = articleSchema.parse(body);

    console.log('✅ 数据验证通过:', validatedData);

    // 使用 service role client 绕过 RLS
    const supabase = createServiceClient();

    // 准备插入的数据
    const insertData = {
      ...validatedData,
      author_id: session.adminId,
    };

    console.log('📤 准备插入数据:', insertData);

    // 创建文章
    const { data: article, error } = await supabase
      .from('articles')
      .insert(insertData)
      .select(`
        *,
        category:categories(id, name, slug),
        author:admins(id, username, email)
      `)
      .single();

    if (error) {
      console.error('❌ 插入失败:', error);
      throw error;
    }

    console.log('✅ 文章创建成功:', article);

    return NextResponse.json({
      success: true,
      data: article,
      message: '文章创建成功',
    });
  } catch (error: any) {
    console.error('Create article error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '创建文章失败' },
      { status: 500 }
    );
  }
}
