import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/session';

// GET - 获取所有设置
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient();
    const { data: settings, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('key', { ascending: true });

    if (error) throw error;

    // 转换为对象格式
    const settingsObj: Record<string, string> = {};
    settings?.forEach((setting) => {
      settingsObj[setting.key] = setting.value;
    });

    return NextResponse.json({ settings: settingsObj });
  } catch (error) {
    console.error('Get settings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT - 批量更新设置
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 只有 admin 角色可以修改设置
    if (session.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json(
        { error: 'Invalid settings data' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // 批量更新设置
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value: String(value),
      updated_at: new Date().toISOString(),
    }));

    // 使用 upsert 来插入或更新
    const { error } = await supabase
      .from('site_settings')
      .upsert(updates, { onConflict: 'key' });

    if (error) throw error;

    return NextResponse.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

// POST - 创建或更新单个设置
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 只有 admin 角色可以修改设置
    if (session.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { key, value } = body;

    if (!key) {
      return NextResponse.json(
        { error: 'Key is required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    const { data, error } = await supabase
      .from('site_settings')
      .upsert(
        {
          key,
          value: String(value || ''),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key' }
      )
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ setting: data });
  } catch (error) {
    console.error('Create/update setting error:', error);
    return NextResponse.json(
      { error: 'Failed to save setting' },
      { status: 500 }
    );
  }
}
