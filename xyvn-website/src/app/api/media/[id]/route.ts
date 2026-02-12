// 媒体库 API - 删除
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { createServiceClient } from '@/lib/supabase/server';

// 删除媒体
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();
    const supabase = createServiceClient();

    // 获取媒体信息
    const { data: media, error: fetchError } = await supabase
      .from('media')
      .select('file_path')
      .eq('id', params.id)
      .single();

    if (fetchError) throw fetchError;

    // 从 Storage 删除文件
    if (media?.file_path) {
      const { error: storageError } = await supabase.storage
        .from('article-images')
        .remove([media.file_path]);

      if (storageError) {
        console.error('Storage delete error:', storageError);
      }
    }

    // 从数据库删除记录
    const { error: deleteError } = await supabase
      .from('media')
      .delete()
      .eq('id', params.id);

    if (deleteError) throw deleteError;

    return NextResponse.json({
      success: true,
      message: '媒体删除成功',
    });
  } catch (error: any) {
    console.error('Delete media error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '删除媒体失败' },
      { status: 500 }
    );
  }
}
