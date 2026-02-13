'use client'
import { ReactNode } from 'react'

// 暂时禁用 Lenis 平滑滚动以提升性能
// 可以在需要时重新启用
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return <>{children}</>
}

/* 
// 如果需要启用平滑滚动，取消注释以下代码
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
*/
