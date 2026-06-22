import { motion } from 'framer-motion'
import { stagger } from '../lib/motion'
import type { ReactNode } from 'react'

interface Props { children: ReactNode; className?: string; noGrid?: boolean }

export default function SlideLayout({ children, className = '', noGrid }: Props) {
  return (
    <motion.div
      className={`h-full w-full flex flex-col px-12 py-8 relative overflow-hidden ${className}`}
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {!noGrid && <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none" />}
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>
  )
}
