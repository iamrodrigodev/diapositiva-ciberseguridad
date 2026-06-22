import { useState, useRef, useCallback } from 'react'
import { CHARS_HEX } from '../../lib/utils'

const PLAINTEXT = 'HOLA MUNDO!'

function scramble(text: string, progress: number): string {
  return text.split('').map((ch, i) => {
    if (ch === ' ') return ' '
    if (progress < i / text.length)
      return (CHARS_HEX[Math.floor(Math.random() * CHARS_HEX.length)] ?? 'f').toUpperCase()
    return ch
  }).join('')
}

export default function ScrambleDemo() {
  const [revealed, setRevealed] = useState(1)
  const [display,  setDisplay]  = useState(PLAINTEXT)
  const running = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const animate = useCallback(() => {
    if (running.current) return
    running.current = true
    if (intervalRef.current) clearInterval(intervalRef.current)
    let p = 0
    const tick = () => {
      p = Math.min(p + 0.04, 1)
      setRevealed(p)
      setDisplay(scramble(PLAINTEXT, p))
      if (p < 1) requestAnimationFrame(tick)
      else {
        running.current = false
        intervalRef.current = setInterval(() => setDisplay(scramble(PLAINTEXT, 1)), 60)
        setTimeout(() => { clearInterval(intervalRef.current!); setDisplay(PLAINTEXT) }, 500)
      }
    }
    // Scramble everything first
    setDisplay(scramble(PLAINTEXT, 0))
    setRevealed(0)
    setTimeout(() => requestAnimationFrame(tick), 300)
  }, [])

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl p-6"
      style={{ background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.15)' }}>
      <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase">Cifrado / Descifrado visual</p>
      <div className="font-mono text-3xl font-bold tracking-widest text-center"
        style={{ color: revealed >= 1 ? '#34d399' : '#60a5fa', textShadow: `0 0 24px ${revealed >= 1 ? '#34d39955' : '#60a5fa44'}` }}>
        {display}
      </div>
      <button onClick={animate}
        className="font-mono text-xs px-5 py-2.5 rounded-xl transition-all hover:opacity-80 active:scale-95"
        style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)', color: '#34d399' }}>
        ▶ {revealed >= 1 ? 'Repetir descifrado' : 'Descifrando…'}
      </button>
    </div>
  )
}
