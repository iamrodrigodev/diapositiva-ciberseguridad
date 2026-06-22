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

  // Large confetti on completion
  const isFinished = qIdx === QUESTIONS.length - 1 && revealed

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
      setTimeout(() => setConfetti(false), 2500)
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
      {(confetti || isFinished) && (
        <Confetti 
          recycle={isFinished} 
          numberOfPieces={isFinished ? 500 : 250} 
          gravity={isFinished ? 0.15 : 0.2}
          style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none' }} 
          colors={['#34d399','#60a5fa','#a78bfa','#fbbf24', '#f87171']} 
        />
      )}

      <Tag>Actividad Interactiva · Reto Final</Tag>
      <div className="flex items-start justify-between mb-4">
        <Title>Quiz de Criptografía</Title>
        <motion.span variants={fadeUp} className="font-mono text-sm font-bold pt-2 px-4 py-1.5 rounded-full"
          style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }}>
          {qIdx + 1}/{QUESTIONS.length} · {score} correctas
        </motion.span>
      </div>

      <motion.div variants={fadeUp} className="flex gap-2 mb-6">
        {QUESTIONS.map((_, i) => (
          <div key={i} className="h-1.5 flex-1 rounded-full transition-all duration-500"
            style={{ 
              background: i < qIdx ? '#34d399' : i === qIdx ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.06)',
              boxShadow: i < qIdx ? '0 0 10px rgba(52,211,153,0.3)' : 'none'
            }} />
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={qIdx} initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }} transition={{ duration: 0.3 }} className="flex-1 flex flex-col">
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
