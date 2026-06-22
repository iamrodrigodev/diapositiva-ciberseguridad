import { motion } from 'framer-motion'

export type GridMode = 'ECB' | 'CBC' | 'GCM'

// Simple pixel-art shape: 0=bg, 1=typeA, 2=typeB
const PIXEL: number[][] = [
  [0,1,1,1,1,0,0,0],
  [1,1,0,0,1,1,0,0],
  [1,1,0,0,1,1,0,0],
  [0,1,1,1,1,0,0,0],
  [0,0,0,1,0,0,0,0],
  [0,0,2,1,2,0,0,0],
  [0,0,0,1,0,0,0,0],
  [0,0,0,1,2,0,0,0],
]

const BG = 'rgba(255,255,255,0.04)'

const ecb = (v: number) => v === 0 ? BG : v === 1 ? '#6366f1' : '#f59e0b'

function buildCBC(): string[][] {
  let prev = 37
  return PIXEL.map(row => row.map(v => {
    if (v === 0) return BG
    const x = (v * 73 + prev * 17) % 256; prev = x
    return `hsl(${(x * 137 + 40) % 360},65%,52%)`
  }))
}

// Pre-compute so colors are stable across renders
const CBC_C = buildCBC()
const GCM_C = buildCBC().map(r => r.map(c => c === BG ? BG : `hsl(${Math.floor(Math.random()*360)},60%,48%)`))

interface Props { mode: GridMode; small?: boolean }

export default function PixelGrid({ mode, small }: Props) {
  const sz = small ? 'w-4 h-4' : 'w-7 h-7'
  return (
    <div className="flex flex-col gap-0.5">
      {PIXEL.map((row, ri) => (
        <div key={ri} className="flex gap-0.5">
          {row.map((v, ci) => {
            const bg = mode === 'ECB' ? ecb(v) : mode === 'CBC' ? (CBC_C[ri]?.[ci] ?? BG) : (GCM_C[ri]?.[ci] ?? BG)
            return (
              <motion.div key={ci} layout
                animate={{ background: bg } as Record<string, string>}
                transition={{ duration: 0.35, delay: (ri * 8 + ci) * 0.007 }}
                className={`${sz} rounded-sm`}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
