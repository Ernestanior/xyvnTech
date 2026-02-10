// 定价数据（基准：新台币 TWD）
export interface PricingOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  basePrice: { min: number; max: number };
  description: string;
  options: {
    pages?: PricingOption[];
    design?: PricingOption[];
    features?: PricingOption[];
    tech?: PricingOption[];
    scale?: PricingOption[];
    platforms?: PricingOption[];
    advanced?: PricingOption[];
  };
}

export const pricingData: ServiceCategory[] = [
  {
    id: 'corporate-website',
    name: '展示型官网',
    icon: '🌐',
    basePrice: { min: 30000, max: 80000 },
    description: '企业形象展示、品牌宣传',
    options: {
      pages: [
        { id: 'pages-5', name: '5页以内', price: 30000, description: '首页+关于+服务+案例+联系' },
        { id: 'pages-10', name: '6-10页', price: 45000, description: '增加产品详情、团队介绍等' },
        { id: 'pages-15', name: '11-15页', price: 60000, description: '完整的产品线和服务介绍' },
        { id: 'pages-20', name: '16-20页', price: 75000, description: '大型企业官网' },
      ],
      design: [
        { id: 'design-template', name: '模板定制', price: 0, description: '基于现有模板修改' },
        { id: 'design-original', name: '原创设计', price: 12000, description: '完全定制化设计' },
        { id: 'design-animation', name: '高级动画', price: 8000, description: '精美的交互动画' },
        { id: 'design-3d', name: '3D/WebGL', price: 15000, description: '3D效果和WebGL' },
      ],
      features: [
        { id: 'feat-multilang', name: '多语言', price: 6000, description: '每增加一种语言' },
        { id: 'feat-seo', name: 'SEO优化', price: 5000, description: '搜索引擎优化' },
        { id: 'feat-blog', name: '博客系统', price: 6000, description: '文章发布管理' },
        { id: 'feat-news', name: '新闻管理', price: 5000, description: '新闻动态管理' },
        { id: 'feat-chat', name: '在线客服', price: 3000, description: '客服系统集成' },
      ],
      tech: [
        { id: 'tech-wordpress', name: 'WordPress', price: 0, description: '成熟的CMS系统' },
        { id: 'tech-nextjs', name: 'Next.js/React', price: 12000, description: '现代化前端框架' },
        { id: 'tech-custom', name: '自定义CMS', price: 18000, description: '完全定制的后台' },
      ],
    },
  },
  {
    id: 'ecommerce',
    name: '电商网站',
    icon: '🛍️',
    basePrice: { min: 80000, max: 350000 },
    description: '在线商城、购物平台',
    options: {
      platforms: [
        { id: 'platform-shopify', name: 'Shopify定制', price: 80000, description: '基于Shopify平台' },
        { id: 'platform-woo', name: 'WooCommerce', price: 90000, description: 'WordPress电商插件' },
        { id: 'platform-custom', name: '自建平台', price: 180000, description: '完全自主开发' },
      ],
      scale: [
        { id: 'sku-100', name: '100个SKU以内', price: 0, description: '小型商店' },
        { id: 'sku-500', name: '100-500个SKU', price: 20000, description: '中型商店' },
        { id: 'sku-1000', name: '500-1000个SKU', price: 40000, description: '大型商店' },
        { id: 'sku-more', name: '1000个SKU以上', price: 60000, description: '超大型商城' },
      ],
      features: [
        { id: 'feat-payment', name: '支付网关', price: 6000, description: '每个支付方式' },
        { id: 'feat-shipping', name: '物流系统', price: 12000, description: '物流追踪集成' },
        { id: 'feat-coupon', name: '优惠券系统', price: 10000, description: '折扣码管理' },
        { id: 'feat-member', name: '会员等级', price: 12000, description: 'VIP会员系统' },
        { id: 'feat-points', name: '积分系统', price: 10000, description: '积分兑换功能' },
        { id: 'feat-recommend', name: '推荐系统', price: 15000, description: '智能商品推荐' },
        { id: 'feat-review', name: '评价系统', price: 6000, description: '用户评价功能' },
      ],
      advanced: [
        { id: 'adv-multi', name: '多商户平台', price: 120000, description: '类似淘宝模式' },
        { id: 'adv-distribution', name: '分销系统', price: 35000, description: '分销商管理' },
        { id: 'adv-group', name: '拼团功能', price: 18000, description: '社交电商' },
        { id: 'adv-flash', name: '秒杀系统', price: 25000, description: '限时抢购' },
        { id: 'adv-live', name: '直播带货', price: 50000, description: '直播购物功能' },
        { id: 'adv-ai', name: 'AI推荐引擎', price: 60000, description: '机器学习推荐' },
      ],
    },
  },
  {
    id: 'native-app',
    name: '原生APP',
    icon: '📱',
    basePrice: { min: 180000, max: 650000 },
    description: 'iOS/Android原生应用',
    options: {
      platforms: [
        { id: 'platform-ios', name: '仅iOS', price: 180000, description: 'iPhone/iPad应用' },
        { id: 'platform-android', name: '仅Android', price: 180000, description: 'Android应用' },
        { id: 'platform-both', name: 'iOS + Android', price: 320000, description: '双平台开发' },
        { id: 'platform-tablet', name: '平板适配', price: 30000, description: 'iPad/平板优化' },
      ],
      features: [
        { id: 'feat-map', name: '地图定位', price: 15000, description: 'GPS定位功能' },
        { id: 'feat-camera', name: '相机/相册', price: 12000, description: '拍照上传功能' },
        { id: 'feat-scan', name: '扫码功能', price: 6000, description: '二维码扫描' },
        { id: 'feat-payment', name: '支付集成', price: 12000, description: '每个支付方式' },
        { id: 'feat-share', name: '分享功能', price: 6000, description: '社交分享' },
        { id: 'feat-im', name: '即时通讯', price: 45000, description: '聊天功能' },
        { id: 'feat-call', name: '音视频通话', price: 65000, description: '实时通话' },
      ],
      advanced: [
        { id: 'adv-offline', name: '离线功能', price: 20000, description: '离线数据缓存' },
        { id: 'adv-ar', name: 'AR功能', price: 50000, description: '增强现实' },
        { id: 'adv-ai', name: 'AI识别', price: 40000, description: '图像/语音识别' },
        { id: 'adv-iot', name: 'IoT集成', price: 65000, description: '智能硬件对接' },
      ],
    },
  },
  {
    id: 'cross-platform-app',
    name: '跨平台APP',
    icon: '📲',
    basePrice: { min: 120000, max: 450000 },
    description: 'React Native/Flutter应用',
    options: {
      tech: [
        { id: 'tech-rn', name: 'React Native', price: 120000, description: 'Facebook框架' },
        { id: 'tech-flutter', name: 'Flutter', price: 120000, description: 'Google框架' },
        { id: 'tech-uniapp', name: 'Uni-app', price: 100000, description: '国产框架' },
      ],
      features: [
        { id: 'feat-basic', name: '基础功能', price: 0, description: '用户系统、推送等' },
        { id: 'feat-map', name: '地图定位', price: 12000, description: 'GPS定位' },
        { id: 'feat-payment', name: '支付集成', price: 10000, description: '支付功能' },
        { id: 'feat-share', name: '分享功能', price: 5000, description: '社交分享' },
        { id: 'feat-im', name: '即时通讯', price: 40000, description: '聊天功能' },
      ],
      advanced: [
        { id: 'adv-optimize', name: '深度优化', price: 30000, description: '性能优化' },
        { id: 'adv-native', name: '原生模块', price: 45000, description: '原生功能开发' },
      ],
    },
  },
  {
    id: 'miniprogram',
    name: '小程序',
    icon: '💬',
    basePrice: { min: 45000, max: 180000 },
    description: '微信/支付宝小程序',
    options: {
      platforms: [
        { id: 'platform-wechat', name: '微信小程序', price: 45000, description: '微信生态' },
        { id: 'platform-alipay', name: '支付宝小程序', price: 45000, description: '支付宝生态' },
        { id: 'platform-douyin', name: '抖音小程序', price: 45000, description: '抖音生态' },
        { id: 'platform-multi', name: '多平台', price: 15000, description: '每增加一个平台' },
      ],
      features: [
        { id: 'feat-payment', name: '支付功能', price: 12000, description: '在线支付' },
        { id: 'feat-template', name: '模板消息', price: 5000, description: '消息推送' },
        { id: 'feat-service', name: '客服功能', price: 6000, description: '在线客服' },
        { id: 'feat-live', name: '直播功能', price: 35000, description: '小程序直播' },
      ],
    },
  },
  {
    id: 'ui-design',
    name: 'UI/UX设计',
    icon: '🎨',
    basePrice: { min: 30000, max: 180000 },
    description: '界面设计、用户体验',
    options: {
      pages: [
        { id: 'pages-5', name: '5页以内', price: 30000, description: '网站设计' },
        { id: 'pages-10', name: '6-10页', price: 55000, description: '网站设计' },
        { id: 'pages-20', name: '11-20页', price: 75000, description: '网站设计' },
        { id: 'pages-app-10', name: 'APP 10页', price: 55000, description: 'APP设计' },
        { id: 'pages-app-20', name: 'APP 20页', price: 90000, description: 'APP设计' },
        { id: 'pages-app-30', name: 'APP 30页', price: 130000, description: 'APP设计' },
      ],
      features: [
        { id: 'feat-wireframe', name: '线框图', price: 12000, description: '原型设计' },
        { id: 'feat-prototype', name: '交互原型', price: 18000, description: '可点击原型' },
        { id: 'feat-system', name: '设计系统', price: 25000, description: '组件库规范' },
        { id: 'feat-illustration', name: '定制插画', price: 18000, description: '原创插画' },
        { id: 'feat-3d', name: '3D元素', price: 25000, description: '3D设计' },
        { id: 'feat-animation', name: '动效设计', price: 15000, description: '动画效果' },
      ],
    },
  },
];

// 获取服务类别
export const getServiceCategory = (id: string): ServiceCategory | undefined => {
  return pricingData.find(cat => cat.id === id);
};

// 计算总价
export const calculateTotal = (
  categoryId: string,
  selectedOptions: { [key: string]: string[] }
): number => {
  const category = getServiceCategory(categoryId);
  if (!category) return 0;

  let total = 0;
  
  // 遍历所有选项组
  Object.entries(selectedOptions).forEach(([groupKey, optionIds]) => {
    const optionGroup = category.options[groupKey as keyof typeof category.options];
    if (!optionGroup) return;

    optionIds.forEach(optionId => {
      const option = optionGroup.find(opt => opt.id === optionId);
      if (option) {
        total += option.price;
      }
    });
  });

  return total;
};
