'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { 
  Code2, 
  Smartphone, 
  Database, 
  Cloud, 
  Zap, 
  Shield,
  Layers,
  GitBranch
} from 'lucide-react';

export default function TechStackSectionEnhanced() {
  const categories = [
    {
      icon: Code2,
      title: '前端技术',
      color: 'from-blue-500 to-cyan-500',
      techs: [
        { name: 'React', level: 95, logo: '⚛️' },
        { name: 'Next.js', level: 90, logo: '▲' },
        { name: 'Vue.js', level: 88, logo: '💚' },
        { name: 'TypeScript', level: 92, logo: '📘' },
        { name: 'Tailwind CSS', level: 95, logo: '🎨' },
      ],
    },
    {
      icon: Smartphone,
      title: '移动开发',
      color: 'from-purple-500 to-pink-500',
      techs: [
        { name: 'React Native', level: 90, logo: '📱' },
        { name: 'Flutter', level: 85, logo: '🦋' },
        { name: '微信小程序', level: 88, logo: '💬' },
        { name: 'Uni-app', level: 82, logo: '🔷' },
        { name: 'Taro', level: 80, logo: '🥟' },
      ],
    },
    {
      icon: Database,
      title: '后端技术',
      color: 'from-green-500 to-emerald-500',
      techs: [
        { name: 'Node.js', level: 93, logo: '🟢' },
        { name: 'Python', level: 88, logo: '🐍' },
        { name: 'Java', level: 85, logo: '☕' },
        { name: 'Go', level: 82, logo: '🔵' },
        { name: 'GraphQL', level: 87, logo: '◆' },
      ],
    },
    {
      icon: Cloud,
      title: '数据库',
      color: 'from-orange-500 to-red-500',
      techs: [
        { name: 'PostgreSQL', level: 90, logo: '🐘' },
        { name: 'MongoDB', level: 92, logo: '🍃' },
        { name: 'Redis', level: 88, logo: '🔴' },
        { name: 'MySQL', level: 85, logo: '🐬' },
        { name: 'Firebase', level: 83, logo: '🔥' },
      ],
    },
    {
      icon: Zap,
      title: '云服务',
      color: 'from-yellow-500 to-orange-500',
      techs: [
        { name: 'AWS', level: 88, logo: '☁️' },
        { name: 'Vercel', level: 92, logo: '▲' },
        { name: 'Docker', level: 90, logo: '🐳' },
        { name: 'Kubernetes', level: 82, logo: '☸️' },
        { name: 'Nginx', level: 85, logo: '🟩' },
      ],
    },
    {
      icon: Shield,
      title: 'AI & 数据',
      color: 'from-indigo-500 to-purple-500',
      techs: [
        { name: 'TensorFlow', level: 80, logo: '🧠' },
        { name: 'OpenAI', level: 85, logo: '🤖' },
        { name: 'D3.js', level: 88, logo: '📊' },
        { name: 'WebGL', level: 78, logo: '🎮' },
        { name: 'Three.js', level: 82, logo: '🎲' },
      ],
    },
  ];

  const tools = [
    { name: 'Git', icon: GitBranch },
    { name: 'VS Code', icon: Code2 },
    { name: 'Figma', icon: Layers },
    { name: 'Postman', icon: Zap },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* 背景网格 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4"
            >
              <span className="text-blue-400 text-sm font-medium">技术栈</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              掌握前沿技术
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              使用业界领先的技术栈，为您打造高性能、可扩展的解决方案
            </p>
          </div>
        </ScrollReveal>

        {/* 技术分类网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
              >
                {/* 图标和标题 */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>

                {/* 技术列表 */}
                <div className="space-y-4">
                  {category.techs.map((tech, techIdx) => (
                    <div key={techIdx}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{tech.logo}</span>
                          <span className="text-sm font-medium text-gray-300">
                            {tech.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{tech.level}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: techIdx * 0.1 }}
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* 开发工具 */}
        <ScrollReveal delay={0.4}>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-8">开发工具</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {tools.map((tool, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 transition-all cursor-pointer"
                >
                  <tool.icon className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300 font-medium">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 技术优势 */}
        <ScrollReveal delay={0.5}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: '持续学习',
                desc: '紧跟技术趋势，不断更新技术栈',
                icon: '📚',
              },
              {
                title: '最佳实践',
                desc: '遵循行业标准，确保代码质量',
                icon: '✨',
              },
              {
                title: '性能优化',
                desc: '注重性能，打造极致用户体验',
                icon: '⚡',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
