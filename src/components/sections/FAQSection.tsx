'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '你们的开发周期一般需要多久？',
      answer: '开发周期取决于项目的复杂度和需求。一般来说，简单的展示型网站需要 2-4 周，中等复杂度的网站需要 4-8 周，复杂的 APP 或平台需要 8-16 周。我们会在需求沟通阶段给出详细的时间规划。',
    },
    {
      question: '项目费用如何计算？',
      answer: '我们提供两种付费模式：【买断制】一次性支付开发费用，项目完全归您所有，适合预算充足、需要完全掌控的客户；【订阅制】支付较低的初始费用，按月/年订阅服务，包含云端托管、维护更新、技术支持等，3年总成本比买断制节省20-30%，适合希望降低初期投入、享受持续服务的客户。具体价格请查看定价页面或联系我们获取详细报价。',
    },
    {
      question: '订阅制和买断制有什么区别？',
      answer: '【买断制】：一次性支付全部费用（如企业官网 NT$80,000-250,000），项目源码和所有权归您，后续维护需另外付费。【订阅制】：支付较低的初始设置费（如 NT$8,000-25,000）+ 月费（NT$1,299-3,999/月），包含云端托管、SSL证书、CDN加速、每日备份、技术支持、功能更新等服务，3年总成本更低，且无需担心服务器和维护问题。订阅制更适合大多数中小企业。',
    },
    {
      question: '订阅服务包含哪些内容？',
      answer: '订阅服务包含：1) 云端托管和服务器管理；2) SSL证书和CDN加速；3) 每日自动备份；4) 7×24小时技术支持；5) 安全更新和Bug修复；6) 功能优化和性能提升；7) 根据服务类型还包含：电商的支付网关、APP的应用商店发布、小程序的审核提交等。您无需担心任何技术问题，专注于业务发展即可。',
    },
    {
      question: '订阅服务可以随时取消吗？',
      answer: '可以的。订阅服务采用灵活的订阅机制，您可以随时取消订阅，我们会在当前计费周期结束后停止服务。如果选择年付，可享受17%的折扣（相当于10个月的价格）。取消订阅后，我们会协助您进行数据导出和迁移，确保业务不受影响。',
    },
    {
      question: '你们使用什么技术栈？',
      answer: '我们使用业界最先进的技术栈。前端：React、Next.js、Vue、TypeScript；后端：Node.js、Python、Go；移动端：React Native、Flutter；数据库：PostgreSQL、MongoDB、Redis。我们会根据项目需求选择最合适的技术方案。',
    },
    {
      question: '如何保证项目质量？',
      answer: '我们有严格的质量保证流程：1) 代码审查和规范；2) 自动化测试；3) 性能优化；4) 安全检测；5) 多设备兼容性测试；6) 用户体验测试。每个阶段都有质量检查点，确保交付高质量产品。',
    },
    {
      question: '可以看到开发进度吗？',
      answer: '当然可以！我们采用敏捷开发模式，会定期（通常每周）向您展示开发进度和成果。您可以通过项目管理工具实时查看进度，我们也会定期组织演示会议，确保项目按预期推进。',
    },
    {
      question: '支持哪些付款方式？',
      answer: '我们支持多种付款方式：银行转账、支付宝、微信支付、对公转账等。【买断制】付款通常分为：首付款（30-50%）、中期款（30-40%）、尾款（20-30%）。【订阅制】初始设置费一次性支付，月费/年费可选择自动扣款或定期转账。具体付款方式可以根据项目情况协商。',
    },
    {
      question: '你们的团队规模如何？',
      answer: '我们有一支经验丰富的专业团队，包括：产品经理、UI/UX 设计师、前端工程师、后端工程师、移动端工程师、测试工程师等。团队成员平均有 5+ 年行业经验，参与过多个大型项目。',
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              您可能想了解的问题
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              我们整理了客户最关心的问题，如有其他疑问欢迎随时联系
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <motion.div
                initial={false}
                className="mb-4"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white pr-8 group-hover:text-blue-400 transition-colors">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* 底部提示 */}
        <ScrollReveal delay={0.5}>
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-4">
              没有找到您想要的答案？
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all"
            >
              直接联系我们
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
