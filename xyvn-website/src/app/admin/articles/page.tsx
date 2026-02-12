'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'scheduled';
  category?: { name: string };
  author?: { username: string };
  view_count: number;
  created_at: string;
  published_at: string | null;
}

export default function ArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchArticles();
  }, [page, status]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: '10',
        ...(search && { search }),
        ...(status && { status }),
      });

      const response = await fetch(`/api/articles?${params}`);
      const result = await response.json();

      if (result.success) {
        setArticles(result.data);
        setTotalPages(result.pagination.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？')) return;

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        fetchArticles();
      }
    } catch (error) {
      console.error('Failed to delete article:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-800 text-gray-300 border border-gray-700',
      published: 'bg-green-900 text-green-300 border border-green-700',
      scheduled: 'bg-blue-900 text-blue-300 border border-blue-700',
    };
    const labels = {
      draft: '草稿',
      published: '已发布',
      scheduled: '定时发布',
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">文章管理</h1>
        <Link
          href="/admin/articles/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          新建文章
        </Link>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-4 mb-6">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            placeholder="搜索文章标题或内容..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部状态</option>
            <option value="draft">草稿</option>
            <option value="published">已发布</option>
            <option value="scheduled">定时发布</option>
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            搜索
          </button>
        </form>
      </div>

      {/* 文章列表 */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">加载中...</div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-gray-400">暂无文章</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">标题</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">分类</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">作者</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">浏览量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">创建时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{article.title}</div>
                    <div className="text-sm text-gray-400">{article.slug}</div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(article.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {article.category?.name || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {article.author?.username || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{article.view_count}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(article.created_at).toLocaleDateString('zh-CN')}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        编辑
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-800 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              第 {page} 页，共 {totalPages} 页
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                上一页
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
