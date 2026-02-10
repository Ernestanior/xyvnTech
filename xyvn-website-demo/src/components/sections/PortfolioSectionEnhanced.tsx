'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Image from 'next/image';
import { ExternalLink, TrendingUp, Users, Award } from 'lucide-react';

export default function PortfolioSectionEnhanced() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: '全部项目' },
    { id: 'website', label: '网站开发' },
    { id: 'app', label: 'APP开发' },
    { id: 'ecommerce', label: '电商平台' },
    { id: 'enterprise', label: '企业系统' },
  ];

  const projects = [
    {
      id: 1,
      title: '智慧零售电商平台',
      category: 'ecommerce',
      client: '某知名零售品牌',
      description: '打造全渠道智慧零售解决方案，整合线上线下购物体验，实现库存实时同步和智能推荐系统。',
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1200&q=80',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis'],
      metrics: [
        { icon: TrendingUp, label: '转化率提升', value: '230%' },
        { icon: Users, label: '日活用户', value: '50万+' },
        { icon: Award, label: '用户满意度', value: '98%' },
      ],
      highlights: [
        '实时库存管理系统',
        'AI 智能推荐引擎',
        '多端数据同步',
        '高并发架构设计',
      ],
      year: '2025',
      duration: '6个月',
    },
    {
      id: 2,
      title: '企业级 SaaS 管理平台',
      category: 'enterprise',
      client: '某上市科技公司',
      description: '为企业提供一站式项目管理、团队协作和数据分析解决方案，支持10万+企业用户同时在线。',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      tags: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'Docker'],
      metrics: [
        { icon: Users, label: '企业用户', value: '10万+' },
        { icon: TrendingUp, label: '效率提升', value: '180%' },
        { icon: Award, label: '系统稳定性', value: '99.9%' },
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
      description: '结合 AI 技术的智能健身应用，提供个性化训练计划、实时动作识别和社交互动功能。',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80',
      tags: ['React Native', 'TensorFlow', 'Firebase', 'GraphQL'],
      metrics: [
        { icon: Users, label: '活跃用户', value: '100万+' },
        { icon: TrendingUp, label: '用户留存', value: '85%' },
        { icon: Award, label: 'App Store评分', value: '4.8' },
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
      description: '打造沉浸式在线学习体验，支持直播互动、作业批改、学习进度追踪等完整教学闭环。',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=80',
      tags: ['Next.js', 'WebRTC', 'AWS', 'Tailwind CSS'],
      metrics: [
        { icon: Users, label: '注册学员', value: '50万+' },
        { icon: TrendingUp, label: '完课率', value: '92%' },
        { icon: Award, label: '满意度', value: '96%' },
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
      description: '安全可靠的移动金融服务平台，提供投资理财、账户管理、数据分析等一站式金融服务。',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80',
      tags: ['Flutter', 'Kotlin', 'Swift', 'Blockchain'],
      metrics: [
        { icon: Users, label: '用户数', value: '200万+' },
        { icon: TrendingUp, label: '交易量', value: '50亿+' },
        { icon: Award, label: '安全等级', value: 'AAA' },
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
      description: '整合医院信息系统，实现在线问诊、预约挂号、电子病历、远程会诊等智慧医疗服务。',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
      tags: ['Vue.js', 'Spring Boot', 'MySQL', 'RabbitMQ'],
      metrics: [
        { icon: Users, label: '服务患者', value: '100万+' },
        { icon: TrendingUp, label: '效率提升', value: '300%' },
        { icon: Award, label: '满意度', value: '95%' },
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
      description: '基于微信生态的社交电商解决方案，通过社交裂变和内容营销实现快速增长。',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80',
      tags: ['微信小程序', 'Taro', 'Node.js', 'MongoDB'],
      metrics: [
        { icon: Users, label: '用户数', value: '300万+' },
        { icon: TrendingUp, label: 'GMV', value: '5亿+' },
        { icon: Award, label: '复购率', value: '68%' },
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
      description: '为国际化企业打造高端品牌官网，支持多语言、多地区，提供卓越的用户体验和SEO优化。',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      tags: ['Next.js', 'i18n', 'Strapi', 'Vercel'],
      metrics: [
        { icon: TrendingUp, label: 'Lighthouse', value: '98分' },
        { icon: Users, label: '月访问量', value: '500万+' },
        { icon: Award, label: 'SEO排名', value: 'Top 3' },
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

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-32 relative">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4"
            >
              <span className="text-blue-400 text-sm font-medium">成功案例</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              我们的作品
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              为各行业客户打造的优秀数字产品
            </p>
          </div>
        </ScrollReveal>

        {/* 分类筛选 */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
              >
                {/* 项目图片 */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />
                  
                  {/* 年份标签 */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-sm">
                    {project.year}
                  </div>
                </div>

                {/* 项目信息 */}
                <div className="p-8">
                  {/* 客户和分类 */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-blue-400 font-medium">
                      {project.client}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className="text-sm text-gray-500">
                      {project.duration}
                    </span>
                  </div>

                  {/* 标题 */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* 核心亮点 */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">核心亮点</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {project.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 数据指标 */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/5 rounded-xl">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <metric.icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                        <div className="text-lg font-bold text-white mb-1">
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-500">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 技术栈 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/5 text-gray-400 text-xs rounded-full border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 查看详情按钮 */}
                  <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group/btn">
                    <span>查看详情</span>
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* 悬停效果 */}
                <div className="absolute inset-0 border-2 border-blue-500/0 group-hover:border-blue-500/50 rounded-2xl transition-all pointer-events-none" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* 底部 CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              想要了解更多案例详情？
            </p>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              联系我们咨询
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
