// 公开的文章详情 API
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createServiceClient();
    
    const { data: article, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', params.slug)
      .eq('status', 'published')
      .single();

    if (error || !article) {
      return NextResponse.json(
        { success: false, error: '文章不存在' },
        { status: 404 }
      );
    }

    // 增加浏览量
    await supabase
      .from('articles')
      .update({ view_count: (article.view_count || 0) + 1 })
      .eq('id', article.id);

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error: any) {
    console.error('Get article error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '获取文章失败' },
      { status: 500 }
    );
  }
}
