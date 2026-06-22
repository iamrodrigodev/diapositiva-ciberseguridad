import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import { fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import QuizQuestion from './QuizQuestion'
import { QUESTIONS } from './data'

export default function Quiz() {
  const [qIdx,     setQIdx]     = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [votes,    setVotes]    = useState([0, 0, 0, 0])
  const [confetti, setConfetti] = useState(false)
  const [score,    setScore]    = useState(0)

  const vote = (i: number) => {
    if (revealed) return
    setVotes(v => v.map((c, idx) => idx === i ? c + 1 : c))
    setSelected(i)
  }

  const reveal = () => {
    setRevealed(true)
    if (selected === QUESTIONS[qIdx]?.correct) {
      setScore(s => s + 1)
      setConfetti(true)
      setTimeout(() => setConfetti(false), 3000)
    }
  }

  const next = () => {
    setQIdx(i => i + 1)
    setSelected(null)
    setRevealed(false)
    setVotes([0, 0, 0, 0])
  }

  return (
    <SlideLayout>
      {confetti && <Confetti recycle={false} numberOfPieces={220} style={{ position: 'fixed', inset: 0, zIndex: 50 }} colors={['#34d399','#60a5fa','#a78bfa','#fbbf24']} />}

      <Tag>Actividad Interactiva · Ambos</Tag>
      <div className="flex items-start justify-between mb-3">
        <Title>Quiz — Participa</Title>
        <motion.span variants={fadeUp} className="font-mono text-xs text-white/30 pt-2">
          {qIdx + 1}/{QUESTIONS.length} · {score} correctas
        </motion.span>
      </div>

      <motion.div variants={fadeUp} className="flex gap-1.5 mb-5">
        {QUESTIONS.map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all duration-500"
            style={{ background: i < qIdx ? '#34d399' : i === qIdx ? '#34d39966' : 'rgba(255,255,255,0.08)' }} />
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={qIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.28 }} className="flex-1 flex flex-col">
          <QuizQuestion
            question={QUESTIONS[qIdx]!} selected={selected} votes={votes} revealed={revealed}
            onVote={vote} onReveal={reveal} onNext={next}
            isLast={qIdx === QUESTIONS.length - 1} score={score} total={QUESTIONS.length}
          />
        </motion.div>
      </AnimatePresence>
    </SlideLayout>
  )
}
