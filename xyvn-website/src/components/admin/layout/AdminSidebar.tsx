// 管理后台侧边栏
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Image,
  FolderTree,
  Tags,
  BarChart3,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: number;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems: NavItem[] = [
    { name: '仪表盘', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: '文章管理', href: '/admin/articles', icon: FileText },
    { name: '咨询管理', href: '/admin/inquiries', icon: MessageSquare },
    { name: '媒体库', href: '/admin/media', icon: Image },
    { name: '分类管理', href: '/admin/categories', icon: FolderTree },
    { name: '标签管理', href: '/admin/tags', icon: Tags },
    { name: '数据统计', href: '/admin/analytics', icon: BarChart3 },
  ];

  const bottomNavItems: NavItem[] = [
    { name: '管理员', href: '/admin/admins', icon: Users },
    { name: '系统设置', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-xl font-bold text-white">X</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">XYVN</h1>
            <p className="text-xs text-gray-400">管理后台</p>
          </div>
        </Link>
      </div>

      {/* 主导航 */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 底部导航 */}
      <div className="p-4 border-t border-gray-800 space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}

        {/* 登出按钮 */}
        <motion.button
          onClick={logout}
          whileHover={{ x: 4 }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">登出</span>
        </motion.button>
      </div>

      {/* 用户信息 */}
      {user && (
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.username}</p>
              <p className="text-xs text-gray-400 truncate">{user.role === 'admin' ? '管理员' : '编辑'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
