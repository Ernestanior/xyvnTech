// 标签管理 API - 更新和删除
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { createServiceClient } from '@/lib/supabase/server';
import { generateSlug } from '@/lib/utils/slug';

// 更新标签
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

    const { data, error } = await supabase
      .from('tags')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: '标签更新成功',
    });
  } catch (error: any) {
    console.error('Update tag error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '更新标签失败' },
      { status: 500 }
    );
  }
}

// 删除标签
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();
    const supabase = createServiceClient();

    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: '标签删除成功',
    });
  } catch (error: any) {
    console.error('Delete tag error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '删除标签失败' },
      { status: 500 }
    );
  }
}
