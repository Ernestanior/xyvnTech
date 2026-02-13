// 图片上传 API
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { createServiceClient } from '@/lib/supabase/server';
import { uploadFile, BUCKETS, generateUniqueFileName } from '@/lib/supabase/storage';

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as string || BUCKETS.ARTICLE_IMAGES;

    if (!file) {
      return NextResponse.json(
        { success: false, error: '请选择文件' },
        { status: 400 }
      );
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: '只支持图片文件（JPG, PNG, GIF, WebP）' },
        { status: 400 }
      );
    }

    // 验证文件大小（最大 5MB）
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: '文件大小不能超过 5MB' },
        { status: 400 }
      );
    }

    // 生成唯一文件名
    const fileName = generateUniqueFileName(file.name);
    const filePath = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${fileName}`;

    // 上传到 Supabase Storage
    const supabase = createServiceClient();
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
    }

    // 获取公开 URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    // 保存到媒体库
    const { data: media, error: mediaError } = await supabase
      .from('media')
      .insert({
        filename: fileName,
        original_name: file.name,
        file_path: data.path,
        file_url: publicUrl,
        file_size: file.size,
        mime_type: file.type,
        uploaded_by: session.adminId,
      })
      .select()
      .single();

    if (mediaError) {
      console.error('Save media error:', mediaError);
    }

    return NextResponse.json({
      success: true,
      data: {
        url: publicUrl,
        path: data.path,
        filename: fileName,
        size: file.size,
        type: file.type,
        media: media,
      },
      message: '上传成功',
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '上传失败' },
      { status: 500 }
    );
  }
}
