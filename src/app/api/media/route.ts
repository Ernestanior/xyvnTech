// 媒体库 API - 列表
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { createServiceClient } from '@/lib/supabase/server';

// 获取媒体列表
export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');

    const offset = (page - 1) * limit;

    let query = supabase
      .from('media')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (search) {
      query = query.or(`filename.ilike.%${search}%,original_name.ilike.%${search}%`);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: {
        media: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
        },
      },
    });
  } catch (error: any) {
    console.error('Get media error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '获取媒体列表失败' },
      { status: 500 }
    );
  }
}
