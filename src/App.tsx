import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSlideScale, SLIDE_BASE_W, SLIDE_BASE_H } from './lib/useSlideScale'

const SLIDES = [
  // ── Introducción ────────────────────────────────────────────────
  { component: lazy(() => import('./slides/01_Portada')),        title: 'Portada',                    presenter: 'Ambos'   },
  { component: lazy(() => import('./slides/Historia')),          title: 'Historia de la Criptografía', presenter: 'Rodrigo' },
  { component: lazy(() => import('./slides/Conceptos')),         title: 'Conceptos Clave',            presenter: 'Rodrigo' },
  { component: lazy(() => import('./slides/02_Introduccion')),   title: '¿Por qué Criptografía?',     presenter: 'Rodrigo' },
  // ── Simétrica ───────────────────────────────────────────────────
  { component: lazy(() => import('./slides/03_Simetrica')),      title: 'AES, DES y 3DES',            presenter: 'Rodrigo' },
  { component: lazy(() => import('./slides/AsimetricaIntro')),   title: 'El Problema de la Clave',    presenter: 'Rodrigo'  },
  { component: lazy(() => import('./slides/DES_Detalle')),       title: 'DES — Por qué Falló',        presenter: 'Rodrigo' },
  { component: lazy(() => import('./slides/AES_Detalle')),       title: 'AES — Estructura Interna',   presenter: 'Rodrigo' },
  { component: lazy(() => import('./slides/04_Modos')),          title: 'Modos de Operación',         presenter: 'Rodrigo' },
  // ── Quiz ────────────────────────────────────────────────────────
  { component: lazy(() => import('./slides/05_Quiz')),           title: 'Quiz Interactivo',           presenter: 'Ambos'   },
  // ── Asimétrica ──────────────────────────────────────────────────
  { component: lazy(() => import('./slides/06_Asimetrica')),     title: 'RSA y Curvas Elípticas',     presenter: 'Carlos'  },
  { component: lazy(() => import('./slides/ECC_Detalle')),       title: 'ECC — Curvas Elípticas',     presenter: 'Carlos'  },
  { component: lazy(() => import('./slides/Firmas')),            title: 'Firmas Digitales',           presenter: 'Carlos'  },
  { component: lazy(() => import('./slides/07_DiffieHellman')),  title: 'Diffie-Hellman',             presenter: 'Carlos'  },
  { component: lazy(() => import('./slides/08_SimuladorDH')),    title: 'Simulador DH',               presenter: 'Ambos'   },
  // ── Cierre ──────────────────────────────────────────────────────
  { component: lazy(() => import('./slides/Aplicaciones')),      title: 'Aplicaciones Reales',        presenter: 'Ambos'   },
  { component: lazy(() => import('./slides/09_Comparativa')),    title: 'Comparativa',                presenter: 'Ambos'   },
  { component: lazy(() => import('./slides/10_Conclusion')),     title: 'Conclusión',                 presenter: 'Ambos'   },
]

const PRESENTER_COLORS: Record<string, string> = {
  Ambos:   '#34d399',
  Rodrigo: '#60a5fa',
  Carlos:  '#a78bfa',
}

export default function App() {
  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem('currentSlide')
    if (saved !== null) {
      const idx = parseInt(saved, 10)
      if (!isNaN(idx) && idx >= 0 && idx < SLIDES.length) return idx
    }
    return 0
  })
  const [direction, setDirection] = useState(1)
  const scale = useSlideScale()

  useEffect(() => {
    localStorage.setItem('currentSlide', current.toString())
  }, [current])

  const navigate = useCallback((delta: number) => {
    setCurrent(prev => {
      const next = prev + delta
      if (next < 0 || next >= SLIDES.length) return prev
      setDirection(delta)
      return next
    })
  }, [])

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return
      
      if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) { e.preventDefault(); navigate(1) }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key))         { e.preventDefault(); navigate(-1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const slide = SLIDES[current]!
  const SlideComponent = slide.component
  const color = PRESENTER_COLORS[slide.presenter as keyof typeof PRESENTER_COLORS]
  const progress = ((current + 1) / SLIDES.length) * 100

  return (
    <div className="h-dvh w-screen overflow-hidden flex flex-col select-none bg-grid" style={{ backgroundColor: '#0a0a0f' }}>
      {/* Progress bar */}
      <div className="relative h-0.5 bg-white/5 shrink-0">
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ background: 'linear-gradient(90deg, #10b981, #3b82f6)' }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>

      {/* Slide area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={{
              enter:  (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit:   (d: number) => ({ x: d > 0 ? '-15%' : '15%', opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.32, 0, 0.67, 0] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Fixed-size content box scaled to fit the available viewport */}
            <div
              style={{
                width:           SLIDE_BASE_W,
                height:          SLIDE_BASE_H,
                transform:       `scale(${scale})`,
                transformOrigin: 'center center',
                flexShrink:      0,
                overflow:        'hidden',
              }}
            >
              <Suspense fallback={
                <div className="h-full w-full flex items-center justify-center">
                  <span className="font-mono text-sm text-emerald-400 animate-pulse">inicializando...</span>
                </div>
              }>
                <SlideComponent />
              </Suspense>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div
        className="h-12 shrink-0 flex items-center justify-between px-6"
        style={{
          background: 'rgba(8,8,18,0.92)',
          borderTop: '1px solid rgba(255,255,255,0.09)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Left: counter + presenter */}
        <div className="flex items-center gap-2.5 min-w-32.5">
          <span
            className="font-mono text-xs font-semibold tabular-nums"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            {String(current + 1).padStart(2, '0')}
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
            {String(SLIDES.length).padStart(2, '0')}
          </span>
          <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.12)', display: 'inline-block' }} />
          <span
            className="font-mono text-xs font-semibold tracking-wide"
            style={{ color }}
          >
            {slide.presenter}
          </span>
        </div>

        {/* Center: dots */}
        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir al slide ${i + 1}`}
              className="cursor-pointer transition-all duration-300"
              style={{
                width:      i === current ? '20px' : '7px',
                height:     '7px',
                borderRadius: '999px',
                background: i === current ? color : 'rgba(255,255,255,0.2)',
                boxShadow: i === current ? `0 0 8px ${color}80` : 'none',
              }}
            />
          ))}
        </div>

        {/* Right: arrow buttons */}
        <div className="flex items-center gap-2 min-w-32.5 justify-end">
          <button
            onClick={() => navigate(-1)}
            disabled={current === 0}
            aria-label="Slide anterior"
            className="cursor-pointer disabled:cursor-default transition-all duration-200 flex items-center justify-center rounded-lg"
            style={{
              width: 32, height: 32,
              background: current === 0 ? 'transparent' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: current === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.65)',
              fontSize: 15,
              opacity: current === 0 ? 0.4 : 1,
            }}
            onMouseEnter={e => { if (current !== 0) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)' }}
            onMouseLeave={e => { if (current !== 0) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)' }}
          >
            ←
          </button>
          <button
            onClick={() => navigate(1)}
            disabled={current === SLIDES.length - 1}
            aria-label="Siguiente slide"
            className="cursor-pointer disabled:cursor-default transition-all duration-200 flex items-center justify-center rounded-lg"
            style={{
              width: 32, height: 32,
              background: current === SLIDES.length - 1 ? 'transparent' : `${color}18`,
              border: `1px solid ${current === SLIDES.length - 1 ? 'rgba(255,255,255,0.1)' : color + '40'}`,
              color: current === SLIDES.length - 1 ? 'rgba(255,255,255,0.2)' : color,
              fontSize: 15,
              opacity: current === SLIDES.length - 1 ? 0.4 : 1,
            }}
            onMouseEnter={e => { if (current !== SLIDES.length - 1) (e.currentTarget as HTMLButtonElement).style.background = `${color}30` }}
            onMouseLeave={e => { if (current !== SLIDES.length - 1) (e.currentTarget as HTMLButtonElement).style.background = `${color}18` }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
