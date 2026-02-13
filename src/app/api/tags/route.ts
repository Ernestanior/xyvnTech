// 标签管理 API - 列表和创建
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { createServiceClient } from '@/lib/supabase/server';
import { generateSlug } from '@/lib/utils/slug';

// 获取标签列表
export async function GET(request: NextRequest) {
  try {
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('usage_count', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (error: any) {
    console.error('Get tags error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '获取标签列表失败' },
      { status: 500 }
    );
  }
}

// 创建标签
export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const supabase = createServiceClient();

    const slug = body.slug || generateSlug(body.name);

    const { data, error } = await supabase
      .from('tags')
      .insert([
        {
          name: body.name,
          slug,
          usage_count: 0,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: '标签创建成功',
    });
  } catch (error: any) {
    console.error('Create tag error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '创建标签失败' },
      { status: 500 }
    );
  }
}
