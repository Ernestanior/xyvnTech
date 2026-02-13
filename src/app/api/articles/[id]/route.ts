// 文章详情、更新和删除 API
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { articleSchema } from '@/lib/utils/validation';

// GET /api/articles/[id] - 获取文章详情
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();

    const supabase = createClient();
    const { data: article, error } = await supabase
      .from('articles')
      .select(`
        *,
        category:categories(id, name, slug),
        author:admins(id, username, email)
      `)
      .eq('id', params.id)
      .single();

    if (error) {
      throw error;
    }

    if (!article) {
      return NextResponse.json(
        { success: false, error: '文章不存在' },
        { status: 404 }
      );
    }

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

// PUT /api/articles/[id] - 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();
    const body = await request.json();

    // 验证数据
    const validatedData = articleSchema.parse(body);

    // 使用 service role client 绕过 RLS
    const supabase = createServiceClient();

    // 更新文章
    const { data: article, error } = await supabase
      .from('articles')
      .update(validatedData)
      .eq('id', params.id)
      .select(`
        *,
        category:categories(id, name, slug),
        author:admins(id, username, email)
      `)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: article,
      message: '文章更新成功',
    });
  } catch (error: any) {
    console.error('Update article error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '更新文章失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/[id] - 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();

    // 使用 service role client 绕过 RLS
    const supabase = createServiceClient();

    // 删除文章
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', params.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: '文章删除成功',
    });
  } catch (error: any) {
    console.error('Delete article error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '删除文章失败' },
      { status: 500 }
    );
  }
}
