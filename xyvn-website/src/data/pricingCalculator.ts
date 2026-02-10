// 价格计算器和ROI分析工具
import { Currency, formatPrice } from './currencyData';

// ROI计算参数
export interface ROIParams {
  projectCost: number; // 项目成本
  monthlyRevenue?: number; // 预期月收入
  monthlySavings?: number; // 月节省成本
  conversionRate?: number; // 转化率提升
  trafficIncrease?: number; // 流量增长
  customerLifetimeValue?: number; // 客户生命周期价值
}

// ROI计算结果
export interface ROIResult {
  breakEvenMonths: number; // 回本月数
  firstYearROI: number; // 第一年ROI
  threeYearROI: number; // 三年ROI
  totalReturn: number; // 总回报
  recommendation: string; // 建议
}

// 计算ROI
export const calculateROI = (params: ROIParams): ROIResult => {
  const {
    projectCost,
    monthlyRevenue = 0,
    monthlySavings = 0,
    conversionRate = 0,
    trafficIncrease = 0,
    customerLifetimeValue = 0,
  } = params;

  // 月度收益 = 直接收入 + 节省成本 + 转化提升收益
  const monthlyBenefit = monthlyRevenue + monthlySavings + (conversionRate * trafficIncrease * customerLifetimeValue);

  // 回本月数
  const breakEvenMonths = monthlyBenefit > 0 ? Math.ceil(projectCost / monthlyBenefit) : 999;

  // 第一年ROI
  const firstYearReturn = monthlyBenefit * 12;
  const firstYearROI = projectCost > 0 ? ((firstYearReturn - projectCost) / projectCost) * 100 : 0;

  // 三年ROI
  const threeYearReturn = monthlyBenefit * 36;
  const threeYearROI = projectCost > 0 ? ((threeYearReturn - projectCost) / projectCost) * 100 : 0;

  // 总回报
  const totalReturn = threeYearReturn;

  // 建议
  let recommendation = '';
  if (breakEvenMonths <= 6) {
    recommendation = '极佳投资！预计半年内回本，强烈推荐';
  } else if (breakEvenMonths <= 12) {
    recommendation = '良好投资！预计一年内回本，值得投资';
  } else if (breakEvenMonths <= 24) {
    recommendation = '合理投资！预计两年内回本，可以考虑';
  } else {
    recommendation = '需要谨慎评估，建议优化预期收益或降低成本';
  }

  return {
    breakEvenMonths,
    firstYearROI: Math.round(firstYearROI),
    threeYearROI: Math.round(threeYearROI),
    totalReturn,
    recommendation,
  };
};

// 价格对比工具
export interface ComparisonItem {
  name: string;
  ourPrice: number;
  marketPrice: number;
  features: string[];
  savings: number;
  savingsPercent: number;
}

// 生成价格对比
export const generateComparison = (category: string): ComparisonItem[] => {
  const comparisons: Record<string, ComparisonItem[]> = {
    'corporate-website': [
      {
        name: '入门版官网',
        ourPrice: 30000,
        marketPrice: 50000,
        features: ['5页设计', 'WordPress', '3个月维护'],
        savings: 20000,
        savingsPercent: 40,
      },
      {
        name: '商务版官网',
        ourPrice: 58000,
        marketPrice: 95000,
        features: ['10页设计', 'Next.js', '6个月维护'],
        savings: 37000,
        savingsPercent: 39,
      },
      {
        name: '企业版官网',
        ourPrice: 128000,
        marketPrice: 200000,
        features: ['20页设计', '自定义CMS', '12个月维护'],
        savings: 72000,
        savingsPercent: 36,
      },
    ],
    'ecommerce': [
      {
        name: 'Shopify入门版',
        ourPrice: 88000,
        marketPrice: 140000,
        features: ['Shopify定制', '100 SKU', '基础功能'],
        savings: 52000,
        savingsPercent: 37,
      },
      {
        name: '成长版商城',
        ourPrice: 168000,
        marketPrice: 280000,
        features: ['WooCommerce', '500 SKU', '完整功能'],
        savings: 112000,
        savingsPercent: 40,
      },
      {
        name: '企业版商城',
        ourPrice: 328000,
        marketPrice: 550000,
        features: ['自建平台', '无限SKU', '高级功能'],
        savings: 222000,
        savingsPercent: 40,
      },
    ],
    'app': [
      {
        name: 'MVP版APP',
        ourPrice: 128000,
        marketPrice: 200000,
        features: ['React Native', '基础功能', 'MVP验证'],
        savings: 72000,
        savingsPercent: 36,
      },
      {
        name: '标准版APP',
        ourPrice: 218000,
        marketPrice: 350000,
        features: ['Flutter', '完整功能', '双平台'],
        savings: 132000,
        savingsPercent: 38,
      },
      {
        name: '原生版APP',
        ourPrice: 388000,
        marketPrice: 650000,
        features: ['原生开发', '高级功能', '极致性能'],
        savings: 262000,
        savingsPercent: 40,
      },
    ],
  };

  return comparisons[category] || [];
};

// 项目成本分解
export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
  description: string;
}

// 生成成本分解
export const generateCostBreakdown = (totalCost: number, projectType: string): CostBreakdown[] => {
  const breakdowns: Record<string, CostBreakdown[]> = {
    'corporate-website': [
      { category: '设计', amount: totalCost * 0.30, percentage: 30, description: 'UI/UX设计、视觉设计' },
      { category: '前端开发', amount: totalCost * 0.25, percentage: 25, description: '页面开发、交互实现' },
      { category: '后端开发', amount: totalCost * 0.20, percentage: 20, description: 'CMS、API开发' },
      { category: '测试', amount: totalCost * 0.10, percentage: 10, description: '功能测试、兼容性测试' },
      { category: '部署', amount: totalCost * 0.05, percentage: 5, description: '服务器部署、上线' },
      { category: '项目管理', amount: totalCost * 0.10, percentage: 10, description: '项目协调、沟通管理' },
    ],
    'ecommerce': [
      { category: '设计', amount: totalCost * 0.25, percentage: 25, description: 'UI/UX设计、商品展示' },
      { category: '前端开发', amount: totalCost * 0.20, percentage: 20, description: '页面开发、购物流程' },
      { category: '后端开发', amount: totalCost * 0.30, percentage: 30, description: '订单系统、支付集成' },
      { category: '测试', amount: totalCost * 0.12, percentage: 12, description: '功能测试、压力测试' },
      { category: '部署', amount: totalCost * 0.05, percentage: 5, description: '服务器部署、安全配置' },
      { category: '项目管理', amount: totalCost * 0.08, percentage: 8, description: '项目协调、需求管理' },
    ],
    'app': [
      { category: '设计', amount: totalCost * 0.25, percentage: 25, description: 'UI/UX设计、交互设计' },
      { category: 'iOS开发', amount: totalCost * 0.22, percentage: 22, description: 'iOS原生开发' },
      { category: 'Android开发', amount: totalCost * 0.22, percentage: 22, description: 'Android原生开发' },
      { category: '后端开发', amount: totalCost * 0.15, percentage: 15, description: 'API、服务器开发' },
      { category: '测试', amount: totalCost * 0.10, percentage: 10, description: '功能测试、设备测试' },
      { category: '上架', amount: totalCost * 0.03, percentage: 3, description: 'App Store上架' },
      { category: '项目管理', amount: totalCost * 0.03, percentage: 3, description: '项目协调管理' },
    ],
  };

  return breakdowns[projectType] || breakdowns['corporate-website'];
};

// 时间成本计算
export interface TimelineEstimate {
  phase: string;
  duration: string;
  tasks: string[];
  deliverables: string[];
}

// 生成项目时间线
export const generateTimeline = (projectType: string, complexity: 'simple' | 'medium' | 'complex'): TimelineEstimate[] => {
  const multiplier = complexity === 'simple' ? 1 : complexity === 'medium' ? 1.5 : 2;

  const baseTimelines: Record<string, TimelineEstimate[]> = {
    'corporate-website': [
      {
        phase: '需求分析',
        duration: `${Math.ceil(3 * multiplier)}天`,
        tasks: ['需求收集', '竞品分析', '功能规划'],
        deliverables: ['需求文档', '功能清单'],
      },
      {
        phase: '设计阶段',
        duration: `${Math.ceil(7 * multiplier)}天`,
        tasks: ['线框图', '视觉设计', '交互设计'],
        deliverables: ['设计稿', '设计规范'],
      },
      {
        phase: '开发阶段',
        duration: `${Math.ceil(14 * multiplier)}天`,
        tasks: ['前端开发', '后端开发', '功能集成'],
        deliverables: ['测试环境', '功能演示'],
      },
      {
        phase: '测试阶段',
        duration: `${Math.ceil(5 * multiplier)}天`,
        tasks: ['功能测试', '兼容性测试', 'Bug修复'],
        deliverables: ['测试报告', '修复记录'],
      },
      {
        phase: '上线部署',
        duration: `${Math.ceil(2 * multiplier)}天`,
        tasks: ['服务器配置', '域名解析', '正式上线'],
        deliverables: ['上线网站', '操作手册'],
      },
    ],
  };

  return baseTimelines[projectType] || baseTimelines['corporate-website'];
};

// 风险评估
export interface RiskAssessment {
  risk: string;
  level: 'low' | 'medium' | 'high';
  impact: string;
  mitigation: string;
}

// 生成风险评估
export const generateRiskAssessment = (projectType: string): RiskAssessment[] => {
  return [
    {
      risk: '需求变更',
      level: 'medium',
      impact: '可能导致工期延长10-20%',
      mitigation: '签订详细需求文档，变更需重新评估',
    },
    {
      risk: '技术难点',
      level: 'low',
      impact: '可能需要额外研发时间',
      mitigation: '提前进行技术预研和POC验证',
    },
    {
      risk: '第三方服务',
      level: 'medium',
      impact: '依赖第三方API可能影响进度',
      mitigation: '提前测试API，准备备选方案',
    },
    {
      risk: '沟通延迟',
      level: 'low',
      impact: '可能影响决策效率',
      mitigation: '建立定期沟通机制，快速响应',
    },
  ];
};

// 价值主张生成器
export interface ValueProposition {
  title: string;
  description: string;
  benefits: string[];
  metrics: { label: string; value: string }[];
}

// 生成价值主张
export const generateValueProposition = (projectType: string): ValueProposition => {
  const propositions: Record<string, ValueProposition> = {
    'corporate-website': {
      title: '提升品牌形象，获取更多商机',
      description: '专业的企业官网是您的24小时在线名片，帮助您建立信任、展示实力、获取客户。',
      benefits: [
        '提升品牌专业形象',
        '增加客户信任度',
        '提高搜索引擎排名',
        '降低获客成本',
        '24小时在线展示',
      ],
      metrics: [
        { label: '平均询盘增长', value: '150%' },
        { label: '品牌搜索量提升', value: '200%' },
        { label: '客户信任度提升', value: '85%' },
      ],
    },
    'ecommerce': {
      title: '开启在线销售，倍增营业额',
      description: '专业的电商平台帮助您拓展销售渠道，提升运营效率，实现业绩增长。',
      benefits: [
        '拓展在线销售渠道',
        '提升运营效率',
        '降低运营成本',
        '提高客户复购率',
        '数据驱动决策',
      ],
      metrics: [
        { label: '平均GMV增长', value: '300%' },
        { label: '运营成本降低', value: '40%' },
        { label: '客户复购率', value: '45%' },
      ],
    },
    'app': {
      title: '移动优先，抢占用户心智',
      description: '专业的移动应用帮助您直达用户，提升用户粘性，建立竞争壁垒。',
      benefits: [
        '直达用户手机',
        '提升用户粘性',
        '增强品牌认知',
        '收集用户数据',
        '建立竞争壁垒',
      ],
      metrics: [
        { label: '用户日活率', value: '40%' },
        { label: '用户留存率', value: '65%' },
        { label: '使用时长增长', value: '180%' },
      ],
    },
  };

  return propositions[projectType] || propositions['corporate-website'];
};

// 导出所有工具函数
export const pricingCalculator = {
  calculateROI,
  generateComparison,
  generateCostBreakdown,
  generateTimeline,
  generateRiskAssessment,
  generateValueProposition,
};
