import { motion } from 'framer-motion'
import { mixHue } from '../../lib/crypto/dh'

const PUBLIC_HUE = 45

interface SwatchProps { hue: number; label: string; sub?: string; small?: boolean }
function Swatch({ hue, label, sub, small }: SwatchProps) {
  return (
    <div className="flex flex-col items-center justify-start gap-0.5 w-16">
      <motion.div layout animate={{ background: `hsl(${hue},72%,52%)` }} transition={{ duration: 0.4 }}
        className={`${small ? 'w-7 h-7 rounded-lg' : 'w-10 h-10 rounded-xl'}`}
        style={{ boxShadow: `0 0 15px hsl(${hue},72%,38%)55` }} />
      <span className="text-[9px] font-mono text-white/70 font-bold text-center leading-tight mt-0.5">{label}</span>
      {sub && <span className="text-[8px] font-mono text-white/40 text-center leading-tight">{sub}</span>}
    </div>
  )
}

function Operator({ type }: { type: '+' | '=' }) {
  return <div className="text-white/30 font-bold text-lg -translate-y-2">{type}</div>
}

interface Props { aliceHue: number; bobHue: number; onAlice: (h: number) => void; onBob: (h: number) => void }

export default function ColorMixer({ aliceHue, bobHue, onAlice, onBob }: Props) {
  const alicePub  = mixHue(PUBLIC_HUE, aliceHue)
  const bobPub    = mixHue(PUBLIC_HUE, bobHue)
  const sharedHue = mixHue(mixHue(bobPub, aliceHue), mixHue(alicePub, bobHue)) // Math hack to make average colors match

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between mb-0.5">
        <div>
          <p className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase font-bold">Analogía: Pintura</p>
        </div>
        <Swatch hue={PUBLIC_HUE} label="Color Público" sub="(G)" small />
      </div>

      {/* STEP 1: Crear mezcla pública */}
      <div className="space-y-1.5">
        <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold border-b border-white/10 pb-0.5">1. Cada uno crea su mezcla para enviar</p>
        
        {/* Alice creates public */}
        <div className="flex items-center justify-center gap-1 bg-white/5 p-1.5 rounded-xl border border-white/5">
          <Swatch hue={aliceHue} label="Secreto Alice" sub="(a)" small />
          <Operator type="+" />
          <Swatch hue={PUBLIC_HUE} label="Público" sub="(G)" small />
          <Operator type="=" />
          <Swatch hue={alicePub} label="Mezcla Alice" sub="(A) Se envía" small />
        </div>

        {/* Bob creates public */}
        <div className="flex items-center justify-center gap-1 bg-white/5 p-1.5 rounded-xl border border-white/5">
          <Swatch hue={bobHue} label="Secreto Bob" sub="(b)" small />
          <Operator type="+" />
          <Swatch hue={PUBLIC_HUE} label="Público" sub="(G)" small />
          <Operator type="=" />
          <Swatch hue={bobPub} label="Mezcla Bob" sub="(B) Se envía" small />
        </div>
      </div>

      {/* STEP 2: Intercambio y mezcla final */}
      <div className="space-y-1.5 mt-0.5">
        <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold border-b border-white/10 pb-0.5">2. Añaden su secreto a lo que reciben</p>
        
        {/* Alice final */}
        <div className="flex items-center justify-center gap-1 bg-emerald-500/5 p-1.5 rounded-xl border border-emerald-500/10">
          <Swatch hue={bobPub} label="Recibe de Bob" sub="(B)" small />
          <Operator type="+" />
          <Swatch hue={aliceHue} label="Su secreto" sub="(a)" small />
          <Operator type="=" />
          <Swatch hue={sharedHue} label="Secreto Final" sub="(s)" />
        </div>

        {/* Bob final */}
        <div className="flex items-center justify-center gap-1 bg-emerald-500/5 p-1.5 rounded-xl border border-emerald-500/10">
          <Swatch hue={alicePub} label="Recibe de Alice" sub="(A)" small />
          <Operator type="+" />
          <Swatch hue={bobHue} label="Su secreto" sub="(b)" small />
          <Operator type="=" />
          <Swatch hue={sharedHue} label="Secreto Final" sub="(s)" />
        </div>
      </div>

      {/* Sliders / User Controls */}
      <div className="space-y-2 mt-2 p-3 rounded-2xl bg-white/5 border border-white/10 relative z-20">
        <p className="text-[10px] text-white/50 text-center uppercase tracking-widest font-bold border-b border-white/10 pb-1.5 mb-2">Paso 0: Elige tus pinturas secretas</p>
        
        {([['Arrastra para cambiar el Secreto de Alice (a)', aliceHue, onAlice, '#60a5fa'], ['Arrastra para cambiar el Secreto de Bob (b)', bobHue, onBob, '#a78bfa']] as const).map(([lbl, val, setter, c]) => (
          <div key={lbl} className="p-2 rounded-xl" style={{ background: `${c}10`, border: `1px solid ${c}25` }}>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[10px] font-mono font-bold" style={{ color: c }}>{lbl}</label>
              <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-md border" style={{ borderColor: `${c}40` }}>
                <div className="w-2 h-2 rounded-full" style={{ background: `hsl(${val},72%,52%)` }} />
                <span className="text-[10px] font-mono font-bold" style={{ color: c }}>{val}</span>
              </div>
            </div>
            <input type="range" min="0" max="359" value={val}
              onChange={e => setter(+e.target.value)}
              className="w-full h-1.5 rounded-full cursor-pointer outline-none transition-all hover:scale-[1.01]"
              style={{ accentColor: `hsl(${val},72%,55%)` }} />
          </div>
        ))}
      </div>
    </div>
  )
}
