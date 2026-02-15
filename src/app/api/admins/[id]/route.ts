import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/session';
import { hashPassword } from '@/lib/auth/password';

// GET - 获取单个管理员
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createServiceClient();
    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, username, email, role, avatar_url, created_at, last_login_at, is_active')
      .eq('id', params.id)
      .single();

    if (error) throw error;
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json({ admin });
  } catch (error) {
    console.error('Get admin error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin' },
      { status: 500 }
    );
  }
}

// PATCH - 更新管理员
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 只有 admin 角色可以更新管理员，或者用户更新自己的信息
    if (session.role !== 'admin' && session.adminId !== params.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { username, email, password, role, is_active } = body;

    const supabase = createServiceClient();

    // 构建更新数据
    const updateData: any = {};
    
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) {
      updateData.password_hash = await hashPassword(password);
    }
    
    // 只有 admin 可以修改角色和状态
    if (session.role === 'admin') {
      if (role && ['admin', 'editor'].includes(role)) {
        updateData.role = role;
      }
      if (typeof is_active === 'boolean') {
        updateData.is_active = is_active;
      }
    }

    // 检查是否有更新内容
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // 更新管理员
    const { data: admin, error } = await supabase
      .from('admins')
      .update(updateData)
      .eq('id', params.id)
      .select('id, username, email, role, avatar_url, created_at, last_login_at, is_active')
      .single();

    if (error) throw error;

    return NextResponse.json({ admin });
  } catch (error) {
    console.error('Update admin error:', error);
    return NextResponse.json(
      { error: 'Failed to update admin' },
      { status: 500 }
    );
  }
}

// DELETE - 删除管理员
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 只有 admin 角色可以删除管理员
    if (session.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 不能删除自己
    if (session.adminId === params.id) {
      return NextResponse.json(
        { error: 'Cannot delete yourself' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // 检查是否是最后一个 admin
    const { data: admins } = await supabase
      .from('admins')
      .select('id, role')
      .eq('role', 'admin')
      .eq('is_active', true);

    if (admins && admins.length === 1 && admins[0].id === params.id) {
      return NextResponse.json(
        { error: 'Cannot delete the last admin' },
        { status: 400 }
      );
    }

    // 删除管理员
    const { error } = await supabase
      .from('admins')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return NextResponse.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Delete admin error:', error);
    return NextResponse.json(
      { error: 'Failed to delete admin' },
      { status: 500 }
    );
  }
}
