'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-white rounded-2xl p-8 shadow-lg',
        hover && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
