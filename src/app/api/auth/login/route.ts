// 登录 API
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { verifyPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';
import { loginSchema } from '@/lib/utils/validation';
import { Admin } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证输入
    const validatedData = loginSchema.parse(body);
    
    // 查询管理员（使用 service role key 绕过 RLS）
    const supabase = createServiceClient();
    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', validatedData.email)
      .eq('is_active', true)
      .single<Admin>();

    if (error || !admin) {
      return NextResponse.json(
        { success: false, error: '邮箱或密码错误' },
        { status: 401 }
      );
    }

    // 验证密码
    const isValidPassword = await verifyPassword(
      validatedData.password,
      admin.password_hash
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: '邮箱或密码错误' },
        { status: 401 }
      );
    }

    // 更新最后登录时间
    await supabase
      .from('admins')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', admin.id);

    // 创建会话
    await createSession(admin);

    return NextResponse.json({
      success: true,
      data: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        avatar_url: admin.avatar_url,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '登录失败' },
      { status: 500 }
    );
  }
}
