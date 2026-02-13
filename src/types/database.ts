// 数据库类型定义

export type AdminRole = 'admin' | 'editor';

export type ArticleStatus = 'draft' | 'published' | 'scheduled';

export type InquiryStatus = 'unread' | 'read' | 'replied' | 'closed';

export type CommentStatus = 'pending' | 'approved' | 'rejected';

export interface Admin {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  role: AdminRole;
  avatar_url: string | null;
  created_at: string;
  last_login_at: string | null;
  is_active: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  order_index: number;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  usage_count: number;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  images: string[] | null;
  category_id: string | null;
  tags: string[] | null;
  author_id: string | null;
  status: ArticleStatus;
  published_at: string | null;
  scheduled_at: string | null;
  view_count: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface ArticleWithRelations extends Article {
  category?: Category;
  author?: Admin;
  tag_objects?: Tag[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_type: string | null;
  budget: string | null;
  message: string;
  status: InquiryStatus;
  notes: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface InquiryWithAssignee extends Inquiry {
  assignee?: Admin;
}

export interface Media {
  id: string;
  filename: string;
  original_name: string;
  file_path: string;
  file_url: string;
  file_size: number | null;
  mime_type: string | null;
  width: number | null;
  height: number | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface ArticleView {
  id: string;
  article_id: string;
  ip_address: string | null;
  user_agent: string | null;
  viewed_at: string;
}

export interface Comment {
  id: string;
  article_id: string;
  author_name: string;
  author_email: string;
  content: string;
  status: CommentStatus;
  parent_id: string | null;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: string | null;
  updated_at: string;
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 分页类型
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 统计数据类型
export interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalInquiries: number;
  unreadInquiries: number;
  todayInquiries: number;
  totalViews: number;
  todayViews: number;
}

export interface ArticleStats {
  articleId: string;
  title: string;
  viewCount: number;
  viewsToday: number;
  viewsThisWeek: number;
  viewsThisMonth: number;
}
