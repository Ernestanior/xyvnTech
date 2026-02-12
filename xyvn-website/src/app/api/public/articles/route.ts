// 公开的文章列表 API
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '12');
    const search = searchParams.get('search') || '';

    const supabase = createServiceClient();
    
    let query = supabase
      .from('articles')
      .select('id, title, slug, excerpt, cover_image, created_at, view_count', { count: 'exact' })
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data: articles, error, count } = await query;

    if (error) throw error;

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
    console.error('Get public articles error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '获取文章列表失败' },
      { status: 500 }
    );
  }
}
