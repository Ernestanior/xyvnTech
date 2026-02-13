// 咨询管理 API - 详情、更新、删除
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { createServiceClient } from '@/lib/supabase/server';

// 获取咨询详情
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error('Get inquiry error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '获取咨询详情失败' },
      { status: 500 }
    );
  }
}

// 更新咨询
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();
    const body = await request.json();
    const supabase = createServiceClient();

    const updateData: any = {};
    
    if (body.status) updateData.status = body.status;
    if (body.notes !== undefined) updateData.notes = body.notes;

    const { data, error } = await supabase
      .from('inquiries')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: '咨询更新成功',
    });
  } catch (error: any) {
    console.error('Update inquiry error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '更新咨询失败' },
      { status: 500 }
    );
  }
}

// 删除咨询
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();
    const supabase = createServiceClient();

    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: '咨询删除成功',
    });
  } catch (error: any) {
    console.error('Delete inquiry error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '删除咨询失败' },
      { status: 500 }
    );
  }
}
