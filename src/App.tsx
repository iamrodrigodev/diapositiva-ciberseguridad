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
  { component: lazy(() => import('./slides/DES_Detalle')),       title: 'DES — Por qué Falló',        presenter: 'Rodrigo' },
  { component: lazy(() => import('./slides/AES_Detalle')),       title: 'AES — Estructura Interna',   presenter: 'Rodrigo' },
  { component: lazy(() => import('./slides/04_Modos')),          title: 'Modos de Operación',         presenter: 'Rodrigo' },
  // ── Quiz ────────────────────────────────────────────────────────
  { component: lazy(() => import('./slides/05_Quiz')),           title: 'Quiz Interactivo',           presenter: 'Ambos'   },
  // ── Asimétrica ──────────────────────────────────────────────────
  { component: lazy(() => import('./slides/AsimetricaIntro')),   title: 'El Problema de la Clave',    presenter: 'Carlos'  },
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
  const [current, setCurrent]   = useState(0)
  const [direction, setDirection] = useState(1)
  const scale = useSlideScale()

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
    <div className="h-dvh w-screen bg-[#0a0a0f] overflow-hidden flex flex-col select-none">
      {/* Progress bar */}
      <div className="relative h-[2px] bg-white/5 shrink-0">
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
      <div className="h-10 shrink-0 flex items-center justify-between px-6 border-t border-white/[0.06] bg-black/30">
        {/* Left: counter + presenter */}
        <div className="flex items-center gap-3 min-w-[100px]">
          <span className="font-mono text-[11px] text-white/45">
            {String(current + 1).padStart(2, '0')}/{String(SLIDES.length).padStart(2, '0')}
          </span>
          <span className="text-white/30">·</span>
          <span className="font-mono text-[11px] font-medium" style={{ color }}>
            {slide.presenter}
          </span>
        </div>

        {/* Center: dots */}
        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300 hover:opacity-80"
              style={{
                width:      i === current ? '14px' : '6px',
                height:     '6px',
                background: i === current ? '#34d399' : 'rgba(255,255,255,0.18)',
              }}
            />
          ))}
        </div>

        {/* Right: arrow buttons */}
        <div className="flex items-center gap-1 min-w-[100px] justify-end">
          <button
            onClick={() => navigate(-1)}
            disabled={current === 0}
            className="px-3 py-1 font-mono text-xs text-white/45 hover:text-emerald-400 disabled:opacity-25 rounded hover:bg-white/5 transition-all"
          >
            ←
          </button>
          <button
            onClick={() => navigate(1)}
            disabled={current === SLIDES.length - 1}
            className="px-3 py-1 font-mono text-xs text-white/45 hover:text-emerald-400 disabled:opacity-25 rounded hover:bg-white/5 transition-all"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
