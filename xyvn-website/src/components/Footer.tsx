'use client'
import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* 公司信息 */}
          <div>
            <h3 className="text-2xl font-bold mb-4">XYVN</h3>
            <p className="text-gray-400 mb-6">
              打造卓越数字体验，专注网站和 APP 开发
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* 服务 */}
          <div>
            <h4 className="font-semibold mb-4">服务</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition">网站开发</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">APP 开发</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">小程序开发</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">技术咨询</Link></li>
            </ul>
          </div>

          {/* 公司 */}
          <div>
            <h4 className="font-semibold mb-4">公司</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition">关于我们</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">团队介绍</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">加入我们</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">联系方式</Link></li>
            </ul>
          </div>

          {/* 资源 */}
          <div>
            <h4 className="font-semibold mb-4">资源</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition">博客</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">案例研究</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">文档</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">帮助中心</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} XYVN. 保留所有权利。
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
              隐私政策
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition">
              使用条款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
