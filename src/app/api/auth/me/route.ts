// 获取当前用户信息 API
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { createServiceClient } from '@/lib/supabase/server';
import { Admin } from '@/types/database';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: '未登录' },
        { status: 401 }
      );
    }

    // 获取完整的管理员信息（使用 service role key）
    const supabase = createServiceClient();
    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, username, email, role, avatar_url, created_at, last_login_at')
      .eq('id', session.adminId)
      .eq('is_active', true)
      .single<Partial<Admin>>();

    if (error || !admin) {
      return NextResponse.json(
        { success: false, error: '用户不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: admin,
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, error: '获取用户信息失败' },
      { status: 500 }
    );
  }
}
