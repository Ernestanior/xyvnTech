'use client'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Card from '@/components/ui/Card'
import Image from 'next/image'

export default function PortfolioSection() {
  const projects = [
    {
      title: '电商平台',
      category: '网站开发',
      description: '现代化的电商解决方案，提升转化率 200%',
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
      tags: ['Next.js', 'TypeScript', 'Tailwind'],
    },
    {
      title: '健身 APP',
      category: 'APP 开发',
      description: '智能健身追踪应用，用户留存率 95%',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
      tags: ['React Native', 'Node.js', 'MongoDB'],
    },
    {
      title: '企业官网',
      category: '网站开发',
      description: '高端企业官网，Lighthouse 分数 98',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      tags: ['Next.js', 'Framer Motion', 'Prisma'],
    },
    {
      title: '社交平台',
      category: 'APP 开发',
      description: '创新的社交体验，日活用户 10万+',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      tags: ['Flutter', 'Firebase', 'GraphQL'],
    },
  ]

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">精选案例</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              为各行业客户打造的成功案例
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="overflow-hidden p-0">
                <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-semibold mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
