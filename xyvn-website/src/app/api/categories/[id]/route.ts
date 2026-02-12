// 分类管理 API - 更新和删除
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { createServiceClient } from '@/lib/supabase/server';
import { generateSlug } from '@/lib/utils/slug';

// 更新分类
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();
    const body = await request.json();
    const supabase = createServiceClient();

    const updateData: any = {};
    
    if (body.name) {
      updateData.name = body.name;
      if (!body.slug) {
        updateData.slug = generateSlug(body.name);
      }
    }
    if (body.slug) updateData.slug = body.slug;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.icon !== undefined) updateData.icon = body.icon;
    if (body.order_index !== undefined) updateData.order_index = body.order_index;

    const { data, error } = await supabase
      .from('categories')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: '分类更新成功',
    });
  } catch (error: any) {
    console.error('Update category error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '更新分类失败' },
      { status: 500 }
    );
  }
}

// 删除分类
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();
    const supabase = createServiceClient();

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: '分类删除成功',
    });
  } catch (error: any) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '删除分类失败' },
      { status: 500 }
    );
  }
}
