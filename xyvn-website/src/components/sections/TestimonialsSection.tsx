'use client'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Card from '@/components/ui/Card'
import { Star } from 'lucide-react'

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: '张总',
      company: '某科技公司 CEO',
      content: 'XYVN 团队的专业度和执行力令人印象深刻，他们不仅按时交付了高质量的产品，还提供了很多有价值的建议。',
      rating: 5,
    },
    {
      name: '李经理',
      company: '某电商平台负责人',
      content: '与 XYVN 合作是一次非常愉快的经历。他们的技术实力强，沟通顺畅，完全理解我们的需求。',
      rating: 5,
    },
    {
      name: '王总监',
      company: '某互联网公司产品总监',
      content: '项目上线后，用户反馈非常好。XYVN 在细节把控和用户体验方面做得很出色。',
      rating: 5,
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">客户评价</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              听听客户怎么说
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.company}</div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
