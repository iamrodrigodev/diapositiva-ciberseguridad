import { motion, AnimatePresence } from 'framer-motion'
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
  const voteTotal = votes.reduce((a, b) => a + b, 0)

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="rounded-2xl px-6 py-5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-white text-xl font-semibold leading-snug">{question.q}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {question.opts.map((opt, i) => {
          const isCorrect  = i === question.correct
          const isSelected = i === selected
          const pct = voteTotal > 0 ? Math.round(((votes[i] ?? 0) / voteTotal) * 100) : 0
          const optColor = OPT_COLORS[i] ?? '#fff'
          let border = 'rgba(255,255,255,0.09)', bg = 'rgba(255,255,255,0.03)', tc = 'rgba(255,255,255,0.65)'
          if (revealed && isCorrect)        { border = '#34d399'; bg = 'rgba(52,211,153,0.13)';  tc = '#34d399' }
          else if (revealed && isSelected)  { border = '#f87171'; bg = 'rgba(248,113,113,0.10)'; tc = '#f87171' }
          else if (!revealed && isSelected) { border = optColor;  bg = `${optColor}18`;           tc = optColor  }

          return (
            <button key={i} onClick={() => onVote(i)} disabled={revealed}
              className="relative rounded-xl px-5 py-4 text-left font-medium transition-all duration-200 overflow-hidden disabled:cursor-default"
              style={{ border: `1px solid ${border}`, background: bg, color: tc }}>
              {revealed && (
                <div className="absolute inset-y-0 left-0 rounded-xl transition-all duration-700"
                  style={{ width: `${pct}%`, background: isCorrect ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.02)' }} />
              )}
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold font-mono" style={{ color: optColor }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm leading-snug">{opt}</span>
                </div>
                {revealed && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    {isCorrect && <span className="text-emerald-400">✓</span>}
                    {isSelected && !isCorrect && <span className="text-red-400">✗</span>}
                    <span className="font-mono text-sm">{pct}%</span>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-xl px-5 py-4"
            style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)' }}>
            <p className="text-base leading-relaxed text-white/75">
              <strong className="text-emerald-400">Explicación: </strong>{question.explain}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3 mt-auto">
        {!revealed
          ? <Button variant="primary" className="flex-1 py-3 text-sm" onClick={onReveal} disabled={selected === null}>
              Revelar respuesta
            </Button>
          : !isLast
            ? <Button variant="secondary" className="flex-1 py-3 text-sm" onClick={onNext}>
                Siguiente pregunta →
              </Button>
            : <div className="flex-1 text-center text-base font-bold text-emerald-400 py-3">
                ¡Quiz completado! {score}/{total} correctas
              </div>
        }
      </div>
    </div>
  )
}
