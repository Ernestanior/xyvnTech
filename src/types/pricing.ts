// 定价模式
export type PricingMode = 'one-time' | 'subscription';

// 计费周期
export type BillingCycle = 'monthly' | 'annual';

// 服务类型
export type ServiceCategory = 
  | 'corporate-website'
  | 'ecommerce'
  | 'landing-page'
  | 'admin-system'
  | 'cross-platform-app'
  | 'miniprogram';

// 套餐层级
export type PackageTier = 'starter' | 'growth' | 'business' | 'enterprise';

// 功能项
export interface Feature {
  id: string;
  name: string;
  description?: string;
  included: boolean | 'limited' | 'unlimited' | number | string;
  icon?: string;
  tooltip?: string;
}

// 增值服务
export interface Addon {
  id: string;
  name: string;
  price: number;
  billingType: 'one-time' | 'monthly' | 'per-unit';
  description: string;
  unit?: string;
}

// 限制配置
export interface PackageLimits {
  users?: number;
  storage?: string;
  bandwidth?: string;
  transactions?: number;
  apiCalls?: number;
  pages?: number;
  products?: number;
  orders?: number;
}

// 订阅套餐
export interface SubscriptionPackage {
  id: string;
  name: string;
  category: ServiceCategory;
  tier: PackageTier;
  description: string;
  
  // 定价
  pricing: {
    setupFee: number;
    monthly: number;
    annual: number;
    annualDiscount: number; // 百分比
    transactionFee?: number; // 交易费百分比（电商）
  };
  
  // 限制
  limits?: PackageLimits;
  
  // 功能列表
  features: Feature[];
  
  // 增值服务
  addons?: Addon[];
  
  // 标签
  tags?: ('popular' | 'best-value' | 'new' | 'recommended')[];
  
  // 目标客户
  targetAudience?: string;
  
  // 支持级别
  supportLevel: 'email' | 'email-phone' | 'priority' | 'dedicated';
  
  // 响应时间
  responseTime: string;
}

// 维护选项
export interface MaintenanceOption {
  id: string;
  name: string;
  monthlyFee: number;
  includes: string[];
  responseTime: string;
}

// 买断套餐
export interface OneTimePackage {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
  priceRange: {
    min: number;
    max: number;
  };
  features: Feature[];
  maintenanceOptions?: MaintenanceOption[];
  deliveryTime: string;
  tags?: ('popular' | 'best-value' | 'premium')[];
}

// 成本分解
export interface CostBreakdown {
  setupFee: number;
  recurringCost: number;
  totalCost: number;
  savings?: number;
  savingsPercentage?: number;
}

// 对比结果
export interface PricingComparison {
  oneTime: {
    initial: number;
    maintenance: number;
    hosting: number;
    total: number;
  };
  subscription: CostBreakdown;
  savings: number;
  savingsPercentage: number;
  breakEvenMonths: number;
}
