import { motion } from 'framer-motion'
import { mixHue } from '../../lib/crypto/dh'

const PUBLIC_HUE = 45

interface SwatchProps { hue: number; label: string; sub?: string }
function Swatch({ hue, label, sub }: SwatchProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.div layout animate={{ background: `hsl(${hue},72%,52%)` }} transition={{ duration: 0.4 }}
        className="w-14 h-14 rounded-2xl"
        style={{ boxShadow: `0 0 20px hsl(${hue},72%,38%)55` }} />
      <span className="font-mono text-[10px] text-white/55">{label}</span>
      {sub && <span className="font-mono text-[9px] text-white/25">{sub}</span>}
    </div>
  )
}

interface Props { aliceHue: number; bobHue: number; onAlice: (h: number) => void; onBob: (h: number) => void }

export default function ColorMixer({ aliceHue, bobHue, onAlice, onBob }: Props) {
  const alicePub  = mixHue(PUBLIC_HUE, aliceHue)
  const bobPub    = mixHue(PUBLIC_HUE, bobHue)
  const sharedHue = mixHue(mixHue(bobPub, aliceHue), mixHue(alicePub, bobHue))

  return (
    <div className="flex flex-col gap-5">
      <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase">Analogía visual — mezcla de colores</p>

      <div className="grid grid-cols-3 gap-3 items-end">
        <Swatch hue={aliceHue}  label="Alice (secreto)"  sub="🔒 privado" />
        <Swatch hue={PUBLIC_HUE} label="Color público"   sub="conocido" />
        <Swatch hue={bobHue}    label="Bob (secreto)"    sub="🔒 privado" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Swatch hue={alicePub} label="Alice publica" sub="pub_A" />
        <Swatch hue={bobPub}   label="Bob publica"   sub="pub_B" />
      </div>
      <div className="flex items-center justify-center gap-6">
        <div className="text-center">
          <p className="font-mono text-[9px] text-white/25 mb-1.5">Alice: pub_B + secreto</p>
          <Swatch hue={sharedHue} label="Secreto compartido" />
        </div>
        <span className="text-emerald-400 text-2xl font-bold">≡</span>
        <div className="text-center">
          <p className="font-mono text-[9px] text-white/25 mb-1.5">Bob: pub_A + secreto</p>
          <Swatch hue={sharedHue} label="Secreto compartido" />
        </div>
      </div>

      <div className="space-y-3">
        {[['Secreto Alice', aliceHue, onAlice], ['Secreto Bob', bobHue, onBob]].map(([lbl, val, setter]) => (
          <div key={String(lbl)}>
            <div className="flex justify-between mb-1">
              <label className="font-mono text-[10px] text-white/35">{String(lbl)}</label>
              <span className="font-mono text-[10px] text-white/35">{Number(val)}°</span>
            </div>
            <input type="range" min="0" max="359" value={Number(val)}
              onChange={e => (setter as (h: number) => void)(+e.target.value)}
              className="w-full h-1.5 rounded-full cursor-pointer outline-none"
              style={{ accentColor: `hsl(${Number(val)},72%,55%)` }} />
          </div>
        ))}
      </div>
    </div>
  )
}
