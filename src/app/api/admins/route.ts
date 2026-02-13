import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/session';
import { hashPassword } from '@/lib/auth/password';

// GET - 获取所有管理员
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 只有 admin 角色可以查看管理员列表
    if (session.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const supabase = createClient();
    const { data: admins, error } = await supabase
      .from('admins')
      .select('id, username, email, role, avatar_url, created_at, last_login_at, is_active')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ admins });
  } catch (error) {
    console.error('Get admins error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admins' },
      { status: 500 }
    );
  }
}

// POST - 创建新管理员
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 只有 admin 角色可以创建管理员
    if (session.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { username, email, password, role = 'editor' } = body;

    // 验证必填字段
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email and password are required' },
        { status: 400 }
      );
    }

    // 验证角色
    if (!['admin', 'editor'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // 检查用户名是否已存在
    const { data: existingUser } = await supabase
      .from('admins')
      .select('id')
      .eq('username', username)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      );
    }

    // 检查邮箱是否已存在
    const { data: existingEmail } = await supabase
      .from('admins')
      .select('id')
      .eq('email', email)
      .single();

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already exists' },
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
        role,
        is_active: true,
      })
      .select('id, username, email, role, avatar_url, created_at, is_active')
      .single();

    if (error) throw error;

    return NextResponse.json({ admin }, { status: 201 });
  } catch (error) {
    console.error('Create admin error:', error);
    return NextResponse.json(
      { error: 'Failed to create admin' },
      { status: 500 }
    );
  }
}
