'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePathname } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import logo from '@/app/assets/logo.png';
import LanguageSwitcher from './LanguageSwitcher';

export default function NavbarEnhanced() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const t = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { 
      href: '/services', 
      label: t('nav.services'),
      dropdown: [
        { 
          href: '/services/web-development', 
          label: t('nav.webDevelopment'), 
          icon: '🌐',
          desc: t('nav.webDevelopmentDesc')
        },
        { 
          href: '/services/app-development', 
          label: t('nav.appDevelopment'), 
          icon: '📱',
          desc: t('nav.appDevelopmentDesc')
        },
        { 
          href: '/services/miniprogram', 
          label: t('nav.miniprogram'), 
          icon: '💬',
          desc: t('nav.miniprogramDesc')
        },
      ]
    },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/about', label: t('nav.about') },
    { href: '/pricing', label: t('nav.pricing') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-white/10' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <div className="relative w-15 h-15 md:w-12 md:h-12">
                  <Image
                    src={logo}
                    alt="ARVIX Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <span className="relative text-md font-bold text-white bg-clip-text text-transparent">
                    ARVIX
                  </span>
                </div>
                <Sparkles className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <li 
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-lg transition-all font-medium flex items-center gap-1 group ${
                      isActive(link.href)
                        ? 'text-blue-400 bg-blue-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        activeDropdown === link.href ? 'rotate-180' : ''
                      }`} />
                    )}
                    {!link.dropdown && (
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all ${
                        isActive(link.href) ? 'w-1/2' : 'w-0 group-hover:w-1/2'
                      }`} />
                    )}
                  </Link>

                  {/* Modern Grid Dropdown Menu */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.href && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[500px] bg-gray-900 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden p-3"
                        >
                          <div className="grid grid-cols-1 gap-3">
                            {link.dropdown.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="group relative p-5 rounded-xl bg-gray-800 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-purple-500/20 border border-white/5 hover:border-white/10 transition-all duration-300"
                              >
                                {/* 内容 */}
                                <div className="relative">
                                  {/* 图标 */}
                                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300 border border-white/10">
                                    {item.icon}
                                  </div>
                                  
                                  {/* 标题 */}
                                  <div className="font-bold text-white text-lg mb-2 group-hover:text-blue-400 transition-colors">
                                    {item.label}
                                  </div>
                                  
                                  {/* 描述 */}
                                  <div className="text-sm text-gray-400 leading-relaxed">
                                    {item.desc}
                                  </div>
                                  
                                  {/* 箭头 */}
                                  <div className="absolute top-5 right-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-blue-400 text-xl">
                                    →
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher />
              <Link
                href="/contact"
                className="relative px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium overflow-hidden group"
              >
                <span className="relative z-10">{t('common.startCollaboration')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-gray-900/98 backdrop-blur-xl border-l border-white/10 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Close Button */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                      <Image
                        src={logo}
                        alt="ARVIX Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      ARVIX
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={24} className="text-white" />
                  </button>
                </div>

                {/* Menu Items */}
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block px-4 py-3 rounded-lg transition-all font-medium ${
                          isActive(link.href)
                            ? 'text-blue-400 bg-blue-500/10'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                      {link.dropdown && (
                        <ul className="ml-4 mt-2 space-y-2">
                          {link.dropdown.map((item, idx) => (
                            <li key={idx}>
                              <Link
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <span>{item.icon}</span>
                                <span className="text-sm">{item.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href="/contact"
                  className="block w-full mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('common.startCollaboration')}
                </Link>

                {/* Language Switcher for Mobile */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
