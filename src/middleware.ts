// Next.js 中间件 - i18n 和路由保护
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const i18nMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 管理后台路径不应用 i18n 中间件
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    // 保留原有的管理后台认证逻辑
    if (pathname.startsWith('/admin')) {
      const sessionCookie = request.cookies.get('admin_session');
      
      if (pathname === '/admin/login') {
        if (sessionCookie) {
          try {
            const sessionData = JSON.parse(sessionCookie.value);
            if (sessionData.adminId && sessionData.email) {
              const redirectTo = request.nextUrl.searchParams.get('redirect') || '/admin/dashboard';
              return NextResponse.redirect(new URL(redirectTo, request.url));
            }
          } catch (error) {
            const response = NextResponse.next();
            response.cookies.delete('admin_session');
            return response;
          }
        }
        return NextResponse.next();
      }

      if (!sessionCookie) {
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }

      try {
        const sessionData = JSON.parse(sessionCookie.value);
        if (!sessionData.adminId || !sessionData.email) {
          throw new Error('Invalid session');
        }
        return NextResponse.next();
      } catch (error) {
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('admin_session');
        return response;
      }
    }
    
    return NextResponse.next();
  }

  // 应用 i18n 中间件到前台路由
  const response = i18nMiddleware(request);
  
  // 设置语言 cookie（有效期 1 年）
  const locale = request.nextUrl.pathname.split('/')[1];
  if (routing.locales.includes(locale as any)) {
    response.cookies.set('NEXT_LOCALE', locale, {
      maxAge: 365 * 24 * 60 * 60, // 1 年
      path: '/',
    });
  }
  
  return response;
}

export const config = {
  matcher: [
    // 匹配所有路径，除了以下路径
    '/((?!_next|_vercel|.*\\..*).*)',
    // 包含 API 路由
    '/api/:path*',
  ],
};
