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
      answer: '我们根据项目的功能需求、设计复杂度、开发工作量等因素综合评估。一般分为：基础型（5万以下）、标准型（5-10万）、高级型（10-20万）、定制型（20万以上）。具体报价需要详细沟通需求后确定。',
    },
    {
      question: '你们使用什么技术栈？',
      answer: '我们使用业界最先进的技术栈。前端：React、Next.js、Vue、TypeScript；后端：Node.js、Python、Go；移动端：React Native、Flutter；数据库：PostgreSQL、MongoDB、Redis。我们会根据项目需求选择最合适的技术方案。',
    },
    {
      question: '项目完成后提供哪些服务？',
      answer: '我们提供完整的售后服务：1) 免费维护期（通常 3-6 个月）；2) 技术支持和 Bug 修复；3) 功能迭代和优化；4) 服务器运维支持；5) 培训和文档；6) 长期技术顾问服务（可选）。',
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
      answer: '我们支持多种付款方式：银行转账、支付宝、微信支付、对公转账等。付款通常分为：首付款（30-50%）、中期款（30-40%）、尾款（20-30%）。具体付款方式和比例可以根据项目情况协商。',
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
