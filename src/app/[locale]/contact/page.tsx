'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare, Zap, Users, Award, Send, CheckCircle2, Calendar, MessageCircle, X, ArrowRight, Headphones } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ContactSection from '@/components/sections/ContactSection';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ContactPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isWorkingHours, setIsWorkingHours] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const hour = now.getHours();
      const day = now.getDay();
      setIsWorkingHours(day >= 1 && day <= 5 && hour >= 9 && hour < 18);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const reasons = [
    {
      icon: Zap,
      title: '快速响应',
      desc: '工作时间内 1 小时响应',
      color: 'from-blue-500 to-cyan-500',
      stat: '< 1h',
    },
    {
      icon: Users,
      title: '专业团队',
      desc: '平均 8 年行业经验',
      color: 'from-purple-500 to-pink-500',
      stat: '8+ 年',
    },
    {
      icon: Award,
      title: '品质保证',
      desc: '客户满意度 98%',
      color: 'from-green-500 to-emerald-500',
      stat: '98%',
    },
    {
      icon: CheckCircle2,
      title: '成功案例',
      desc: '已完成 200+ 项目',
      color: 'from-orange-500 to-red-500',
      stat: '200+',
    },
  ];

  const contactMethods = [
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      desc: '通过 WhatsApp 联系我们',
      action: '+65 9156 1413',
      color: 'from-green-500 to-emerald-500',
      available: true,
      responseTime: '即时回复',
      link: 'https://wa.me/6591561413',
    },
    {
      icon: Mail,
      title: '邮件联系',
      desc: '发送邮件详细说明需求',
      action: 'ern@xyvnai.com',
      color: 'from-purple-500 to-pink-500',
      available: true,
      responseTime: '12小时内回复',
      link: 'mailto:ern@xyvnai.com',
    },
  ];

  const faqs = [
    { q: '项目开发周期一般多久？', a: '根据项目复杂度，一般网站 1-3 周，APP 4-8 周，小程序 3-6 周。' },
    { q: '如何保证项目质量？', a: '我们有严格的代码审查、测试流程，并提供免费维护期。' },
    { q: '支持哪些付款方式？', a: '支持分期付款、里程碑付款和月度订阅等多种方式。' },
    { q: '是否提供售后服务？', a: '提供 3-12 个月免费维护期和终身技术支持。' },
    { q: '可以先看看案例吗？', a: '当然可以！我们有丰富的成功案例，欢迎查看作品集。' },
    { q: '如何开始合作？', a: '联系我们后，我们会安排免费咨询，提供详细方案。' },
  ];

  const offices = [
    {
      city: 'Singapore Office',
      address: '1 Jln Membina, Singapore 169479',
      phone: '+65 9156 1413',
      email: 'ern@xyvnai.com',
      hours: 'Monday - Friday 9:00-18:00',
      icon: '🇸🇬',
    },
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
                让我们一起
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {' '}创造精彩
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed mb-4">
                无论是新项目咨询、技术支持，还是商务合作
                <br />
                我们都期待与您交流，共同打造卓越的数字产品
              </p>

              {/* 工作时间状态 */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className={`w-2 h-2 rounded-full ${isWorkingHours ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm text-gray-400">
                  {isWorkingHours ? '在线服务中' : '非工作时间'} · {currentTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const contactForm = document.getElementById('contact');
                    if (contactForm) {
                      contactForm.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  联系我们
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/6591561413"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full font-medium hover:bg-green-500/20 transition-all flex items-center gap-2"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  WhatsApp 联系
                </motion.a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                为什么选择我们
              </h2>
              <p className="text-xl text-gray-400">
                专业、高效、可靠的合作伙伴
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {reasons.map((reason, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all relative overflow-hidden group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center mx-auto mb-4 relative z-10`}>
                    <reason.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${reason.color} bg-clip-text text-transparent mb-2`}>
                    {reason.stat}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
                  <p className="text-sm text-gray-400">{reason.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                联系方式
              </h2>
              <p className="text-xl text-gray-400">
                选择最适合您的沟通方式
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.a
                  href={method.link}
                  target={method.link?.startsWith('http') ? '_blank' : undefined}
                  rel={method.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ y: -10 }}
                  className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all relative cursor-pointer"
                >
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${
                    method.available 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {method.available ? '可用' : '离线'}
                  </div>

                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4`}>
                    <method.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{method.desc}</p>
                  <div className="text-xs text-gray-500 mb-4">
                    ⏱️ {method.responseTime}
                  </div>
                  <div className={`text-sm font-medium bg-gradient-to-r ${method.color} bg-clip-text text-transparent`}>
                    {method.action}
                  </div>
                </motion.a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form */}
      <ContactSection />

      {/* Office Locations */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                办公地点
              </h2>
              <p className="text-xl text-gray-400">
                我们的新加坡办公室
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto">
            {offices.map((office, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-4xl">{office.icon}</div>
                    <h3 className="text-2xl font-bold text-white">{office.city}</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-gray-400">
                      <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span className="text-sm">{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <a href={`tel:${office.phone}`} className="text-sm hover:text-blue-400 transition-colors">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <a href={`mailto:${office.email}`} className="text-sm hover:text-blue-400 transition-colors">
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{office.hours}</span>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                常见问题
              </h2>
              <p className="text-xl text-gray-400">
                快速了解我们的服务
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
                >
                  <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-2">
                    <span className="text-blue-400">Q:</span>
                    {faq.q}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-3xl p-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                准备开始您的项目了吗？
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                立即联系我们，获取免费咨询和项目报价
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const contactForm = document.getElementById('contact');
                    if (contactForm) {
                      contactForm.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                >
                  免费咨询
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+6591561413"
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-all"
                >
                  电话咨询
                </motion.a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
