// 媒体库管理页面
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Image as ImageIcon,
  Trash2,
  Copy,
  X,
  Download,
  Calendar,
  FileImage,
  Grid3x3,
  List,
} from 'lucide-react';
import AdminHeader from '@/components/admin/layout/AdminHeader';

interface Media {
  id: string;
  filename: string;
  original_name: string;
  file_path: string;
  file_url: string;
  file_size: number;
  mime_type: string;
  width: number | null;
  height: number | null;
  created_at: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    fetchMedia();
  }, [pagination.page]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`/api/media?${params}`);
      const data = await response.json();

      if (data.success) {
        setMedia(data.data.media);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination({ ...pagination, page: 1 });
    fetchMedia();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个媒体文件吗？删除后无法恢复。')) return;

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchMedia();
        setSelectedMedia(null);
      } else {
        alert(data.error || '删除失败');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('删除失败');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('URL 已复制到剪贴板');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div>
      <AdminHeader
        title="媒体库"
        subtitle="管理所有上传的图片和文件"
      />

      <div className="p-6">
        {/* 工具栏 */}
        <div className="bg-white/5 border border-gray-800 rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* 搜索框 */}
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索文件名..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* 视图切换 */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              搜索
            </button>
          </div>

          {/* 统计信息 */}
          <div className="mt-4 flex gap-4 text-sm text-gray-400">
            <span>共 {pagination.total} 个文件</span>
            <span>•</span>
            <span>
              总大小:{' '}
              {formatFileSize(
                media.reduce((sum, m) => sum + (m.file_size || 0), 0)
              )}
            </span>
          </div>
        </div>

        {/* 媒体列表 */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : media.length === 0 ? (
          <div className="bg-white/5 border border-gray-800 rounded-xl p-12 text-center">
            <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">暂无媒体文件</p>
          </div>
        ) : (
          <>
            {/* 网格视图 */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {media.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    onClick={() => setSelectedMedia(item)}
                    className="bg-white/5 border border-gray-800 rounded-xl overflow-hidden hover:bg-white/10 hover:border-blue-500/50 transition-all cursor-pointer group"
                  >
                    <div className="aspect-square relative bg-gray-900">
                      <img
                        src={item.file_url}
                        alt={item.original_name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <FileImage className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-white truncate">
                        {item.original_name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatFileSize(item.file_size)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* 列表视图 */}
            {viewMode === 'list' && (
              <div className="space-y-2">
                {media.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    onClick={() => setSelectedMedia(item)}
                    className="bg-white/5 border border-gray-800 rounded-xl p-4 hover:bg-white/10 hover:border-blue-500/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.file_url}
                          alt={item.original_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">
                          {item.original_name}
                        </p>
                        <div className="flex gap-4 text-xs text-gray-500 mt-1">
                          <span>{formatFileSize(item.file_size)}</span>
                          {item.width && item.height && (
                            <span>
                              {item.width} × {item.height}
                            </span>
                          )}
                          <span>
                            {new Date(item.created_at).toLocaleDateString(
                              'zh-CN'
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* 分页 */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <button
                  onClick={() =>
                    setPagination({ ...pagination, page: pagination.page - 1 })
                  }
                  disabled={pagination.page === 1}
                  className="px-4 py-2 bg-white/5 border border-gray-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  上一页
                </button>
                <span className="px-4 py-2 text-gray-400">
                  第 {pagination.page} / {pagination.totalPages} 页
                </span>
                <button
                  onClick={() =>
                    setPagination({ ...pagination, page: pagination.page + 1 })
                  }
                  disabled={pagination.page === pagination.totalPages}
                  className="px-4 py-2 bg-white/5 border border-gray-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  下一页
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 详情弹窗 */}
      <AnimatePresence>
        {selectedMedia && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* 头部 */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white">媒体详情</h2>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* 图片预览 */}
              <div className="p-6">
                <div className="bg-gray-950 rounded-xl overflow-hidden mb-6">
                  <img
                    src={selectedMedia.file_url}
                    alt={selectedMedia.original_name}
                    className="w-full h-auto"
                  />
                </div>

                {/* 信息 */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">文件名</label>
                    <p className="text-white">{selectedMedia.original_name}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">文件大小</label>
                    <p className="text-white">
                      {formatFileSize(selectedMedia.file_size)}
                    </p>
                  </div>

                  {selectedMedia.width && selectedMedia.height && (
                    <div>
                      <label className="text-sm text-gray-400">尺寸</label>
                      <p className="text-white">
                        {selectedMedia.width} × {selectedMedia.height} 像素
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm text-gray-400">文件类型</label>
                    <p className="text-white">{selectedMedia.mime_type}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">上传时间</label>
                    <p className="text-white">
                      {new Date(selectedMedia.created_at).toLocaleString(
                        'zh-CN'
                      )}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      文件 URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={selectedMedia.file_url}
                        readOnly
                        className="flex-1 px-4 py-2 bg-white/5 border border-gray-700 rounded-lg text-white text-sm"
                      />
                      <button
                        onClick={() => copyToClipboard(selectedMedia.file_url)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        复制
                      </button>
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-2 mt-6">
                  <a
                    href={selectedMedia.file_url}
                    download
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    下载
                  </a>
                  <button
                    onClick={() => handleDelete(selectedMedia.id)}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    删除
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
