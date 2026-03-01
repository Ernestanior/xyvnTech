export interface Project {
  id: number;
  title: string;
  category: 'website' | 'app' | 'ecommerce' | 'enterprise';
  client: string;
  description: string;
  image: string;
  tags: string[];
  metrics: {
    icon: string;
    label: string;
    value: string;
  }[];
  highlights: string[];
  year: string;
  duration: string;
  industry: string;
  challenge?: string;
  solution?: string;
  results?: string[];
}

export const portfolioProjects: Project[] = [
  {
    id: 1,
    title: '智慧零售电商平台',
    category: 'ecommerce',
    client: '某知名零售品牌',
    industry: '零售电商',
    description: '打造全渠道智慧零售解决方案，整合线上线下购物体验，实现库存实时同步和智能推荐系统。',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1200&q=80',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis'],
    metrics: [
      { icon: 'TrendingUp', label: '转化率提升', value: '230%' },
      { icon: 'Users', label: '日活用户', value: '50万+' },
      { icon: 'Award', label: '用户满意度', value: '99%' },
    ],
    highlights: [
      '实时库存管理系统',
      'AI 智能推荐引擎',
      '多端数据同步',
      '高并发架构设计',
    ],
    year: '2025',
    duration: '6个月',
    challenge: '客户需要整合线上线下渠道，实现库存实时同步，并提供个性化购物体验。',
    solution: '采用微服务架构，使用 Redis 实现实时库存同步，基于用户行为数据构建推荐系统。',
    results: [
      '转化率提升 230%',
      '库存周转率提高 150%',
      '用户复购率达到 65%',
      '系统响应时间 < 200ms',
    ],
  },
  {
    id: 2,
    title: '企业级 SaaS 管理平台',
    category: 'enterprise',
    client: '某上市科技公司',
    industry: '企业服务',
    description: '为企业提供一站式项目管理、团队协作和数据分析解决方案，支持10万+企业用户同时在线。',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'Docker'],
    metrics: [
      { icon: 'Users', label: '企业用户', value: '10万+' },
      { icon: 'TrendingUp', label: '效率提升', value: '180%' },
      { icon: 'Award', label: '系统稳定性', value: '99.9%' },
    ],
    highlights: [
      '微服务架构',
      '实时协作功能',
      '数据可视化看板',
      '权限管理系统',
    ],
    year: '2025',
    duration: '8个月',
  },
  {
    id: 3,
    title: '智能健身 APP',
    category: 'app',
    client: '某健身连锁品牌',
    industry: '健康运动',
    description: '结合 AI 技术的智能健身应用，提供个性化训练计划、实时动作识别和社交互动功能。',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80',
    tags: ['React Native', 'TensorFlow', 'Firebase', 'GraphQL'],
    metrics: [
      { icon: 'Users', label: '活跃用户', value: '100万+' },
      { icon: 'TrendingUp', label: '用户留存', value: '85%' },
      { icon: 'Award', label: 'App Store评分', value: '4.8' },
    ],
    highlights: [
      'AI 动作识别',
      '个性化训练计划',
      '社交互动功能',
      '数据统计分析',
    ],
    year: '2025',
    duration: '5个月',
  },
  {
    id: 4,
    title: '在线教育平台',
    category: 'website',
    client: '某知名教育机构',
    industry: '在线教育',
    description: '打造沉浸式在线学习体验，支持直播互动、作业批改、学习进度追踪等完整教学闭环。',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=80',
    tags: ['Next.js', 'WebRTC', 'AWS', 'Tailwind CSS'],
    metrics: [
      { icon: 'Users', label: '注册学员', value: '50万+' },
      { icon: 'TrendingUp', label: '完课率', value: '92%' },
      { icon: 'Award', label: '满意度', value: '96%' },
    ],
    highlights: [
      '实时视频互动',
      '智能作业批改',
      '学习路径规划',
      '多端同步学习',
    ],
    year: '2025',
    duration: '7个月',
  },
  {
    id: 5,
    title: '金融科技 APP',
    category: 'app',
    client: '某金融科技公司',
    industry: '金融科技',
    description: '安全可靠的移动金融服务平台，提供投资理财、账户管理、数据分析等一站式金融服务。',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80',
    tags: ['Flutter', 'Kotlin', 'Swift', 'Blockchain'],
    metrics: [
      { icon: 'Users', label: '用户数', value: '200万+' },
      { icon: 'TrendingUp', label: '交易量', value: '50亿+' },
      { icon: 'Award', label: '安全等级', value: 'AAA' },
    ],
    highlights: [
      '银行级安全加密',
      '实时行情推送',
      '智能投资建议',
      '多重身份验证',
    ],
    year: '2024',
    duration: '10个月',
  },
  {
    id: 6,
    title: '智慧医疗平台',
    category: 'enterprise',
    client: '某三甲医院',
    industry: '医疗健康',
    description: '整合医院信息系统，实现在线问诊、预约挂号、电子病历、远程会诊等智慧医疗服务。',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    tags: ['Vue.js', 'Spring Boot', 'MySQL', 'RabbitMQ'],
    metrics: [
      { icon: 'Users', label: '服务患者', value: '100万+' },
      { icon: 'TrendingUp', label: '效率提升', value: '300%' },
      { icon: 'Award', label: '满意度', value: '95%' },
    ],
    highlights: [
      '在线问诊系统',
      '电子病历管理',
      '远程会诊功能',
      '智能导诊助手',
    ],
    year: '2024',
    duration: '12个月',
  },
  {
    id: 7,
    title: '社交电商小程序',
    category: 'ecommerce',
    client: '某新零售品牌',
    industry: '社交电商',
    description: '基于微信生态的社交电商解决方案，通过社交裂变和内容营销实现快速增长。',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80',
    tags: ['微信小程序', 'Taro', 'Node.js', 'MongoDB'],
    metrics: [
      { icon: 'Users', label: '用户数', value: '300万+' },
      { icon: 'TrendingUp', label: 'GMV', value: '5亿+' },
      { icon: 'Award', label: '复购率', value: '68%' },
    ],
    highlights: [
      '社交裂变系统',
      '直播带货功能',
      '拼团秒杀活动',
      '会员积分体系',
    ],
    year: '2024',
    duration: '4个月',
  },
  {
    id: 8,
    title: '企业官网重构',
    category: 'website',
    client: '某世界500强企业',
    industry: '企业品牌',
    description: '为国际化企业打造高端品牌官网，支持多语言、多地区，提供卓越的用户体验和SEO优化。',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    tags: ['Next.js', 'i18n', 'Strapi', 'Vercel'],
    metrics: [
      { icon: 'TrendingUp', label: 'Lighthouse', value: '98分' },
      { icon: 'Users', label: '月访问量', value: '500万+' },
      { icon: 'Award', label: 'SEO排名', value: 'Top 3' },
    ],
    highlights: [
      '多语言支持',
      'SEO深度优化',
      '无障碍访问',
      'CDN全球加速',
    ],
    year: '2024',
    duration: '5个月',
  },
];

export const getProjectsByCategory = (category: string) => {
  if (category === 'all') return portfolioProjects;
  return portfolioProjects.filter(p => p.category === category);
};

export const getProjectById = (id: number) => {
  return portfolioProjects.find(p => p.id === id);
};
