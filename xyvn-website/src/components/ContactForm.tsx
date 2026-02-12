'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import Button from './ui/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: 'website',
    budget: '',
    message: '',
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          service_type: formData.projectType,
          budget: formData.budget || null,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          projectType: 'website',
          budget: '',
          message: '',
        });
        
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 姓名 */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            姓名 *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="请输入您的姓名"
          />
        </div>

        {/* 邮箱 */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            邮箱 *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="your@email.com"
          />
        </div>

        {/* 公司 */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
            公司名称
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="您的公司名称"
          />
        </div>

        {/* 电话 */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            联系电话
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="+86 138 0000 0000"
          />
        </div>

        {/* 项目类型 */}
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
            项目类型 *
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="website">网站开发</option>
            <option value="app">APP 开发</option>
            <option value="both">网站 + APP</option>
            <option value="redesign">网站重构</option>
            <option value="maintenance">维护优化</option>
            <option value="other">其他</option>
          </select>
        </div>

        {/* 预算 */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
            预算范围
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">请选择预算范围</option>
            <option value="<50k">5万以下</option>
            <option value="50k-100k">5-10万</option>
            <option value="100k-200k">10-20万</option>
            <option value="200k+">20万以上</option>
          </select>
        </div>
      </div>

      {/* 项目描述 */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          项目描述 *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          placeholder="请描述您的项目需求、目标、时间要求等..."
        />
      </div>

      {/* 提交按钮 */}
      <div className="flex items-center gap-4">
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="flex-1 md:flex-none flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              <span>发送中...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>发送咨询</span>
            </>
          )}
        </Button>

        {/* 状态提示 */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-green-400"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm">发送成功！我们会尽快联系您</span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-red-400"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">发送失败，请稍后重试</span>
          </motion.div>
        )}
      </div>

      {/* 隐私提示 */}
      <p className="text-sm text-gray-500">
        提交表单即表示您同意我们的隐私政策。我们承诺保护您的个人信息安全。
      </p>
    </motion.form>
  );
}
