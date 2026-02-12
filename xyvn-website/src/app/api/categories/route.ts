// 分类管理 API - 列表和创建
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { createServiceClient } from '@/lib/supabase/server';
import { generateSlug } from '@/lib/utils/slug';

// 获取分类列表
export async function GET(request: NextRequest) {
  try {
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (error: any) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '获取分类列表失败' },
      { status: 500 }
    );
  }
}

// 创建分类
export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const supabase = createServiceClient();

    const slug = body.slug || generateSlug(body.name);

    const { data, error } = await supabase
      .from('categories')
      .insert([
        {
          name: body.name,
          slug,
          description: body.description || null,
          icon: body.icon || null,
          order_index: body.order_index || 0,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: '分类创建成功',
    });
  } catch (error: any) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '创建分类失败' },
      { status: 500 }
    );
  }
}
