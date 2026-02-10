'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from '../ContactForm';
import ScrollReveal from '../ui/ScrollReveal';

export default function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      title: '邮箱',
      content: 'hello@xyvn.com',
      link: 'mailto:hello@xyvn.com',
    },
    {
      icon: Phone,
      title: '电话',
      content: '+86 138 0000 0000',
      link: 'tel:+8613800000000',
    },
    {
      icon: MapPin,
      title: '地址',
      content: '中国 · 深圳 · 南山区',
      link: null,
    },
    {
      icon: Clock,
      title: '工作时间',
      content: '周一至周五 9:00-18:00',
      link: null,
    },
  ];

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4"
            >
              <span className="text-blue-400 text-sm font-medium">联系我们</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              开始您的项目
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              告诉我们您的想法，让我们一起创造卓越的数字产品
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* 联系信息 */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  让我们聊聊
                </h3>
                <p className="text-gray-400 mb-8">
                  无论是新项目咨询、技术支持，还是商务合作，我们都期待与您交流。
                </p>
              </div>

              {/* 联系方式卡片 */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="group"
                  >
                    {item.link ? (
                      <a
                        href={item.link}
                        className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 transition-all"
                      >
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                          <item.icon className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-1">{item.title}</h4>
                          <p className="text-gray-400 group-hover:text-blue-400 transition-colors">
                            {item.content}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-1">{item.title}</h4>
                          <p className="text-gray-400">{item.content}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* 社交媒体 */}
              <div className="pt-8 border-t border-white/10">
                <h4 className="text-white font-medium mb-4">关注我们</h4>
                <div className="flex gap-4">
                  {['微信', 'GitHub', 'Twitter', 'LinkedIn'].map((platform, index) => (
                    <motion.a
                      key={platform}
                      href="#"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/50 transition-all"
                    >
                      <span className="text-gray-400 hover:text-blue-400 text-sm">
                        {platform[0]}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 联系表单 */}
          <ScrollReveal delay={0.4}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
