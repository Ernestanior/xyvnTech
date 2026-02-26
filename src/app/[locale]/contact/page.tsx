'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Clock, MessageSquare, Zap, Users, Award, Send, CheckCircle2, Calendar, MessageCircle, X, ArrowRight, Headphones } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ContactSection from '@/components/sections/ContactSection';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ContactPage() {
  const t = useTranslations('contact');
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
      title: t('reasons.fastResponse.title'),
      desc: t('reasons.fastResponse.desc'),
      color: 'from-amber-500 to-orange-500',
      stat: t('reasons.fastResponse.stat'),
    },
    {
      icon: Users,
      title: t('reasons.professionalTeam.title'),
      desc: t('reasons.professionalTeam.desc'),
      color: 'from-orange-500 to-red-500',
      stat: t('reasons.professionalTeam.stat'),
    },
    {
      icon: Award,
      title: t('reasons.qualityGuarantee.title'),
      desc: t('reasons.qualityGuarantee.desc'),
      color: 'from-green-500 to-emerald-500',
      stat: t('reasons.qualityGuarantee.stat'),
    },
    {
      icon: CheckCircle2,
      title: t('reasons.successCases.title'),
      desc: t('reasons.successCases.desc'),
      color: 'from-cyan-500 to-teal-500',
      stat: t('reasons.successCases.stat'),
    },
  ];

  const contactMethods = [
    {
      icon: FaWhatsapp,
      title: t('contactMethods.whatsapp.title'),
      desc: t('contactMethods.whatsapp.desc'),
      action: '+65 9156 1413',
      color: 'from-green-500 to-emerald-500',
      available: true,
      responseTime: t('contactMethods.whatsapp.responseTime'),
      link: 'https://wa.me/6591561413',
    },
    {
      icon: Mail,
      title: t('contactMethods.email.title'),
      desc: t('contactMethods.email.desc'),
      action: 'ern@xyvnai.com',
      color: 'from-violet-500 to-purple-500',
      available: true,
      responseTime: t('contactMethods.email.responseTime'),
      link: 'mailto:ern@xyvnai.com',
    },
  ];

  const faqs = [
    { q: t('faqs.q1.question'), a: t('faqs.q1.answer') },
    { q: t('faqs.q2.question'), a: t('faqs.q2.answer') },
    { q: t('faqs.q3.question'), a: t('faqs.q3.answer') },
    { q: t('faqs.q4.question'), a: t('faqs.q4.answer') },
    { q: t('faqs.q5.question'), a: t('faqs.q5.answer') },
    { q: t('faqs.q6.question'), a: t('faqs.q6.answer') },
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
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                {t('title')}
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  {' '}{t('subtitle')}
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed mb-4">
                {t('description')}
              </p>

              {/* Working Hours Status */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className={`w-2 h-2 rounded-full ${isWorkingHours ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm text-gray-400">
                  {isWorkingHours ? t('status.online') : t('status.offline')} · {currentTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
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
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  {t('contactUs')}
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
                  {t('whatsappContact')}
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
                {t('whyChooseUs')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('partnerDescription')}
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
                {t('contactMethodsTitle')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('contactMethodsSubtitle')}
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
                    {method.available ? t('available') : t('offline')}
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
                {t('officeTitle')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('officeSubtitle')}
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
                      <a href={`tel:${office.phone}`} className="text-sm hover:text-amber-400 transition-colors">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <a href={`mailto:${office.email}`} className="text-sm hover:text-amber-400 transition-colors">
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
                {t('faqsTitle')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('faqsSubtitle')}
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
                    <span className="text-amber-400">Q:</span>
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
                {t('cta.title')}
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                {t('cta.subtitle')}
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
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all"
                >
                  {t('cta.freeConsult')}
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+6591561413"
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-all"
                >
                  {t('cta.phoneConsult')}
                </motion.a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
