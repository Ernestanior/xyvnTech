// Next.js 中间件 - 路由保护
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 检查是否是管理后台路径
  if (pathname.startsWith('/admin')) {
    // 检查会话 cookie
    const sessionCookie = request.cookies.get('admin_session');

    // 登录页面特殊处理
    if (pathname === '/admin/login') {
      // 如果已经登录，重定向到 dashboard
      if (sessionCookie) {
        try {
          const sessionData = JSON.parse(sessionCookie.value);
          if (sessionData.adminId && sessionData.email) {
            const redirectTo = request.nextUrl.searchParams.get('redirect') || '/admin/dashboard';
            return NextResponse.redirect(new URL(redirectTo, request.url));
          }
        } catch (error) {
          // 会话无效，删除 cookie 并继续显示登录页
          const response = NextResponse.next();
          response.cookies.delete('admin_session');
          return response;
        }
      }
      return NextResponse.next();
    }

    if (!sessionCookie) {
      // 未登录，重定向到登录页
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // 验证会话数据
      const sessionData = JSON.parse(sessionCookie.value);
      
      if (!sessionData.adminId || !sessionData.email) {
        throw new Error('Invalid session');
      }

      // 会话有效，继续
      return NextResponse.next();
    } catch (error) {
      // 会话无效，重定向到登录页
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
