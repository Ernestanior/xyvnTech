'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ExternalLink, Calendar, Tag, TrendingUp, Award, Users, Sparkles, Eye, Heart, Star, Grid3x3, List, SortAsc, Download, Share2, Bookmark, Play, Image as ImageIcon, Code, Zap, Target, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import PortfolioSectionEnhanced from '@/components/sections/PortfolioSectionEnhanced';
import StatsSection from '@/components/sections/StatsSection';
import CTASection from '@/components/sections/CTASection';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface Project {
  id: number;
  title: string;
  category: 'website' | 'app' | 'ecommerce' | 'enterprise';
  client: string;
  industry: string;
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
  challenge?: string;
  solution?: string;
  results?: string[];
}

export default function PortfolioPage() {
  const t = useTranslations('portfolio');
  const portfolioProjects: Project[] = t.raw('projects');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'name'>('latest');
  const [likedProjects, setLikedProjects] = useState<number[]>([]);
  const [bookmarkedProjects, setBookmarkedProjects] = useState<number[]>([]);

  const categories = ['all', 'ecommerce', 'enterprise', 'education', 'fintech', 'social', 'tools'];

  // Category mapping
  const categoryMap: Record<string, string> = {
    'ecommerce': 'ecommerce',
    'enterprise': 'enterprise',
    'education': 'website',
    'fintech': 'app',
    'social': 'social',
    'tools': 'tools',
  };

  // Filter and sort
  let filteredProjects = portfolioProjects.filter((project: Project) => {
    const matchesCategory = selectedCategory === 'all' || 
      project.category === categoryMap[selectedCategory] ||
      project.industry.includes(selectedCategory);
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting
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
    { icon: Award, label: t('stats.awards'), value: '12+', color: 'from-amber-500 to-orange-500' },
    { icon: Users, label: t('stats.clients'), value: '150+', color: 'from-orange-500 to-red-500' },
    { icon: TrendingUp, label: t('stats.successRate'), value: '99%', color: 'from-green-500 to-emerald-500' },
    { icon: Star, label: t('stats.rating'), value: '4.9', color: 'from-cyan-500 to-teal-500' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                {t('title')}
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  {' '}{t('highlight')}
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {t('subtitle')}
              </p>

              {/* Statistics */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-orange-500/5" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('featured.title')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('featured.subtitle')}
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
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Content */}
                    <div className="relative p-8">
                      {/* Tags */}
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium rounded-full">
                          {t('featured.badge')}
                        </span>
                        <span className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-medium rounded-full">
                          {project.year}
                        </span>
                        <span className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-medium rounded-full">
                          {project.category}
                        </span>
                      </div>

                      {/* Project icon */}
                      <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        {project.category === 'ecommerce' ? '🛍️' : 
                         project.category === 'app' ? '📱' : 
                         project.category === 'enterprise' ? '🏢' : '🌐'}
                      </div>

                      {/* Title and description */}
                      <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Key metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-1">
                              {metric.value}
                            </div>
                            <div className="text-xs text-gray-500">{metric.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tech tags */}
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

                      {/* View Button */}
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2 group-hover:gap-3">
                        {t('viewDetails')}
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-red-500/20 to-orange-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
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
            {/* Search Bar & View Toggle */}
            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 transition-all"
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

              {/* View Toggle & Sort */}
              <div className="flex gap-2">
                <div className="flex bg-white/5 border border-white/10 rounded-full p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-full transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-amber-500 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-full transition-all ${
                      viewMode === 'list' 
                        ? 'bg-amber-500 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:outline-none focus:border-amber-500/50 transition-all cursor-pointer"
                >
                  <option value="latest">{t('sort.latest')}</option>
                  <option value="popular">{t('sort.popular')}</option>
                  <option value="name">{t('sort.name')}</option>
                </select>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Filter className="w-4 h-4" />
                <span>{t('filter.label')}</span>
              </div>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {t(`filter.${category}`)}
                </motion.button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-center text-gray-400 text-sm">
              {t('results', { count: filteredProjects.length })}
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
                    {/* Project Image */}
                    <div 
                      onClick={() => setSelectedProject(project)}
                      className="relative h-48 bg-gradient-to-br from-amber-500/20 to-orange-500/20 overflow-hidden"
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
                      {/* Category Label */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        {project.category}
                      </div>
                      {/* Year Label */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        {project.year}
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 
                          onClick={() => setSelectedProject(project)}
                          className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors flex-1"
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

                      {/* Tags */}
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

                      {/* Bottom Info */}
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
                          className="text-amber-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                        >
                          {t('viewDetails')}
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
                      {/* Left Image */}
                      <div 
                        onClick={() => setSelectedProject(project)}
                        className="relative w-full md:w-64 h-48 md:h-auto bg-gradient-to-br from-amber-500/20 to-orange-500/20 cursor-pointer flex-shrink-0"
                      >
                        <div className="absolute inset-0 flex items-center justify-center text-6xl">
                          {project.category === 'ecommerce' ? '🛍️' : 
                           project.category === 'app' ? '📱' : 
                           project.category === 'enterprise' ? '🏢' : '🌐'}
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500/80 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                          {project.category}
                        </div>
                      </div>

                      {/* Right Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 
                                onClick={() => setSelectedProject(project)}
                                className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer"
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

                        {/* Tags */}
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

                        {/* Bottom Info */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              <span>1.2k {t('views')}</span>
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
                              <span>{89 + (likedProjects.includes(project.id) ? 1 : 0)} {t('likes')}</span>
                            </button>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{project.duration}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => setSelectedProject(project)}
                            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2"
                          >
                            {t('viewDetails')}
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

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">{t('empty.title')}</h3>
              <p className="text-gray-400 mb-6">{t('empty.subtitle')}</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
              >
                {t('empty.reset')}
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
              {/* Header */}
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

              {/* Content */}
              <div className="p-8">
                {/* Client Info */}
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6 mb-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">{t('modal.client')}</div>
                      <div className="text-white font-medium">{selectedProject.client}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">{t('modal.industry')}</div>
                      <div className="text-white font-medium">{selectedProject.industry}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">{t('modal.year')}</div>
                      <div className="text-white font-medium">{selectedProject.year}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">{t('modal.duration')}</div>
                      <div className="text-white font-medium">{selectedProject.duration}</div>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{t('modal.intro')}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Challenge, Solution, Results */}
                {(selectedProject.challenge || selectedProject.solution || selectedProject.results) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {selectedProject.challenge && (
                      <div className="bg-white/5 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Zap className="w-5 h-5 text-orange-400" />
                          <h4 className="font-bold text-white">{t('modal.challenge')}</h4>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {selectedProject.challenge}
                        </p>
                      </div>
                    )}
                    {selectedProject.solution && (
                      <div className="bg-white/5 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Code className="w-5 h-5 text-amber-400" />
                          <h4 className="font-bold text-white">{t('modal.solution')}</h4>
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
                          <h4 className="font-bold text-white">{t('modal.results')}</h4>
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

                {/* Project Highlights */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{t('modal.highlights')}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="text-gray-300 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{t('modal.techStack')}</h3>
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

                {/* Project Data */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-amber-400 mb-1">1.2k</div>
                    <div className="text-xs text-gray-400">{t('modal.views')}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400 mb-1">
                      {89 + (likedProjects.includes(selectedProject.id) ? 1 : 0)}
                    </div>
                    <div className="text-xs text-gray-400">{t('modal.likes')}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">4.8</div>
                    <div className="text-xs text-gray-400">{t('modal.rating')}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400 mb-1">
                      {bookmarkedProjects.includes(selectedProject.id) ? t('modal.bookmark.saved') : t('modal.bookmark.unsaved')}
                    </div>
                    <div className="text-xs text-gray-400">{t('modal.bookmark.status')}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center">
                  <button 
                    onClick={() => {
                      setSelectedProject(null);
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all"
                  >
                    {t('modal.contact')}
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
                {t('industries.title')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('industries.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { id: 'retail', count: 25, icon: '🛍️', color: 'from-amber-500 to-orange-500' },
              { id: 'enterprise', count: 30, icon: '🏢', color: 'from-orange-500 to-red-500' },
              { id: 'education', count: 20, icon: '📚', color: 'from-green-500 to-emerald-500' },
              { id: 'fintech', count: 15, icon: '💰', color: 'from-cyan-500 to-teal-500' },
              { id: 'healthcare', count: 18, icon: '🏥', color: 'from-pink-500 to-rose-500' },
              { id: 'social', count: 22, icon: '🎮', color: 'from-violet-500 to-purple-500' },
              { id: 'lifestyle', count: 28, icon: '🏠', color: 'from-teal-500 to-cyan-500' },
              { id: 'others', count: 12, icon: '✨', color: 'from-yellow-500 to-orange-500' },
            ].map((industry, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="text-5xl mb-3">{industry.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{t(`industries.${industry.id}`)}</h3>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${industry.color} bg-clip-text text-transparent`}>
                    {industry.count}+
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{t('industries.cases')}</p>
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
                {t('techStack.title')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('techStack.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  category: 'Frontend',
                  icon: '🎨',
                  color: 'from-amber-500 to-orange-500',
                  techs: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                },
                {
                  category: 'Backend',
                  icon: '⚙️',
                  color: 'from-orange-500 to-red-500',
                  techs: ['Node.js', 'Python', 'Java', 'Go', 'GraphQL', 'REST API'],
                },
                {
                  category: 'Mobile',
                  icon: '📱',
                  color: 'from-green-500 to-emerald-500',
                  techs: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'WeChat Mini Program', 'uni-app'],
                },
                {
                  category: 'Database',
                  icon: '💾',
                  color: 'from-cyan-500 to-teal-500',
                  techs: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Firebase', 'Supabase'],
                },
                {
                  category: 'Cloud',
                  icon: '☁️',
                  color: 'from-pink-500 to-rose-500',
                  techs: ['AWS', 'Vercel', 'Docker', 'Kubernetes', 'CI/CD', 'Serverless'],
                },
                {
                  category: 'AI & Data',
                  icon: '🤖',
                  color: 'from-violet-500 to-purple-500',
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
                {t('resultsSection.title')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('resultsSection.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {[
              { label: 'Avg Conversion Increase', value: '180%', icon: TrendingUp, color: 'from-amber-500 to-orange-500' },
              { label: 'User Satisfaction', value: '96%', icon: Award, color: 'from-orange-500 to-red-500' },
              { label: 'Avg Dev Cycle', value: '6 weeks', icon: Calendar, color: 'from-green-500 to-emerald-500' },
              { label: 'Project Success Rate', value: '99%', icon: CheckCircle2, color: 'from-cyan-500 to-teal-500' },
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
                title: 'E-commerce Case Study',
                metric: 'GMV Growth 300%',
                desc: 'Optimized UX and recommendation algorithms to triple sales for clients',
                icon: '📈',
                color: 'from-amber-500 to-orange-500',
              },
              {
                title: 'Enterprise SaaS Case',
                metric: 'Efficiency +250%',
                desc: 'Automated workflows, reduced manual operations, greatly improved team collaboration',
                icon: '⚡',
                color: 'from-orange-500 to-red-500',
              },
              {
                title: 'Mobile App Case',
                metric: 'User Retention 85%',
                desc: 'Carefully designed UX and features, achieving industry-leading retention rates',
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
                {t('awards.title')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('awards.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Best Design Award',
                year: '2024',
                org: 'Awwwards',
                icon: '🏆',
                color: 'from-yellow-500 to-orange-500',
              },
              {
                title: 'Tech Innovation Award',
                year: '2024',
                org: 'Tech Innovation',
                icon: '🚀',
                color: 'from-amber-500 to-orange-500',
              },
              {
                title: 'UX Excellence Award',
                year: '2023',
                org: 'UX Design Awards',
                icon: '✨',
                color: 'from-green-500 to-emerald-500',
              },
              {
                title: 'Best Team Award',
                year: '2023',
                org: 'Industry Awards',
                icon: '🌟',
                color: 'from-cyan-500 to-teal-500',
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
                {t('process.title')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('process.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Requirements Analysis',
                  desc: 'Deep understanding of client needs and business goals',
                  icon: '🎯',
                  color: 'from-amber-500 to-orange-500',
                  items: ['User Research', 'Competitive Analysis', 'Requirements Documentation', 'Project Planning'],
                },
                {
                  title: 'Our Team',
                  subtitle: 'Elite team of multi-domain experts',
                  desc: 'Creative design solutions',
                  icon: '🎨',
                  color: 'from-orange-500 to-red-500',
                  items: ['Prototyping', 'Visual Design', 'Interaction Design', 'Design Review'],
                },
                {
                  step: '03',
                  title: 'Development',
                  desc: 'High-quality code implementation',
                  icon: '⚙️',
                  color: 'from-green-500 to-emerald-500',
                  items: ['Frontend Development', 'Backend Development', 'Testing & Debugging', 'Performance Optimization'],
                },
                {
                  step: '04',
                  title: 'Launch & Maintenance',
                  desc: 'Continuous optimization and technical support',
                  icon: '🚀',
                  color: 'from-cyan-500 to-teal-500',
                  items: ['Deployment', 'Data Monitoring', 'User Feedback', 'Continuous Iteration'],
                },
              ].map((process, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
                  >
                    {/* Step Number */}
                    <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br ${process.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {process.step}
                    </div>

                    {/* Icon */}
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                      {process.icon}
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-xl font-bold text-white mb-2">{process.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{process.desc}</p>

                    {/* Items */}
                    <ul className="space-y-2">
                      {process.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${process.color}`} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Connector Line */}
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
                {t('timeline.title')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('timeline.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block" />

              <div className="space-y-12">
                {[
                  {
                    year: '2020',
                    title: 'Founded',
                    desc: 'Established in Shenzhen, focusing on digital product development',
                    icon: '🎉',
                    stats: ['5-person team', 'First project'],
                    color: 'from-amber-500 to-orange-500',
                  },
                  {
                    year: '2021',
                    title: 'Rapid Growth',
                    desc: 'Team expansion, serving 50+ clients',
                    icon: '📈',
                    stats: ['20-person team', '50+ clients'],
                    color: 'from-orange-500 to-red-500',
                  },
                  {
                    year: '2022',
                    title: 'Business Expansion',
                    desc: 'Opened Beijing and Shanghai offices, won multiple industry awards',
                    icon: '🏆',
                    stats: ['3 offices', '100+ projects'],
                    color: 'from-green-500 to-emerald-500',
                  },
                  {
                    year: '2023',
                    title: 'Tech Innovation',
                    desc: 'Introduced AI technology, launched intelligent solutions',
                    icon: '🤖',
                    stats: ['50-person team', '150+ clients'],
                    color: 'from-cyan-500 to-teal-500',
                  },
                  {
                    year: '2024',
                    title: 'Industry Leader',
                    desc: 'Became industry benchmark, serving Fortune 500 companies',
                    icon: '⭐',
                    stats: ['80-person team', '200+ projects'],
                    color: 'from-violet-500 to-purple-500',
                  },
                ].map((milestone, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`relative flex flex-col md:flex-row items-center gap-8 ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Content Card */}
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

                      {/* Center Point */}
                      <div className={`hidden md:flex w-12 h-12 rounded-full bg-gradient-to-br ${milestone.color} items-center justify-center text-white font-bold shadow-lg z-10`}>
                        {index + 1}
                      </div>

                      {/* Placeholder */}
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
                Our Team
              </h2>
              <p className="text-xl text-gray-400">
                Elite team of multi-domain experts
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  role: 'UI/UX Designer',
                  count: 15,
                  icon: '🎨',
                  color: 'from-pink-500 to-rose-500',
                  skills: ['User Research', 'Interaction Design', 'Visual Design', 'Prototyping'],
                  experience: 'Avg 6 years exp',
                },
                {
                  role: 'Frontend Engineer',
                  count: 20,
                  icon: '💻',
                  color: 'from-amber-500 to-orange-500',
                  skills: ['React/Vue', 'TypeScript', 'Responsive Design', 'Performance Optimization'],
                  experience: 'Avg 7 years exp',
                },
                {
                  role: 'Backend Engineer',
                  count: 18,
                  icon: '⚙️',
                  color: 'from-green-500 to-emerald-500',
                  skills: ['Node.js', 'Python', 'Database Design', 'API Development'],
                  experience: 'Avg 8 years exp',
                },
                {
                  role: 'Mobile Developer',
                  count: 12,
                  icon: '📱',
                  color: 'from-orange-500 to-red-500',
                  skills: ['React Native', 'Flutter', 'iOS/Android', 'Mini Programs'],
                  experience: 'Avg 6 years exp',
                },
                {
                  role: 'Product Manager',
                  count: 8,
                  icon: '📊',
                  color: 'from-cyan-500 to-teal-500',
                  skills: ['Requirements Analysis', 'Product Planning', 'Project Management', 'Data Analysis'],
                  experience: 'Avg 9 years exp',
                },
                {
                  role: 'QA Engineer',
                  count: 7,
                  icon: '🔍',
                  color: 'from-violet-500 to-purple-500',
                  skills: ['Functional Testing', 'Automation Testing', 'Performance Testing', 'Security Testing'],
                  experience: 'Avg 5 years exp',
                },
              ].map((team, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${team.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                        {team.icon}
                      </div>
                      <div className={`text-3xl font-bold bg-gradient-to-r ${team.color} bg-clip-text text-transparent`}>
                        {team.count}+
                      </div>
                    </div>

                    {/* Role */}
                    <h3 className="text-xl font-bold text-white mb-2">{team.role}</h3>
                    <p className="text-sm text-gray-500 mb-4">{team.experience}</p>

                    {/* Skills */}
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
      <CTASection />
    </>
  );
}
