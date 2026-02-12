// 仪表盘统计数据 API
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    await requireAuth();

    const supabase = createClient();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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

    // 获取咨询统计
    const { count: totalInquiries } = await supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true });

    const { count: unreadInquiries } = await supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'unread');

    const { count: todayInquiries } = await supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString());

    // 获取浏览量统计
    const { data: viewsData } = await supabase
      .from('articles')
      .select('view_count');

    const totalViews = viewsData?.reduce((sum, article) => sum + (article.view_count || 0), 0) || 0;

    const { count: todayViews } = await supabase
      .from('article_views')
      .select('*', { count: 'exact', head: true })
      .gte('viewed_at', today.toISOString());

    return NextResponse.json({
      success: true,
      data: {
        totalArticles: totalArticles || 0,
        publishedArticles: publishedArticles || 0,
        draftArticles: draftArticles || 0,
        totalInquiries: totalInquiries || 0,
        unreadInquiries: unreadInquiries || 0,
        todayInquiries: todayInquiries || 0,
        totalViews,
        todayViews: todayViews || 0,
      },
    });
  } catch (error: any) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '获取统计数据失败' },
      { status: 500 }
    );
  }
}
