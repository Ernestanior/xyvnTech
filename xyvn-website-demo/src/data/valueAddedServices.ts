// 增值服务定价（基准：新台币 TWD）
export interface ValueAddedService {
  id: string;
  name: string;
  category: string;
  price: number | { min: number; max: number };
  unit: string; // 计价单位
  description: string;
  applicableTo: string[]; // 适用的产品类型
  popular?: boolean; // 是否热门
}

export const valueAddedServices: ValueAddedService[] = [
  // ========== 维护服务 ==========
  {
    id: 'maintenance-basic',
    name: '基础维护（3个月）',
    category: '维护服务',
    price: 0,
    unit: '包含',
    description: 'Bug修复、小幅调整、技术支持',
    applicableTo: ['all'],
  },
  {
    id: 'maintenance-annual',
    name: '年度维护套餐',
    category: '维护服务',
    price: { min: 15000, max: 50000 },
    unit: '年',
    description: '全年技术支持、定期更新、优先响应',
    applicableTo: ['all'],
    popular: true,
  },
  {
    id: 'maintenance-monthly',
    name: '月度维护订阅',
    category: '维护服务',
    price: { min: 2000, max: 8000 },
    unit: '月',
    description: '按月付费、随时取消、灵活调整',
    applicableTo: ['all'],
  },
  {
    id: 'emergency-support',
    name: '紧急技术支持',
    category: '维护服务',
    price: 1500,
    unit: '小时',
    description: '24小时内响应、优先处理',
    applicableTo: ['all'],
  },

  // ========== 运维服务 ==========
  {
    id: 'server-deploy',
    name: '服务器部署',
    category: '运维服务',
    price: { min: 5000, max: 15000 },
    unit: '次',
    description: '云服务器配置、环境搭建、应用部署',
    applicableTo: ['corporate-website', 'ecommerce', 'native-app', 'cross-platform-app'],
  },
  {
    id: 'domain-ssl',
    name: '域名+SSL证书',
    category: '运维服务',
    price: 2000,
    unit: '年',
    description: '域名注册、SSL证书申请与配置',
    applicableTo: ['corporate-website', 'ecommerce'],
  },
  {
    id: 'cdn-service',
    name: 'CDN加速服务',
    category: '运维服务',
    price: { min: 3000, max: 10000 },
    unit: '年',
    description: '全球CDN节点、加速访问、降低延迟',
    applicableTo: ['corporate-website', 'ecommerce'],
  },
  {
    id: 'backup-service',
    name: '数据备份服务',
    category: '运维服务',
    price: 2500,
    unit: '年',
    description: '自动备份、异地存储、快速恢复',
    applicableTo: ['all'],
  },
  {
    id: 'security-protection',
    name: '安全防护服务',
    category: '运维服务',
    price: { min: 5000, max: 20000 },
    unit: '年',
    description: 'DDoS防护、WAF防火墙、安全监控',
    applicableTo: ['ecommerce', 'native-app', 'cross-platform-app'],
    popular: true,
  },
  {
    id: 'performance-monitor',
    name: '性能监控',
    category: '运维服务',
    price: 3000,
    unit: '年',
    description: '实时监控、性能分析、告警通知',
    applicableTo: ['all'],
  },

  // ========== 培训服务 ==========
  {
    id: 'user-training',
    name: '用户使用培训',
    category: '培训服务',
    price: 3000,
    unit: '天',
    description: '后台操作、内容管理、日常维护',
    applicableTo: ['corporate-website', 'ecommerce'],
  },
  {
    id: 'tech-training',
    name: '技术培训',
    category: '培训服务',
    price: 8000,
    unit: '天',
    description: '代码讲解、架构说明、二次开发指导',
    applicableTo: ['all'],
  },
  {
    id: 'documentation',
    name: '技术文档编写',
    category: '培训服务',
    price: { min: 5000, max: 20000 },
    unit: '套',
    description: '用户手册、技术文档、API文档',
    applicableTo: ['all'],
  },
  {
    id: 'video-tutorial',
    name: '视频教程制作',
    category: '培训服务',
    price: { min: 8000, max: 25000 },
    unit: '套',
    description: '录制操作视频、在线学习平台',
    applicableTo: ['all'],
  },

  // ========== 内容服务 ==========
  {
    id: 'copywriting',
    name: '文案撰写',
    category: '内容服务',
    price: 800,
    unit: '页',
    description: '专业文案、SEO优化、品牌调性',
    applicableTo: ['corporate-website', 'ecommerce'],
  },
  {
    id: 'photography',
    name: '产品摄影',
    category: '内容服务',
    price: { min: 3000, max: 8000 },
    unit: '天',
    description: '专业摄影、后期修图、场景布置',
    applicableTo: ['ecommerce'],
  },
  {
    id: 'video-production',
    name: '视频制作',
    category: '内容服务',
    price: { min: 10000, max: 50000 },
    unit: '支',
    description: '企业宣传片、产品介绍、动画制作',
    applicableTo: ['corporate-website', 'ecommerce'],
  },
  {
    id: 'content-migration',
    name: '内容迁移',
    category: '内容服务',
    price: { min: 5000, max: 20000 },
    unit: '次',
    description: '旧站数据迁移、内容整理、格式转换',
    applicableTo: ['corporate-website', 'ecommerce'],
  },

  // ========== 营销服务 ==========
  {
    id: 'seo-optimization',
    name: 'SEO深度优化',
    category: '营销服务',
    price: { min: 8000, max: 25000 },
    unit: '月',
    description: '关键词优化、外链建设、排名提升',
    applicableTo: ['corporate-website', 'ecommerce'],
    popular: true,
  },
  {
    id: 'sem-advertising',
    name: 'SEM广告投放',
    category: '营销服务',
    price: { min: 10000, max: 50000 },
    unit: '月',
    description: 'Google Ads、Facebook Ads投放管理',
    applicableTo: ['corporate-website', 'ecommerce'],
  },
  {
    id: 'social-media',
    name: '社交媒体运营',
    category: '营销服务',
    price: { min: 8000, max: 20000 },
    unit: '月',
    description: 'Facebook、Instagram、LINE运营',
    applicableTo: ['all'],
  },
  {
    id: 'email-marketing',
    name: '邮件营销',
    category: '营销服务',
    price: { min: 5000, max: 15000 },
    unit: '月',
    description: 'EDM设计、发送管理、数据分析',
    applicableTo: ['ecommerce'],
  },
  {
    id: 'analytics-setup',
    name: '数据分析配置',
    category: '营销服务',
    price: 5000,
    unit: '次',
    description: 'Google Analytics、热力图、转化追踪',
    applicableTo: ['all'],
  },

  // ========== APP专属服务 ==========
  {
    id: 'app-store-submit',
    name: 'App Store上架',
    category: 'APP服务',
    price: 8000,
    unit: '次',
    description: '应用提交、审核协助、上架指导',
    applicableTo: ['native-app', 'cross-platform-app'],
  },
  {
    id: 'app-update',
    name: 'APP版本更新',
    category: 'APP服务',
    price: { min: 5000, max: 20000 },
    unit: '次',
    description: '功能更新、Bug修复、版本发布',
    applicableTo: ['native-app', 'cross-platform-app'],
  },
  {
    id: 'push-notification',
    name: '推送通知服务',
    category: 'APP服务',
    price: 3000,
    unit: '年',
    description: '消息推送、用户触达、数据统计',
    applicableTo: ['native-app', 'cross-platform-app', 'miniprogram'],
  },
  {
    id: 'app-analytics',
    name: 'APP数据分析',
    category: 'APP服务',
    price: 5000,
    unit: '年',
    description: '用户行为分析、留存分析、漏斗分析',
    applicableTo: ['native-app', 'cross-platform-app'],
  },
  {
    id: 'crash-monitoring',
    name: '崩溃监控',
    category: 'APP服务',
    price: 3000,
    unit: '年',
    description: '实时监控、错误追踪、性能分析',
    applicableTo: ['native-app', 'cross-platform-app'],
  },

  // ========== 电商专属服务 ==========
  {
    id: 'product-import',
    name: '商品批量导入',
    category: '电商服务',
    price: { min: 3000, max: 10000 },
    unit: '次',
    description: '批量导入、数据清洗、分类整理',
    applicableTo: ['ecommerce'],
  },
  {
    id: 'payment-integration',
    name: '支付网关集成',
    category: '电商服务',
    price: 8000,
    unit: '个',
    description: '信用卡、第三方支付、货到付款',
    applicableTo: ['ecommerce'],
  },
  {
    id: 'logistics-integration',
    name: '物流系统对接',
    category: '电商服务',
    price: 12000,
    unit: '个',
    description: '物流追踪、运费计算、面单打印',
    applicableTo: ['ecommerce'],
  },
  {
    id: 'inventory-management',
    name: '库存管理系统',
    category: '电商服务',
    price: { min: 15000, max: 40000 },
    unit: '套',
    description: '库存同步、预警提醒、多仓管理',
    applicableTo: ['ecommerce'],
  },
  {
    id: 'erp-integration',
    name: 'ERP系统对接',
    category: '电商服务',
    price: { min: 20000, max: 60000 },
    unit: '次',
    description: '订单同步、库存同步、财务对接',
    applicableTo: ['ecommerce'],
  },

  // ========== 设计服务 ==========
  {
    id: 'banner-design',
    name: 'Banner设计',
    category: '设计服务',
    price: 1500,
    unit: '张',
    description: '首页Banner、活动海报、广告图',
    applicableTo: ['corporate-website', 'ecommerce'],
  },
  {
    id: 'icon-design',
    name: '图标设计',
    category: '设计服务',
    price: 500,
    unit: '个',
    description: '自定义图标、矢量图标、图标集',
    applicableTo: ['all'],
  },
  {
    id: 'illustration',
    name: '插画设计',
    category: '设计服务',
    price: { min: 3000, max: 10000 },
    unit: '张',
    description: '原创插画、场景插画、人物插画',
    applicableTo: ['all'],
  },
  {
    id: 'ui-redesign',
    name: 'UI改版设计',
    category: '设计服务',
    price: { min: 15000, max: 50000 },
    unit: '次',
    description: '界面重新设计、视觉升级',
    applicableTo: ['all'],
  },

  // ========== 技术服务 ==========
  {
    id: 'api-development',
    name: 'API接口开发',
    category: '技术服务',
    price: { min: 8000, max: 30000 },
    unit: '个',
    description: '自定义API、第三方对接、数据接口',
    applicableTo: ['all'],
  },
  {
    id: 'database-optimization',
    name: '数据库优化',
    category: '技术服务',
    price: { min: 10000, max: 30000 },
    unit: '次',
    description: '查询优化、索引优化、性能提升',
    applicableTo: ['ecommerce', 'native-app', 'cross-platform-app'],
  },
  {
    id: 'code-review',
    name: '代码审查',
    category: '技术服务',
    price: { min: 8000, max: 20000 },
    unit: '次',
    description: '代码质量检查、安全审计、优化建议',
    applicableTo: ['all'],
  },
  {
    id: 'load-testing',
    name: '压力测试',
    category: '技术服务',
    price: { min: 10000, max: 25000 },
    unit: '次',
    description: '性能测试、并发测试、瓶颈分析',
    applicableTo: ['ecommerce', 'native-app', 'cross-platform-app'],
  },
  {
    id: 'security-audit',
    name: '安全审计',
    category: '技术服务',
    price: { min: 15000, max: 40000 },
    unit: '次',
    description: '漏洞扫描、渗透测试、安全加固',
    applicableTo: ['all'],
  },

  // ========== 咨询服务 ==========
  {
    id: 'tech-consulting',
    name: '技术咨询',
    category: '咨询服务',
    price: 3000,
    unit: '小时',
    description: '技术选型、架构设计、方案评估',
    applicableTo: ['all'],
  },
  {
    id: 'business-consulting',
    name: '业务咨询',
    category: '咨询服务',
    price: 5000,
    unit: '小时',
    description: '商业模式、产品规划、市场分析',
    applicableTo: ['all'],
  },
  {
    id: 'ux-consulting',
    name: 'UX咨询',
    category: '咨询服务',
    price: 4000,
    unit: '小时',
    description: '用户研究、体验优化、可用性测试',
    applicableTo: ['all'],
  },
];

// 按类别分组
export const getServicesByCategory = (category: string): ValueAddedService[] => {
  return valueAddedServices.filter(service => service.category === category);
};

// 获取适用于特定产品类型的服务
export const getServicesForProduct = (productType: string): ValueAddedService[] => {
  return valueAddedServices.filter(service => 
    service.applicableTo.includes('all') || service.applicableTo.includes(productType)
  );
};

// 获取热门服务
export const getPopularServices = (): ValueAddedService[] => {
  return valueAddedServices.filter(service => service.popular);
};

// 所有服务类别
export const serviceCategories = [
  '维护服务',
  '运维服务',
  '培训服务',
  '内容服务',
  '营销服务',
  'APP服务',
  '电商服务',
  '设计服务',
  '技术服务',
  '咨询服务',
];

// 格式化价格显示
export const formatServicePrice = (price: number | { min: number; max: number }, unit: string): string => {
  if (typeof price === 'number') {
    if (price === 0) return '包含在项目中';
    return `NT$${price.toLocaleString()} / ${unit}`;
  }
  return `NT$${price.min.toLocaleString()} - ${price.max.toLocaleString()} / ${unit}`;
};
