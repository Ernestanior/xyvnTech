// 数据验证 Schema
import { z } from 'zod';

// 文章验证
export const articleSchema = z.object({
  title: z.string().min(1, '标题不能为空').max(255, '标题过长'),
  slug: z.string().min(1, 'URL Slug 不能为空').max(255, 'URL Slug 过长'),
  excerpt: z.string().max(500, '摘要过长').optional().nullable(),
  content: z.string().min(1, '内容不能为空'),
  cover_image: z.string().url('封面图片 URL 无效').optional().nullable(),
  category_id: z.string().uuid('分类 ID 无效').nullable().optional()
    .transform(val => val === '' ? null : val),
  tags: z.array(z.string()).optional().nullable().default([]),
  status: z.enum(['draft', 'published', 'scheduled']),
  published_at: z.string().datetime().optional().nullable(),
  scheduled_at: z.string().datetime().optional().nullable(),
  meta_title: z.string().max(255, 'Meta 标题过长').optional().nullable(),
  meta_description: z.string().max(500, 'Meta 描述过长').optional().nullable(),
  meta_keywords: z.array(z.string()).optional().nullable().default([]),
});

export type ArticleFormData = z.infer<typeof articleSchema>;

// 咨询验证
export const inquirySchema = z.object({
  name: z.string().min(1, '姓名不能为空').max(100, '姓名过长'),
  email: z.string().email('邮箱格式无效').max(255, '邮箱过长'),
  phone: z.string().max(50, '电话过长').optional().nullable(),
  company: z.string().max(255, '公司名称过长').optional().nullable(),
  service_type: z.string().max(100, '服务类型过长').optional().nullable(),
  budget: z.string().max(50, '预算过长').optional().nullable(),
  message: z.string().min(1, '留言不能为空'),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

// 分类验证
export const categorySchema = z.object({
  name: z.string().min(1, '分类名称不能为空').max(100, '分类名称过长'),
  slug: z.string().min(1, 'URL Slug 不能为空').max(100, 'URL Slug 过长'),
  description: z.string().max(500, '描述过长').optional().nullable(),
  icon: z.string().max(50, '图标过长').optional().nullable(),
  order_index: z.number().int().min(0).default(0),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

// 标签验证
export const tagSchema = z.object({
  name: z.string().min(1, '标签名称不能为空').max(50, '标签名称过长'),
  slug: z.string().min(1, 'URL Slug 不能为空').max(50, 'URL Slug 过长'),
});

export type TagFormData = z.infer<typeof tagSchema>;

// 管理员验证
export const adminSchema = z.object({
  username: z.string().min(3, '用户名至少 3 个字符').max(50, '用户名过长'),
  email: z.string().email('邮箱格式无效').max(255, '邮箱过长'),
  password: z.string().min(6, '密码至少 6 个字符').optional(),
  role: z.enum(['admin', 'editor']),
  avatar_url: z.string().url('头像 URL 无效').optional().nullable(),
});

export type AdminFormData = z.infer<typeof adminSchema>;

// 登录验证
export const loginSchema = z.object({
  email: z.string().email('邮箱格式无效'),
  password: z.string().min(1, '密码不能为空'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// 评论验证
export const commentSchema = z.object({
  article_id: z.string().uuid('文章 ID 无效'),
  author_name: z.string().min(1, '姓名不能为空').max(100, '姓名过长'),
  author_email: z.string().email('邮箱格式无效').max(255, '邮箱过长'),
  content: z.string().min(1, '评论内容不能为空').max(1000, '评论内容过长'),
  parent_id: z.string().uuid('父评论 ID 无效').optional().nullable(),
});

export type CommentFormData = z.infer<typeof commentSchema>;
