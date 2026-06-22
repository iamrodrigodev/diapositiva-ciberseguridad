import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import type { ReactNode } from 'react'

type Glow = 'green' | 'blue' | 'violet' | 'amber' | 'red' | 'none'

const BORDER: Record<Glow, string> = {
  green:  'rgba(52,211,153,0.18)',
  blue:   'rgba(96,165,250,0.18)',
  violet: 'rgba(167,139,250,0.18)',
  amber:  'rgba(251,191,36,0.18)',
  red:    'rgba(248,113,113,0.18)',
  none:   'rgba(255,255,255,0.07)',
}
const BG: Record<Glow, string> = {
  green:  'rgba(52,211,153,0.04)',
  blue:   'rgba(96,165,250,0.04)',
  violet: 'rgba(167,139,250,0.04)',
  amber:  'rgba(251,191,36,0.04)',
  red:    'rgba(248,113,113,0.04)',
  none:   'rgba(255,255,255,0.03)',
}

interface Props { children: ReactNode; glow?: Glow; className?: string; noAnimate?: boolean }

export default function Card({ children, glow = 'none', className = '', noAnimate }: Props) {
  const style = { background: BG[glow], border: `1px solid ${BORDER[glow]}` }
  if (noAnimate) return <div className={`rounded-xl p-5 ${className}`} style={style}>{children}</div>
  return (
    <motion.div variants={fadeUp} className={`rounded-xl p-5 ${className}`} style={style}>
      {children}
    </motion.div>
  )
}
