// 管理后台布局
'use client';

export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/layout/AdminSidebar';
import { useAuth } from '@/lib/hooks/useAuth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 如果未登录且不在登录页，重定向到登录页
    if (!loading && !isAuthenticated && pathname !== '/admin/login') {
      router.push(`/admin/login?redirect=${pathname}`);
    }
  }, [isAuthenticated, loading, pathname, router]);

  // 登录页和初始化页不需要布局
  if (pathname === '/admin/login' || pathname === '/admin/init') {
    return <>{children}</>;
  }

  // 加载中显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  // 未登录不显示内容
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* 侧边栏 */}
      <AdminSidebar />

      {/* 主内容区 */}
      <div className="ml-64">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
