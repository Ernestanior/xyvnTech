// 管理后台头部
'use client';

import { Bell, Search, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
  action?: React.ReactNode;
}

export default function AdminHeader({ title, subtitle, onMenuClick, action }: AdminHeaderProps) {
  return (
    <header className="bg-white/5 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 左侧：标题 */}
          <div className="flex items-center gap-4">
            {/* 移动端菜单按钮 */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-400" />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
            </div>
          </div>

          {/* 右侧：操作按钮 */}
          <div className="flex items-center gap-3">
            {/* 自定义操作 */}
            {action && <div>{action}</div>}

            {/* 搜索按钮 */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors relative"
            >
              <Search className="w-5 h-5 text-gray-400" />
            </motion.button>

            {/* 通知按钮 */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              {/* 未读通知徽章 */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}
