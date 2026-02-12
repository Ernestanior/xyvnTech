// 咨询管理 API - 列表和创建
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { createServiceClient } from '@/lib/supabase/server';

// 获取咨询列表
export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const offset = (page - 1) * limit;

    let query = supabase
      .from('inquiries')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: {
        inquiries: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
        },
      },
    });
  } catch (error: any) {
    console.error('Get inquiries error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '获取咨询列表失败' },
      { status: 500 }
    );
  }
}

// 创建咨询（公开接口，用于前台表单提交）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone || null,
          company: body.company || null,
          service_type: body.service_type || null,
          budget: body.budget || null,
          message: body.message,
          status: 'unread',
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: '咨询提交成功',
    });
  } catch (error: any) {
    console.error('Create inquiry error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '提交咨询失败' },
      { status: 500 }
    );
  }
}
