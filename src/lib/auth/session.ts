// 会话管理
import { cookies } from 'next/headers';
import { Admin } from '@/types/database';

const SESSION_COOKIE_NAME = 'admin_session';

export interface SessionData {
  adminId: string;
  email: string;
  role: string;
}

export async function createSession(admin: Admin): Promise<void> {
  const sessionData: SessionData = {
    adminId: admin.id,
    email: admin.email,
    role: admin.role,
  };

  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function getSession(): Promise<SessionData | null> {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie) {
      return null;
    }

    return JSON.parse(sessionCookie.value) as SessionData;
  } catch (error) {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function requireAuth(): Promise<SessionData> {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
}

export async function requireAdmin(): Promise<SessionData> {
  const session = await requireAuth();
  
  if (session.role !== 'admin') {
    throw new Error('Forbidden: Admin access required');
  }

  return session;
}
