// 管理后台仪表盘
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  MessageSquare,
  Eye,
  TrendingUp,
  Clock,
} from 'lucide-react';
import AdminHeader from '@/components/admin/layout/AdminHeader';

interface Article {
  id: string;
  title: string;
  status: string;
  created_at: string;
  view_count: number;
}

interface DashboardStats {
  articles: {
    total: number;
    published: number;
    draft: number;
  };
  totalViews: number;
  recentArticles: Article[];
  inquiries: {
    total: number;
    unread: number;
  };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = stats ? [
    {
      title: '总文章数',
      value: stats.articles.total,
      icon: FileText,
      color: 'from-amber-500 to-orange-500',
      subtitle: `${stats.articles.published} 已发布`,
    },
    {
      title: '咨询消息',
      value: stats.inquiries.total,
      icon: MessageSquare,
      color: 'from-orange-500 to-red-500',
      subtitle: `${stats.inquiries.unread} 未读`,
      badge: stats.inquiries.unread > 0 ? stats.inquiries.unread : undefined,
    },
    {
      title: '总浏览量',
      value: stats.totalViews,
      icon: Eye,
      color: 'from-green-500 to-emerald-500',
      subtitle: '所有文章',
    },
    {
      title: '草稿文章',
      value: stats.articles.draft,
      icon: TrendingUp,
      color: 'from-cyan-500 to-teal-500',
      subtitle: '待发布',
    },
  ] : [];

  return (
    <div>
      <AdminHeader
        title="仪表盘"
        subtitle="欢迎回来，查看您的网站数据概览"
      />

      <div className="p-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white/5 border border-gray-800 rounded-xl p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-800 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-800 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-800 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* 统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white/5 border border-gray-800 rounded-xl p-6 hover:bg-white/10 transition-all relative overflow-hidden group"
                  >
                    {/* 背景渐变 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        {card.badge && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {card.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-gray-400 text-sm mb-2">{card.title}</h3>
                      <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
                      <p className="text-xs text-gray-500">{card.subtitle}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* 快速操作 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* 最近文章 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-white/5 border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">最近文章</h2>
                  <a href="/admin/articles" className="text-sm text-amber-400 hover:text-amber-300">
                    查看全部 →
                  </a>
                </div>
                <div className="space-y-3">
                  {stats?.recentArticles && stats.recentArticles.length > 0 ? (
                    stats.recentArticles.map((article) => (
                      <a
                        key={article.id}
                        href={`/admin/articles/${article.id}/edit`}
                        className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                      >
                        <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{article.title}</p>
                          <p className="text-xs text-gray-500">
                            {article.status === 'published' ? '已发布' : '草稿'} · {article.view_count} 浏览
                          </p>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">暂无文章</p>
                        <p className="text-xs text-gray-500">创建您的第一篇文章</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* 最近咨询 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="bg-white/5 border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">最近咨询</h2>
                  <a href="/admin/inquiries" className="text-sm text-amber-400 hover:text-amber-300">
                    查看全部 →
                  </a>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <MessageSquare className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">
                        {(stats?.inquiries?.unread ?? 0) > 0 
                          ? `您有 ${stats?.inquiries?.unread ?? 0} 条未读咨询` 
                          : '暂无新咨询'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(stats?.inquiries?.total ?? 0) > 0 
                          ? `共 ${stats?.inquiries?.total ?? 0} 条咨询` 
                          : '等待客户咨询'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 快捷操作按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="bg-white/5 border border-gray-800 rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-4">快捷操作</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a
                  href="/admin/articles/new"
                  className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all group"
                >
                  <FileText className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-gray-300">新建文章</span>
                </a>
                <a
                  href="/admin/articles"
                  className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all group"
                >
                  <Eye className="w-8 h-8 text-orange-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-gray-300">文章管理</span>
                </a>
                <a
                  href="/blog"
                  className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all group"
                >
                  <TrendingUp className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-gray-300">查看博客</span>
                </a>
                <a
                  href="/admin/inquiries"
                  className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all group"
                >
                  <MessageSquare className="w-8 h-8 text-orange-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-gray-300">咨询管理</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
