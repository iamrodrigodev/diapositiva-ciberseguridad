import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props { show: boolean; color: string; label: string; children: ReactNode }

export default function StepRow({ show, color, label, children }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 20, height: 0 }}
          animate={{ opacity: 1, x: 0, height: 'auto' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl px-5 py-4 overflow-hidden"
          style={{ background: `${color}0a`, border: `1px solid ${color}28` }}
        >
          <p className="text-sm font-bold mb-2" style={{ color }}>{label}</p>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
