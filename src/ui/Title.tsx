import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import type { ReactNode } from 'react'

export default function Title({ children }: { children: ReactNode }) {
  return (
    <motion.h2
      variants={fadeUp}
      className="text-4xl font-bold text-slate-100 tracking-tight leading-tight mb-2"
    >
      {children}
    </motion.h2>
  )
}
