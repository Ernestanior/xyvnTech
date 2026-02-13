'use client'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function TechStackSection() {
  const technologies = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Framework' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Prisma', category: 'ORM' },
    { name: 'Vercel', category: 'Deployment' },
  ]

  return (
    <section id="tech" className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">技术栈</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              使用业界领先的技术，确保产品快速、稳定、可扩展
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition">
                <div className="text-2xl font-bold mb-2">{tech.name}</div>
                <div className="text-sm text-gray-400">{tech.category}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
