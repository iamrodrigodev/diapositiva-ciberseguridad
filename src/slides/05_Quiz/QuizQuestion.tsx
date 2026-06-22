import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Button from '../../ui/Button'
import { OPT_COLORS, type Question } from './data'

interface Props {
  question: Question
  selected: number | null
  votes: number[]
  revealed: boolean
  onVote: (i: number) => void
  onReveal: () => void
  onNext?: () => void
  isLast: boolean
  score: number
  total: number
}

export default function QuizQuestion({ question, selected, votes, revealed, onVote, onReveal, onNext, isLast, score, total }: Props) {
  const [shake, setShake] = useState(false)
  const voteTotal = votes.reduce((a, b) => a + b, 0)

  useEffect(() => {
    if (revealed && selected !== null && selected !== question.correct) {
      const t1 = setTimeout(() => setShake(true), 0)
      const t2 = setTimeout(() => setShake(false), 500)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
    return undefined
  }, [revealed, selected, question.correct])

  return (
    <motion.div 
      animate={shake ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-5 flex-1"
    >
      <div className="rounded-2xl px-6 py-6"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-white text-xl font-semibold leading-relaxed">{question.q}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {question.opts.map((opt, i) => {
          const isCorrect  = i === question.correct
          const isSelected = i === selected
          const pct = voteTotal > 0 ? Math.round(((votes[i] ?? 0) / voteTotal) * 100) : 0
          const optColor = OPT_COLORS[i] ?? '#fff'
          let border = 'rgba(255,255,255,0.09)', bg = 'rgba(255,255,255,0.03)', tc = 'rgba(255,255,255,0.65)'
          if (revealed && isCorrect)        { border = '#34d399'; bg = 'rgba(52,211,153,0.15)';  tc = '#34d399' }
          else if (revealed && isSelected)  { border = '#f87171'; bg = 'rgba(248,113,113,0.12)'; tc = '#f87171' }
          else if (!revealed && isSelected) { border = optColor;  bg = `${optColor}18`;           tc = optColor  }

          return (
            <button key={i} onClick={() => onVote(i)} disabled={revealed}
              className="relative rounded-2xl px-5 py-4 text-left font-medium transition-all duration-200 overflow-hidden disabled:cursor-default hover:scale-[1.02] active:scale-[0.98]"
              style={{ border: `1px solid ${border}`, background: bg, color: tc }}>
              {revealed && (
                <div className="absolute inset-y-0 left-0 transition-all duration-1000 ease-out"
                  style={{ width: `${pct}%`, background: isCorrect ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.03)' }} />
              )}
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold font-mono" style={{ color: optColor }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-[15px] leading-snug font-bold">{opt}</span>
                </div>
                {revealed && (
                  <div className="flex items-center gap-2 shrink-0">
                    {isCorrect && <span className="text-emerald-400 text-lg">✓</span>}
                    {isSelected && !isCorrect && <span className="text-red-400 text-lg">✗</span>}
                    <span className="font-mono text-[13px] opacity-70">{pct}%</span>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="rounded-2xl px-6 py-5 mt-2 relative overflow-hidden"
            style={{ 
              background: selected === question.correct ? 'rgba(52,211,153,0.08)' : 'rgba(248,113,113,0.08)', 
              border: `1px solid ${selected === question.correct ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}` 
            }}>
            
            {/* Glow effect for explanation */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none"
                 style={{ background: selected === question.correct ? '#34d399' : '#f87171' }} />

            <p className="text-[15px] leading-relaxed text-white/90 relative z-10">
              <strong style={{ color: selected === question.correct ? '#34d399' : '#f87171' }}>
                {selected === question.correct ? '¡Correcto! ' : 'Incorrecto. '}
              </strong>
              {question.explain}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4 mt-auto pt-2">
        {!revealed
          ? <Button variant="primary" className="flex-1 py-3.5 text-[15px] font-bold" onClick={onReveal} disabled={selected === null}>
              Revelar respuesta
            </Button>
          : !isLast
            ? <Button variant="secondary" className="flex-1 py-3.5 text-[15px] font-bold" onClick={onNext}>
                Siguiente pregunta →
              </Button>
            : <div className="flex-1 text-center flex flex-col justify-center items-center py-2">
                <span className="text-sm text-white/50 mb-1">¡Has completado el quiz!</span>
                <span className="text-xl font-bold text-emerald-400">{score}/{total} correctas</span>
              </div>
        }
      </div>
    </motion.div>
  )
}
