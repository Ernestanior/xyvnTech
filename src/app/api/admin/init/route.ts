// 初始化管理员账号 API
// 注意：这个端点仅用于初始化，生产环境应该删除或保护
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { hashPassword } from '@/lib/auth/password';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    // 验证输入
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, error: '所有字段都是必填的' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: '密码至少需要6个字符' },
        { status: 400 }
      );
    }

    // 使用 service client（绕过 RLS）
    const supabase = createServiceClient();

    // 检查是否已存在管理员
    const { data: existingAdmin } = await supabase
      .from('admins')
      .select('id')
      .eq('email', email)
      .single();

    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: '该邮箱已被使用' },
        { status: 400 }
      );
    }

    // 加密密码
    const passwordHash = await hashPassword(password);

    // 创建管理员
    const { data: admin, error } = await supabase
      .from('admins')
      .insert({
        username,
        email,
        password_hash: passwordHash,
        role: 'admin',
        is_active: true,
      })
      .select('id, username, email, role')
      .single();

    if (error) {
      console.error('Create admin error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '管理员账号创建成功',
      data: admin,
    });
  } catch (error: any) {
    console.error('Init admin error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '创建管理员失败' },
      { status: 500 }
    );
  }
}
