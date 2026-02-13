// 管理后台统计数据 API
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { createServiceClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    const supabase = createServiceClient();

    // 获取文章统计
    const { count: totalArticles } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true });

    const { count: publishedArticles } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    const { count: draftArticles } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'draft');

    // 获取总浏览量
    const { data: viewData } = await supabase
      .from('articles')
      .select('view_count');
    
    const totalViews = viewData?.reduce((sum, article) => sum + (article.view_count || 0), 0) || 0;

    // 获取最近文章
    const { data: recentArticles } = await supabase
      .from('articles')
      .select('id, title, status, created_at, view_count')
      .order('created_at', { ascending: false })
      .limit(5);

    // 获取咨询统计
    const { count: totalInquiries } = await supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true });

    const { count: unreadInquiries } = await supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'unread');

    return NextResponse.json({
      success: true,
      data: {
        articles: {
          total: totalArticles || 0,
          published: publishedArticles || 0,
          draft: draftArticles || 0,
        },
        totalViews,
        recentArticles: recentArticles || [],
        inquiries: {
          total: totalInquiries || 0,
          unread: unreadInquiries || 0,
        },
      },
    });
  } catch (error: any) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '获取统计数据失败' },
      { status: 500 }
    );
  }
}
