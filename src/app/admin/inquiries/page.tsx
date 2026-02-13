// 咨询管理列表页
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Mail,
  Phone,
  Building2,
  Calendar,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import AdminHeader from '@/components/admin/layout/AdminHeader';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_type: string | null;
  budget: string | null;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'closed';
  notes: string | null;
  created_at: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, [pagination.page, statusFilter]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        status: statusFilter,
      });

      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`/api/inquiries?${params}`);
      const data = await response.json();

      if (data.success) {
        setInquiries(data.data.inquiries);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination({ ...pagination, page: 1 });
    fetchInquiries();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这条咨询吗？')) return;

    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchInquiries();
      } else {
        alert(data.error || '删除失败');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('删除失败');
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        fetchInquiries();
      } else {
        alert(data.error || '更新失败');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('更新失败');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      unread: { text: '未读', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
      read: { text: '已读', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      replied: { text: '已回复', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      closed: { text: '已关闭', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
    };

    const badge = badges[status as keyof typeof badges] || badges.unread;

    return (
      <span className={`px-2 py-1 rounded-full text-xs border ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  return (
    <div>
      <AdminHeader
        title="咨询管理"
        subtitle="管理客户咨询和反馈信息"
      />

      <div className="p-6">
        {/* 搜索和筛选 */}
        <div className="bg-white/5 border border-gray-800 rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索姓名、邮箱或公司..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* 状态筛选 */}
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">全部状态</option>
                <option value="unread">未读</option>
                <option value="read">已读</option>
                <option value="replied">已回复</option>
                <option value="closed">已关闭</option>
              </select>

              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                搜索
              </button>
            </div>
          </div>
        </div>

        {/* 咨询列表 */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white/5 border border-gray-800 rounded-xl p-12 text-center">
            <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">暂无咨询信息</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {inquiries.map((inquiry, index) => (
                <motion.div
                  key={inquiry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white/5 border border-gray-800 rounded-xl p-6 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{inquiry.name}</h3>
                        {getStatusBadge(inquiry.status)}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {inquiry.email}
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {inquiry.phone}
                          </div>
                        )}
                        {inquiry.company && (
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {inquiry.company}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(inquiry.created_at).toLocaleString('zh-CN')}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-300 line-clamp-2">{inquiry.message}</p>
                  </div>

                  {inquiry.service_type && (
                    <div className="mb-4">
                      <span className="text-xs text-gray-500">服务类型：</span>
                      <span className="text-sm text-gray-300 ml-2">{inquiry.service_type}</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedInquiry(inquiry)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      查看详情
                    </button>

                    {inquiry.status === 'unread' && (
                      <button
                        onClick={() => handleStatusChange(inquiry.id, 'read')}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        标记已读
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(inquiry.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      删除
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 分页 */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 bg-white/5 border border-gray-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  上一页
                </button>
                <span className="px-4 py-2 text-gray-400">
                  第 {pagination.page} / {pagination.totalPages} 页
                </span>
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
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
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">咨询详情</h2>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">姓名</label>
                <p className="text-white">{selectedInquiry.name}</p>
              </div>

              <div>
                <label className="text-sm text-gray-400">邮箱</label>
                <p className="text-white">{selectedInquiry.email}</p>
              </div>

              {selectedInquiry.phone && (
                <div>
                  <label className="text-sm text-gray-400">电话</label>
                  <p className="text-white">{selectedInquiry.phone}</p>
                </div>
              )}

              {selectedInquiry.company && (
                <div>
                  <label className="text-sm text-gray-400">公司</label>
                  <p className="text-white">{selectedInquiry.company}</p>
                </div>
              )}

              {selectedInquiry.service_type && (
                <div>
                  <label className="text-sm text-gray-400">服务类型</label>
                  <p className="text-white">{selectedInquiry.service_type}</p>
                </div>
              )}

              {selectedInquiry.budget && (
                <div>
                  <label className="text-sm text-gray-400">预算</label>
                  <p className="text-white">{selectedInquiry.budget}</p>
                </div>
              )}

              <div>
                <label className="text-sm text-gray-400">咨询内容</label>
                <p className="text-white whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>

              <div>
                <label className="text-sm text-gray-400">状态</label>
                <div className="mt-2">
                  {getStatusBadge(selectedInquiry.status)}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">提交时间</label>
                <p className="text-white">
                  {new Date(selectedInquiry.created_at).toLocaleString('zh-CN')}
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => {
                    handleStatusChange(selectedInquiry.id, 'replied');
                    setSelectedInquiry(null);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  标记为已回复
                </button>
                <button
                  onClick={() => {
                    handleStatusChange(selectedInquiry.id, 'closed');
                    setSelectedInquiry(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  关闭咨询
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
