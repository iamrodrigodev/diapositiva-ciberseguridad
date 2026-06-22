import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'

export default function Tag({ children }: { children: string }) {
  return (
    <motion.span
      variants={fadeUp}
      className="font-mono text-xs tracking-[0.3em] text-emerald-400 uppercase mb-1 inline-block"
    >
      {children}
    </motion.span>
  )
}
