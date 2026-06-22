import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion'
import type { AlgoSpec } from './data'

export default function AlgoCard({ algo }: { algo: AlgoSpec }) {
  const { label, bits, rounds, color, note, detail, statusLabel } = algo
  return (
    <motion.div variants={fadeUp} className="flex-1 rounded-2xl p-5 flex flex-col gap-3"
      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}28` }}>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xl font-extrabold text-white">{label}</span>
        <span className="font-mono text-xs px-2.5 py-1 rounded-lg font-bold"
          style={{ background: `${color}18`, color, border: `1px solid ${color}35` }}>
          {statusLabel}
        </span>
        <span className="font-mono text-xs text-white/40">{bits} bits · {rounds} rondas</span>
      </div>

      <p className="text-sm text-white/70 leading-relaxed">{note}</p>

      <div className="rounded-xl px-4 py-3" style={{ background: `${color}08`, border: `1px solid ${color}18` }}>
        <p className="text-sm leading-relaxed" style={{ color: `${color}cc` }}>{detail}</p>
      </div>
    </motion.div>
  )
}
