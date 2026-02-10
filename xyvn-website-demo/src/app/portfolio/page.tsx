'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ExternalLink, Calendar, Tag, TrendingUp, Award, Users, Sparkles, Eye, Heart, Star, Grid3x3, List, SortAsc, Download, Share2, Bookmark, Play, Image as ImageIcon, Code, Zap, Target, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import PortfolioSectionEnhanced from '@/components/sections/PortfolioSectionEnhanced';
import StatsSection from '@/components/sections/StatsSection';
import TestimonialsSectionEnhanced from '@/components/sections/TestimonialsSectionEnhanced';
import CTASection from '@/components/sections/CTASection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { portfolioProjects, Project } from '@/data/portfolioData';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'name'>('latest');
  const [likedProjects, setLikedProjects] = useState<number[]>([]);
  const [bookmarkedProjects, setBookmarkedProjects] = useState<number[]>([]);

  const categories = ['全部', '电商平台', '企业官网', '教育平台', '金融科技', '社交应用', '工具应用'];

  // 映射分类
  const categoryMap: Record<string, string> = {
    '电商平台': 'ecommerce',
    '企业官网': 'enterprise',
    '教育平台': 'website',
    '金融科技': 'app',
  };

  // 筛选和排序
  let filteredProjects = portfolioProjects.filter((project: Project) => {
    const matchesCategory = selectedCategory === '全部' || 
      project.category === categoryMap[selectedCategory] ||
      project.industry.includes(selectedCategory);
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 排序
  if (sortBy === 'latest') {
    filteredProjects = [...filteredProjects].sort((a, b) => b.year.localeCompare(a.year));
  } else if (sortBy === 'popular') {
    filteredProjects = [...filteredProjects].sort((a, b) => b.id - a.id);
  } else if (sortBy === 'name') {
    filteredProjects = [...filteredProjects].sort((a, b) => a.title.localeCompare(b.title));
  }

  const toggleLike = (projectId: number) => {
    setLikedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const toggleBookmark = (projectId: number) => {
    setBookmarkedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const stats = [
    { icon: Award, label: '获奖项目', value: '12+', color: 'from-blue-500 to-cyan-500' },
    { icon: Users, label: '服务客户', value: '150+', color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, label: '项目成功率', value: '98%', color: 'from-green-500 to-emerald-500' },
    { icon: Star, label: '客户评分', value: '4.9', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                我们的
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {' '}精彩作品
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                为各行业客户创造的卓越数字产品
                <br />
                每一个项目都是我们专业能力的体现
              </p>

              {/* 统计数据 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Projects Carousel */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-6"
              >
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-blue-400 text-sm font-medium">精选案例</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                明星项目
              </h2>
              <p className="text-xl text-gray-400">
                最具代表性的成功案例
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolioProjects.slice(0, 2).map((project: Project, index: number) => (
                <ScrollReveal key={project.id} delay={index * 0.2}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedProject(project)}
                    className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden cursor-pointer group"
                  >
                    {/* 背景装饰 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* 内容 */}
                    <div className="relative p-8">
                      {/* 标签组 */}
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full">
                          精选
                        </span>
                        <span className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-medium rounded-full">
                          {project.year}
                        </span>
                        <span className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-medium rounded-full">
                          {project.category}
                        </span>
                      </div>

                      {/* 项目图标 */}
                      <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        {project.category === 'ecommerce' ? '🛍️' : 
                         project.category === 'app' ? '📱' : 
                         project.category === 'enterprise' ? '🏢' : '🌐'}
                      </div>

                      {/* 标题和描述 */}
                      <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* 关键指标 */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                              {metric.value}
                            </div>
                            <div className="text-xs text-gray-500">{metric.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* 技术标签 */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.slice(0, 4).map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* 查看按钮 */}
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 group-hover:gap-3">
                        查看详情
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* 装饰元素 */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/20 to-orange-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-10 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* 搜索栏和视图切换 */}
            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索项目名称、描述、标签..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>

              {/* 视图切换和排序 */}
              <div className="flex gap-2">
                <div className="flex bg-white/5 border border-white/10 rounded-full p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-full transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-blue-500 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-full transition-all ${
                      viewMode === 'list' 
                        ? 'bg-blue-500 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all cursor-pointer"
                >
                  <option value="latest">最新项目</option>
                  <option value="popular">最受欢迎</option>
                  <option value="name">按名称</option>
                </select>
              </div>
            </div>

            {/* 分类筛选 */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Filter className="w-4 h-4" />
                <span>筛选：</span>
              </div>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* 结果统计 */}
            <div className="text-center text-gray-400 text-sm">
              找到 <span className="text-blue-400 font-medium">{filteredProjects.length}</span> 个项目
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid/List */}
      <section className="py-10 relative">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery + viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
                : "space-y-6 max-w-5xl mx-auto"
              }
            >
              {filteredProjects.map((project: Project, index: number) => (
                viewMode === 'grid' ? (
                  // Grid View
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/10 transition-all group relative"
                  >
                    {/* 项目图片 */}
                    <div 
                      onClick={() => setSelectedProject(project)}
                      className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden"
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-6xl">
                        {project.category === 'ecommerce' ? '🛍️' : 
                         project.category === 'app' ? '📱' : 
                         project.category === 'enterprise' ? '🏢' : '🌐'}
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                        >
                          <Eye className="w-5 h-5 text-white" />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                        >
                          <Play className="w-5 h-5 text-white" />
                        </motion.div>
                      </div>
                      {/* 分类标签 */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        {project.category}
                      </div>
                      {/* 年份标签 */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        {project.year}
                      </div>
                    </div>

                    {/* 项目信息 */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 
                          onClick={() => setSelectedProject(project)}
                          className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors flex-1"
                        >
                          {project.title}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(project.id);
                          }}
                          className="ml-2"
                        >
                          <Bookmark 
                            className={`w-5 h-5 transition-all ${
                              bookmarkedProjects.includes(project.id)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-400 hover:text-yellow-400'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* 标签 */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs text-gray-500">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* 底部信息 */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>1.2k</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(project.id);
                            }}
                            className="flex items-center gap-1 hover:text-red-400 transition-colors"
                          >
                            <Heart 
                              className={`w-3 h-3 ${
                                likedProjects.includes(project.id) 
                                  ? 'fill-red-400 text-red-400' 
                                  : ''
                              }`}
                            />
                            <span>{89 + (likedProjects.includes(project.id) ? 1 : 0)}</span>
                          </button>
                        </div>
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                        >
                          查看详情
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // List View
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all group"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* 左侧图片 */}
                      <div 
                        onClick={() => setSelectedProject(project)}
                        className="relative w-full md:w-64 h-48 md:h-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 cursor-pointer flex-shrink-0"
                      >
                        <div className="absolute inset-0 flex items-center justify-center text-6xl">
                          {project.category === 'ecommerce' ? '🛍️' : 
                           project.category === 'app' ? '📱' : 
                           project.category === 'enterprise' ? '🏢' : '🌐'}
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                          {project.category}
                        </div>
                      </div>

                      {/* 右侧内容 */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 
                                onClick={() => setSelectedProject(project)}
                                className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer"
                              >
                                {project.title}
                              </h3>
                              <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
                                {project.year}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(project.id);
                            }}
                            className="ml-4"
                          >
                            <Bookmark 
                              className={`w-5 h-5 transition-all ${
                                bookmarkedProjects.includes(project.id)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-400 hover:text-yellow-400'
                              }`}
                            />
                          </button>
                        </div>

                        {/* 标签 */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* 底部信息 */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              <span>1.2k 浏览</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLike(project.id);
                              }}
                              className="flex items-center gap-2 hover:text-red-400 transition-colors"
                            >
                              <Heart 
                                className={`w-4 h-4 ${
                                  likedProjects.includes(project.id) 
                                    ? 'fill-red-400 text-red-400' 
                                    : ''
                                }`}
                              />
                              <span>{89 + (likedProjects.includes(project.id) ? 1 : 0)} 点赞</span>
                            </button>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{project.duration}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => setSelectedProject(project)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2"
                          >
                            查看详情
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </motion.div>
          </AnimatePresence>

          {/* 空状态 */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">未找到相关项目</h3>
              <p className="text-gray-400 mb-6">试试其他关键词或分类</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('全部');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
              >
                重置筛选
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* 头部 */}
              <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-white/10 p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">
                    {selectedProject.category === 'ecommerce' ? '🛍️' : 
                     selectedProject.category === 'app' ? '📱' : 
                     selectedProject.category === 'enterprise' ? '🏢' : '🌐'}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-400">{selectedProject.category}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-sm text-gray-400">{selectedProject.year}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-sm text-gray-400">{selectedProject.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(selectedProject.id);
                    }}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        likedProjects.includes(selectedProject.id)
                          ? 'fill-red-400 text-red-400'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(selectedProject.id);
                    }}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                  >
                    <Bookmark 
                      className={`w-5 h-5 ${
                        bookmarkedProjects.includes(selectedProject.id)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                  >
                    <Share2 className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* 内容 */}
              <div className="p-8">
                {/* 客户信息 */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">客户</div>
                      <div className="text-white font-medium">{selectedProject.client}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">行业</div>
                      <div className="text-white font-medium">{selectedProject.industry}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">年份</div>
                      <div className="text-white font-medium">{selectedProject.year}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">周期</div>
                      <div className="text-white font-medium">{selectedProject.duration}</div>
                    </div>
                  </div>
                </div>

                {/* 项目描述 */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">项目介绍</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* 挑战、解决方案、成果 */}
                {(selectedProject.challenge || selectedProject.solution || selectedProject.results) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {selectedProject.challenge && (
                      <div className="bg-white/5 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Zap className="w-5 h-5 text-orange-400" />
                          <h4 className="font-bold text-white">挑战</h4>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {selectedProject.challenge}
                        </p>
                      </div>
                    )}
                    {selectedProject.solution && (
                      <div className="bg-white/5 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Code className="w-5 h-5 text-blue-400" />
                          <h4 className="font-bold text-white">解决方案</h4>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {selectedProject.solution}
                        </p>
                      </div>
                    )}
                    {selectedProject.results && (
                      <div className="bg-white/5 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <h4 className="font-bold text-white">成果</h4>
                        </div>
                        <ul className="space-y-2">
                          {selectedProject.results.map((result: string, idx: number) => (
                            <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                              <span className="text-green-400 mt-0.5">✓</span>
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* 项目亮点 */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">项目亮点</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="text-gray-300 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 技术栈 */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">技术栈</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 项目数据 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">1.2k</div>
                    <div className="text-xs text-gray-400">浏览量</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">
                      {89 + (likedProjects.includes(selectedProject.id) ? 1 : 0)}
                    </div>
                    <div className="text-xs text-gray-400">点赞数</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">4.8</div>
                    <div className="text-xs text-gray-400">评分</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400 mb-1">
                      {bookmarkedProjects.includes(selectedProject.id) ? '已收藏' : '未收藏'}
                    </div>
                    <div className="text-xs text-gray-400">收藏状态</div>
                  </div>
                </div>

                {/* 行动按钮 */}
                <div className="flex justify-center">
                  <button 
                    onClick={() => {
                      setSelectedProject(null);
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                  >
                    联系我们
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Industry Insights */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                行业分布
              </h2>
              <p className="text-xl text-gray-400">
                我们服务的行业领域
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: '零售电商', count: 25, icon: '🛍️', color: 'from-blue-500 to-cyan-500' },
              { name: '企业服务', count: 30, icon: '🏢', color: 'from-purple-500 to-pink-500' },
              { name: '教育培训', count: 20, icon: '📚', color: 'from-green-500 to-emerald-500' },
              { name: '金融科技', count: 15, icon: '💰', color: 'from-orange-500 to-red-500' },
              { name: '医疗健康', count: 18, icon: '🏥', color: 'from-pink-500 to-rose-500' },
              { name: '社交娱乐', count: 22, icon: '🎮', color: 'from-indigo-500 to-purple-500' },
              { name: '生活服务', count: 28, icon: '🏠', color: 'from-teal-500 to-cyan-500' },
              { name: '其他行业', count: 12, icon: '✨', color: 'from-yellow-500 to-orange-500' },
            ].map((industry, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="text-5xl mb-3">{industry.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{industry.name}</h3>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${industry.color} bg-clip-text text-transparent`}>
                    {industry.count}+
                  </div>
                  <p className="text-xs text-gray-500 mt-1">成功案例</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                技术能力
              </h2>
              <p className="text-xl text-gray-400">
                我们擅长的技术栈
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  category: '前端技术',
                  icon: '🎨',
                  color: 'from-blue-500 to-cyan-500',
                  techs: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                },
                {
                  category: '后端技术',
                  icon: '⚙️',
                  color: 'from-purple-500 to-pink-500',
                  techs: ['Node.js', 'Python', 'Java', 'Go', 'GraphQL', 'REST API'],
                },
                {
                  category: '移动开发',
                  icon: '📱',
                  color: 'from-green-500 to-emerald-500',
                  techs: ['React Native', 'Flutter', 'Swift', 'Kotlin', '微信小程序', 'uni-app'],
                },
                {
                  category: '数据库',
                  icon: '💾',
                  color: 'from-orange-500 to-red-500',
                  techs: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Firebase', 'Supabase'],
                },
                {
                  category: '云服务',
                  icon: '☁️',
                  color: 'from-pink-500 to-rose-500',
                  techs: ['AWS', 'Vercel', 'Docker', 'Kubernetes', 'CI/CD', 'Serverless'],
                },
                {
                  category: 'AI & 数据',
                  icon: '🤖',
                  color: 'from-indigo-500 to-purple-500',
                  techs: ['TensorFlow', 'PyTorch', 'OpenAI', 'Data Analytics', 'ML Models', 'NLP'],
                },
              ].map((stack, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stack.color} flex items-center justify-center text-2xl`}>
                        {stack.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{stack.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stack.techs.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 hover:bg-white/10 hover:text-white transition-all cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                项目成果
              </h2>
              <p className="text-xl text-gray-400">
                用数据说话的成功案例
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {[
              { label: '平均转化率提升', value: '180%', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
              { label: '用户满意度', value: '96%', icon: Award, color: 'from-purple-500 to-pink-500' },
              { label: '平均开发周期', value: '6周', icon: Calendar, color: 'from-green-500 to-emerald-500' },
              { label: '项目成功率', value: '98%', icon: CheckCircle2, color: 'from-orange-500 to-red-500' },
            ].map((metric, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mx-auto mb-4`}>
                    <metric.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-2`}>
                    {metric.value}
                  </div>
                  <p className="text-sm text-gray-400">{metric.label}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Case Studies Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: '电商平台案例',
                metric: 'GMV 增长 300%',
                desc: '通过优化用户体验和推荐算法，帮助客户实现销售额三倍增长',
                icon: '📈',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                title: '企业 SaaS 案例',
                metric: '效率提升 250%',
                desc: '自动化工作流程，减少人工操作，大幅提升团队协作效率',
                icon: '⚡',
                color: 'from-purple-500 to-pink-500',
              },
              {
                title: '移动应用案例',
                metric: '用户留存 85%',
                desc: '精心设计的用户体验和功能，实现行业领先的用户留存率',
                icon: '🎯',
                color: 'from-green-500 to-emerald-500',
              },
            ].map((highlight, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
                >
                  <div className="text-4xl mb-4">{highlight.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{highlight.title}</h3>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${highlight.color} bg-clip-text text-transparent mb-3`}>
                    {highlight.metric}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{highlight.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      {/* Awards & Recognition */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                荣誉与认证
              </h2>
              <p className="text-xl text-gray-400">
                专业能力获得行业认可
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: '最佳设计奖',
                year: '2024',
                org: 'Awwwards',
                icon: '🏆',
                color: 'from-yellow-500 to-orange-500',
              },
              {
                title: '技术创新奖',
                year: '2024',
                org: 'Tech Innovation',
                icon: '🚀',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                title: '用户体验奖',
                year: '2023',
                org: 'UX Design Awards',
                icon: '⭐',
                color: 'from-purple-500 to-pink-500',
              },
              {
                title: '最佳团队奖',
                year: '2023',
                org: 'Developer Awards',
                icon: '👥',
                color: 'from-green-500 to-emerald-500',
              },
            ].map((award, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10, rotate: 2 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all"
                >
                  <div className="text-5xl mb-4">{award.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{award.title}</h3>
                  <div className={`text-sm font-medium bg-gradient-to-r ${award.color} bg-clip-text text-transparent mb-1`}>
                    {award.org}
                  </div>
                  <p className="text-xs text-gray-500">{award.year}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process Showcase */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                我们的工作流程
              </h2>
              <p className="text-xl text-gray-400">
                从构思到交付的完整流程
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: '需求分析',
                  desc: '深入了解客户需求和业务目标',
                  icon: '🎯',
                  color: 'from-blue-500 to-cyan-500',
                  items: ['用户研究', '竞品分析', '需求文档', '项目规划'],
                },
                {
                  step: '02',
                  title: '设计阶段',
                  desc: '创造性的设计解决方案',
                  icon: '🎨',
                  color: 'from-purple-500 to-pink-500',
                  items: ['原型设计', '视觉设计', '交互设计', '设计评审'],
                },
                {
                  step: '03',
                  title: '开发实现',
                  desc: '高质量的代码实现',
                  icon: '⚙️',
                  color: 'from-green-500 to-emerald-500',
                  items: ['前端开发', '后端开发', '测试调试', '性能优化'],
                },
                {
                  step: '04',
                  title: '上线维护',
                  desc: '持续优化和技术支持',
                  icon: '🚀',
                  color: 'from-orange-500 to-red-500',
                  items: ['部署上线', '数据监控', '用户反馈', '持续迭代'],
                },
              ].map((process, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
                  >
                    {/* 步骤编号 */}
                    <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br ${process.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {process.step}
                    </div>

                    {/* 图标 */}
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                      {process.icon}
                    </div>

                    {/* 标题和描述 */}
                    <h3 className="text-xl font-bold text-white mb-2">{process.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{process.desc}</p>

                    {/* 详细项目 */}
                    <ul className="space-y-2">
                      {process.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${process.color}`} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* 连接线 */}
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
                    )}
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                发展历程
              </h2>
              <p className="text-xl text-gray-400">
                我们的成长轨迹
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* 时间线 */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block" />

              {/* 里程碑 */}
              <div className="space-y-12">
                {[
                  {
                    year: '2020',
                    title: '公司成立',
                    desc: '在深圳成立，专注于数字产品开发',
                    icon: '🎉',
                    stats: ['5人团队', '首个项目'],
                    color: 'from-blue-500 to-cyan-500',
                  },
                  {
                    year: '2021',
                    title: '快速成长',
                    desc: '团队扩展，服务客户突破50家',
                    icon: '📈',
                    stats: ['20人团队', '50+ 客户'],
                    color: 'from-purple-500 to-pink-500',
                  },
                  {
                    year: '2022',
                    title: '业务拓展',
                    desc: '开设北京、上海分部，获得多项行业奖项',
                    icon: '🏆',
                    stats: ['3个办公室', '100+ 项目'],
                    color: 'from-green-500 to-emerald-500',
                  },
                  {
                    year: '2023',
                    title: '技术创新',
                    desc: '引入AI技术，推出智能化解决方案',
                    icon: '🤖',
                    stats: ['50人团队', '150+ 客户'],
                    color: 'from-orange-500 to-red-500',
                  },
                  {
                    year: '2024',
                    title: '行业领先',
                    desc: '成为行业标杆，服务世界500强企业',
                    icon: '⭐',
                    stats: ['80人团队', '200+ 项目'],
                    color: 'from-pink-500 to-rose-500',
                  },
                ].map((milestone, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`relative flex flex-col md:flex-row items-center gap-8 ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* 内容卡片 */}
                      <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-4xl">{milestone.icon}</div>
                          <div>
                            <div className={`text-2xl font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                              {milestone.year}
                            </div>
                            <h3 className="text-xl font-bold text-white">{milestone.title}</h3>
                          </div>
                        </div>
                        <p className="text-gray-400 mb-4">{milestone.desc}</p>
                        <div className="flex gap-3">
                          {milestone.stats.map((stat, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400"
                            >
                              {stat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 中心点 */}
                      <div className={`hidden md:flex w-12 h-12 rounded-full bg-gradient-to-br ${milestone.color} items-center justify-center text-white font-bold shadow-lg z-10`}>
                        {index + 1}
                      </div>

                      {/* 占位 */}
                      <div className="flex-1 hidden md:block" />
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Expertise */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                团队专长
              </h2>
              <p className="text-xl text-gray-400">
                多领域专家组成的精英团队
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  role: 'UI/UX 设计师',
                  count: 15,
                  icon: '🎨',
                  color: 'from-pink-500 to-rose-500',
                  skills: ['用户研究', '交互设计', '视觉设计', '原型制作'],
                  experience: '平均 6 年经验',
                },
                {
                  role: '前端工程师',
                  count: 20,
                  icon: '💻',
                  color: 'from-blue-500 to-cyan-500',
                  skills: ['React/Vue', 'TypeScript', '响应式设计', '性能优化'],
                  experience: '平均 7 年经验',
                },
                {
                  role: '后端工程师',
                  count: 18,
                  icon: '⚙️',
                  color: 'from-green-500 to-emerald-500',
                  skills: ['Node.js', 'Python', '数据库设计', 'API开发'],
                  experience: '平均 8 年经验',
                },
                {
                  role: '移动开发工程师',
                  count: 12,
                  icon: '📱',
                  color: 'from-purple-500 to-pink-500',
                  skills: ['React Native', 'Flutter', 'iOS/Android', '小程序'],
                  experience: '平均 6 年经验',
                },
                {
                  role: '产品经理',
                  count: 8,
                  icon: '📊',
                  color: 'from-orange-500 to-red-500',
                  skills: ['需求分析', '产品规划', '项目管理', '数据分析'],
                  experience: '平均 9 年经验',
                },
                {
                  role: 'QA 测试工程师',
                  count: 7,
                  icon: '🔍',
                  color: 'from-indigo-500 to-purple-500',
                  skills: ['功能测试', '自动化测试', '性能测试', '安全测试'],
                  experience: '平均 5 年经验',
                },
              ].map((team, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
                  >
                    {/* 头部 */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${team.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                        {team.icon}
                      </div>
                      <div className={`text-3xl font-bold bg-gradient-to-r ${team.color} bg-clip-text text-transparent`}>
                        {team.count}+
                      </div>
                    </div>

                    {/* 角色 */}
                    <h3 className="text-xl font-bold text-white mb-2">{team.role}</h3>
                    <p className="text-sm text-gray-500 mb-4">{team.experience}</p>

                    {/* 技能 */}
                    <div className="space-y-2">
                      {team.skills.map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${team.color}`} />
                          <span className="text-sm text-gray-400">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <TestimonialsSectionEnhanced />
      <CTASection />
    </>
  );
}
