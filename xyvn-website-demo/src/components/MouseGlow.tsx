'use client'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number>()
  const lastUpdateRef = useRef<number>(0)
  
  useEffect(() => {
    // 节流：每 16ms 更新一次（约 60fps）
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdateRef.current < 16) return
      
      lastUpdateRef.current = now
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])
  
  return (
    <motion.div
      className="fixed pointer-events-none -z-10 will-change-transform"
      animate={{
        x: mousePosition.x - 250,
        y: mousePosition.y - 250,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
    >
      <div className="w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
    </motion.div>
  )
}
