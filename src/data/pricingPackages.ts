// 套餐定价（预设组合方案）
export interface PricingPackage {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number; // 原价，用于显示折扣
  popular?: boolean;
  description: string;
  features: string[];
  includes: {
    pages?: number;
    design: string;
    tech: string;
    support: string;
    delivery: string;
  };
  addons?: string[]; // 可选增值服务ID
  bestFor: string[]; // 适合的客户类型
  caseStudy?: {
    title: string;
    description: string;
    results: string[];
  };
}

export const pricingPackages: PricingPackage[] = [
  // ========== 展示型官网套餐 ==========
  {
    id: 'website-starter',
    name: '入门版官网',
    category: 'corporate-website',
    price: 30000,
    description: '适合初创公司和个人工作室',
    features: [
      '5页精美设计',
      '响应式布局',
      '基础SEO优化',
      '联系表单',
      'WordPress后台',
      '3个月免费维护',
    ],
    includes: {
      pages: 5,
      design: '模板定制',
      tech: 'WordPress',
      support: '3个月',
      delivery: '3-4周',
    },
    bestFor: ['初创公司', '个人工作室', '小型企业'],
    caseStudy: {
      title: '设计工作室官网',
      description: '为一家设计工作室打造的简约官网',
      results: ['访问量提升200%', '询盘增加150%', '品牌认知度提升'],
    },
  },
  {
    id: 'website-business',
    name: '商务版官网',
    category: 'corporate-website',
    price: 58000,
    originalPrice: 70000,
    popular: true,
    description: '适合中小企业展示品牌形象',
    features: [
      '10页原创设计',
      '高级动画效果',
      '双语言支持',
      '深度SEO优化',
      '博客系统',
      'Next.js技术栈',
      '6个月免费维护',
      '免费域名+SSL',
    ],
    includes: {
      pages: 10,
      design: '原创设计 + 动画',
      tech: 'Next.js',
      support: '6个月',
      delivery: '5-6周',
    },
    bestFor: ['中小企业', '品牌公司', '服务型企业'],
    caseStudy: {
      title: '科技公司官网',
      description: '为B2B科技公司打造的专业官网',
      results: ['SEO排名前3', '转化率提升180%', '客户信任度提升'],
    },
  },
  {
    id: 'website-enterprise',
    name: '企业版官网',
    category: 'corporate-website',
    price: 128000,
    originalPrice: 150000,
    description: '适合大型企业和集团公司',
    features: [
      '20页定制设计',
      '3D/WebGL特效',
      '三语言支持',
      '企业级SEO',
      '博客+新闻系统',
      '在线客服',
      '自定义CMS',
      '12个月免费维护',
      '免费服务器部署',
      '性能监控',
    ],
    includes: {
      pages: 20,
      design: '原创设计 + 3D效果',
      tech: '自定义CMS',
      support: '12个月',
      delivery: '8-10周',
    },
    bestFor: ['大型企业', '集团公司', '上市公司'],
  },

  // ========== 电商网站套餐 ==========
  {
    id: 'ecommerce-starter',
    name: 'Shopify入门版',
    category: 'ecommerce',
    price: 88000,
    description: '快速启动在线商店',
    features: [
      'Shopify平台定制',
      '100个SKU',
      '2个支付网关',
      '基础物流对接',
      '优惠券系统',
      '商品评价',
      '移动端优化',
      '3个月免费维护',
    ],
    includes: {
      design: 'Shopify主题定制',
      tech: 'Shopify',
      support: '3个月',
      delivery: '4-5周',
    },
    bestFor: ['电商新手', '小型商家', '测试市场'],
    caseStudy: {
      title: '服饰品牌商城',
      description: '帮助服饰品牌快速上线电商平台',
      results: ['首月GMV 50万', '复购率35%', '运营成本降低40%'],
    },
  },
  {
    id: 'ecommerce-growth',
    name: '成长版商城',
    category: 'ecommerce',
    price: 168000,
    originalPrice: 200000,
    popular: true,
    description: '适合快速成长的电商企业',
    features: [
      'WooCommerce定制',
      '500个SKU',
      '3个支付网关',
      '智能物流系统',
      '会员等级系统',
      '积分系统',
      '优惠券系统',
      '商品推荐',
      '数据分析看板',
      '6个月免费维护',
      'SEO优化',
    ],
    includes: {
      design: '原创电商设计',
      tech: 'WooCommerce',
      support: '6个月',
      delivery: '6-8周',
    },
    bestFor: ['成长型电商', '品牌商家', '多SKU商家'],
    caseStudy: {
      title: '美妆电商平台',
      description: '为美妆品牌打造的全功能商城',
      results: ['月GMV 200万', '客单价提升60%', '会员复购率45%'],
    },
  },
  {
    id: 'ecommerce-enterprise',
    name: '企业版商城',
    category: 'ecommerce',
    price: 328000,
    originalPrice: 400000,
    description: '大型电商平台解决方案',
    features: [
      '自建电商平台',
      '无限SKU',
      '5个支付网关',
      '智能物流系统',
      '会员等级系统',
      '积分+优惠券',
      'AI推荐引擎',
      '分销系统',
      '秒杀系统',
      '直播带货',
      '数据分析+BI',
      '12个月免费维护',
      '专属客户经理',
    ],
    includes: {
      design: '定制电商设计',
      tech: '自建平台',
      support: '12个月',
      delivery: '10-14周',
    },
    bestFor: ['大型电商', '品牌旗舰店', '多商户平台'],
  },

  // ========== APP开发套餐 ==========
  {
    id: 'app-mvp',
    name: 'MVP版APP',
    category: 'cross-platform-app',
    price: 128000,
    description: '快速验证产品想法',
    features: [
      'React Native开发',
      'iOS + Android',
      '核心功能实现',
      '用户系统',
      '基础UI设计',
      '推送通知',
      '数据统计',
      '3个月免费维护',
      'App Store上架协助',
    ],
    includes: {
      design: '标准UI设计',
      tech: 'React Native',
      support: '3个月',
      delivery: '6-8周',
    },
    bestFor: ['初创团队', '产品验证', '快速上线'],
    caseStudy: {
      title: '健身打卡APP',
      description: '帮助健身创业团队快速验证产品',
      results: ['2周获得1000用户', '日活率40%', '成功融资天使轮'],
    },
  },
  {
    id: 'app-standard',
    name: '标准版APP',
    category: 'cross-platform-app',
    price: 218000,
    originalPrice: 260000,
    popular: true,
    description: '功能完整的商业应用',
    features: [
      'Flutter开发',
      'iOS + Android',
      '完整功能开发',
      '用户系统',
      '定制UI设计',
      '地图定位',
      '支付集成',
      '即时通讯',
      '推送通知',
      '数据分析',
      '性能优化',
      '6个月免费维护',
      'App Store上架',
    ],
    includes: {
      design: '定制UI设计',
      tech: 'Flutter',
      support: '6个月',
      delivery: '8-12周',
    },
    bestFor: ['商业应用', '服务平台', 'O2O应用'],
    caseStudy: {
      title: '外卖配送APP',
      description: '为本地外卖平台开发的完整应用',
      results: ['日订单5000+', '配送效率提升50%', '用户满意度4.8分'],
    },
  },
  {
    id: 'app-native',
    name: '原生版APP',
    category: 'native-app',
    price: 388000,
    originalPrice: 480000,
    description: '极致性能的原生应用',
    features: [
      'iOS + Android原生',
      '完整功能开发',
      '高端UI设计',
      '地图定位',
      '相机功能',
      '支付集成',
      '即时通讯',
      '音视频通话',
      'AI功能',
      '离线功能',
      '深度性能优化',
      '12个月免费维护',
      '专属技术支持',
    ],
    includes: {
      design: '高端UI设计',
      tech: '原生开发',
      support: '12个月',
      delivery: '12-16周',
    },
    bestFor: ['高性能应用', '社交平台', '金融应用'],
  },

  // ========== 小程序套餐 ==========
  {
    id: 'miniprogram-basic',
    name: '基础版小程序',
    category: 'miniprogram',
    price: 45000,
    description: '快速进入微信生态',
    features: [
      '微信小程序',
      '基础功能开发',
      '标准UI设计',
      '用户授权',
      '分享功能',
      '模板消息',
      '3个月免费维护',
    ],
    includes: {
      design: '标准UI',
      tech: '微信小程序',
      support: '3个月',
      delivery: '3-4周',
    },
    bestFor: ['小型商家', '线下门店', '服务预约'],
  },
  {
    id: 'miniprogram-ecommerce',
    name: '电商版小程序',
    category: 'miniprogram',
    price: 78000,
    originalPrice: 90000,
    popular: true,
    description: '完整的小程序商城',
    features: [
      '微信小程序',
      '商城功能',
      '支付功能',
      '订单管理',
      '会员系统',
      '优惠券',
      '客服功能',
      '数据统计',
      '6个月免费维护',
    ],
    includes: {
      design: '电商UI设计',
      tech: '微信小程序',
      support: '6个月',
      delivery: '4-6周',
    },
    bestFor: ['电商商家', '品牌零售', '社交电商'],
    caseStudy: {
      title: '生鲜小程序商城',
      description: '为生鲜品牌打造的社区团购小程序',
      results: ['月GMV 100万', '社区覆盖50+', '复购率60%'],
    },
  },
  {
    id: 'miniprogram-multi',
    name: '多平台小程序',
    category: 'miniprogram',
    price: 128000,
    description: '覆盖多个小程序平台',
    features: [
      '微信+支付宝+抖音',
      '统一代码库',
      '完整功能',
      '支付功能',
      '直播功能',
      '数据统计',
      '多平台运营',
      '12个月免费维护',
    ],
    includes: {
      design: '多平台适配',
      tech: 'Uni-app',
      support: '12个月',
      delivery: '6-8周',
    },
    bestFor: ['全渠道商家', '品牌企业', '连锁门店'],
  },

  // ========== 设计套餐 ==========
  {
    id: 'design-website',
    name: '网站设计套餐',
    category: 'ui-design',
    price: 48000,
    description: '专业的网站UI/UX设计',
    features: [
      '10页设计',
      '线框图',
      '高保真设计',
      '交互原型',
      '响应式设计',
      '设计规范',
      '3次修改',
    ],
    includes: {
      pages: 10,
      design: '完整设计流程',
      tech: 'Figma',
      support: '设计交付',
      delivery: '3-4周',
    },
    bestFor: ['需要设计的企业', '重新设计', '品牌升级'],
  },
  {
    id: 'design-app',
    name: 'APP设计套餐',
    category: 'ui-design',
    price: 88000,
    popular: true,
    description: '完整的APP设计方案',
    features: [
      '20页设计',
      '用户研究',
      '线框图',
      '高保真设计',
      '交互原型',
      '设计系统',
      '动效设计',
      '5次修改',
    ],
    includes: {
      pages: 20,
      design: '完整设计+动效',
      tech: 'Figma + Principle',
      support: '设计交付',
      delivery: '4-6周',
    },
    bestFor: ['APP开发前', '产品改版', '用户体验优化'],
  },
  {
    id: 'design-brand',
    name: '品牌设计套餐',
    category: 'ui-design',
    price: 128000,
    description: '完整的品牌视觉体系',
    features: [
      'Logo设计',
      'VI系统',
      '品牌指南',
      '网站设计',
      'APP设计',
      '物料设计',
      '品牌手册',
      '无限次修改',
    ],
    includes: {
      design: '品牌全案',
      tech: 'Adobe Suite',
      support: '品牌咨询',
      delivery: '6-8周',
    },
    bestFor: ['新品牌', '品牌升级', '品牌重塑'],
  },
];

// 获取指定类别的套餐
export const getPackagesByCategory = (category: string): PricingPackage[] => {
  return pricingPackages.filter(pkg => pkg.category === category);
};

// 获取热门套餐
export const getPopularPackages = (): PricingPackage[] => {
  return pricingPackages.filter(pkg => pkg.popular);
};

// 获取套餐详情
export const getPackageById = (id: string): PricingPackage | undefined => {
  return pricingPackages.find(pkg => pkg.id === id);
};

// 计算折扣百分比
export const calculateDiscount = (price: number, originalPrice?: number): number => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};
