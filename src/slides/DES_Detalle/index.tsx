import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import { Skull, Bandaids, DesktopTower, ChartBar } from '@phosphor-icons/react'

const BITS = [
  { algo: 'DES',     bits: 56,  combos: '2⁵⁶ ≈ 72 cuatrillones', time: '22 horas (1999) · segundos hoy', color: '#f87171', status: 'ROTO',     bar: 0.14 },
  { algo: '3DES',    bits: 112, combos: '2¹¹² combinaciones',      time: 'Días (obsoleto desde 2019)',     color: '#fbbf24', status: 'OBSOLETO',  bar: 0.28 },
  { algo: 'AES-128', bits: 128, combos: '2¹²⁸ combinaciones',      time: 'Billones de años',               color: '#60a5fa', status: 'SEGURO',    bar: 0.55 },
  { algo: 'AES-256', bits: 256, combos: '2²⁵⁶ combinaciones',      time: '> edad del universo',            color: '#34d399', status: 'ÓPTIMO',    bar: 1.00 },
]

export default function DES_Detalle() {
  return (
    <SlideLayout>
      <Tag>Simétrica · Rodrigo</Tag>
      <Title>DES y 3DES — Por qué Fallaron</Title>

      <motion.div variants={stagger} className="flex-1 flex gap-5 overflow-hidden">
        <div className="flex-1 flex flex-col gap-3">
          {/* DES */}
          <motion.div variants={fadeUp} className="rounded-2xl p-4"
            style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.2)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.3)' }}>
                <Skull size={20} weight="duotone" color="#f87171" />
              </div>
              <div>
                <h3 className="text-red-400 font-bold text-sm">DES (1977)</h3>
                <p className="text-white/60 text-xs font-mono">Data Encryption Standard — IBM + NSA</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 text-xs text-white/80 leading-relaxed">
              <p>Diseñado por IBM en 1974, adoptado por NIST en <strong className="text-white/85">1977</strong> como el primer estándar federal de cifrado.</p>
              <p>Usa una clave de solo <strong className="text-red-400">56 bits</strong> — decisión influenciada por la NSA, que quería poder romperlo.</p>
              <p>En <strong className="text-white/85">1998</strong>: la EFF construyó <em>"Deep Crack"</em> por $250,000 USD y rompió DES en <strong className="text-red-400">22 horas</strong>.</p>
              <p>Hoy, una <strong className="text-white/85">GPU moderna</strong> lo rompe en <strong className="text-red-400">segundos</strong> por fuerza bruta.</p>
            </div>
          </motion.div>

          {/* 3DES */}
          <motion.div variants={fadeUp} className="rounded-2xl p-4"
            style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)' }}>
                <Bandaids size={20} weight="duotone" color="#fbbf24" />
              </div>
              <div>
                <h3 className="text-amber-400 font-bold text-sm">3DES (Triple DES)</h3>
                <p className="text-white/60 text-xs font-mono">Parche temporal — EDE mode</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 text-xs text-white/80 leading-relaxed">
              <p>Aplicar DES <strong className="text-amber-300">tres veces</strong> (Cifrar → Descifrar → Cifrar con 3 claves distintas).</p>
              <p>Seguridad efectiva: <strong className="text-white/85">112 bits</strong> — el ataque <em>meet-in-the-middle</em> elimina un factor de 2⁵⁶.</p>
              <p><strong className="text-amber-400">Sweet32</strong> (2016): con ~256 GB de tráfico cifrado se puede recuperar texto en sesiones largas.</p>
              <p>NIST lo <strong className="text-red-400">deprecó en 2019</strong>. Algunos sistemas bancarios aún lo usan por legado.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-xl px-4 py-3"
            style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)' }}>
            <p className="text-emerald-400 text-xs font-bold mb-1">¿Qué aprendimos?</p>
            <p className="text-white/75 text-xs leading-relaxed">
              El poder de cómputo crece exponencialmente (Ley de Moore). Un algoritmo "seguro hoy" puede ser roto mañana si el tamaño de clave no fue pensado con margen suficiente.
              <strong className="text-white/75"> AES con 128+ bits tiene décadas de margen.</strong>
            </p>
          </motion.div>
        </div>

        {/* Right: Key size comparison */}
        <motion.div variants={fadeUp} className="w-[38%] flex flex-col gap-3">
          <div className="rounded-2xl p-4 flex flex-col gap-3 flex-1 overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2">
              <ChartBar size={16} weight="duotone" color="rgba(255,255,255,0.4)" />
              <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest">Espacio de claves</p>
            </div>

            {BITS.map(({ algo, bits, combos, time, color, status, bar }) => (
              <div key={algo} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold" style={{ color }}>{algo}</span>
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded"
                    style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
                    {status}
                  </span>
                </div>
                <div className="h-4 rounded-lg bg-white/[0.04] border border-white/8 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${bar * 100}%` }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="h-full rounded-lg"
                    style={{ background: `linear-gradient(90deg,${color}80,${color})` }} />
                </div>
                <span className="font-mono text-[10px] text-white/60">{bits} bits — {combos}</span>
                <div className="font-mono text-[10px] rounded px-2 py-0.5"
                  style={{ background: `${color}0a`, color: `${color}cc`, border: `1px solid ${color}18` }}>
                  ⏱ {time}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4 shrink-0"
            style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.18)' }}>
            <div className="flex items-center gap-2 mb-2">
              <DesktopTower size={18} weight="duotone" color="#f87171" />
              <p className="text-red-400 text-xs font-bold">Deep Crack — 1998</p>
            </div>
            <p className="text-white/75 text-xs leading-relaxed">
              La EFF construyó esta máquina por <strong className="text-white/80">$250,000</strong>.
              Contenía <strong className="text-white/80">1,856 chips</strong> especializados probando
              <strong className="text-white/80"> 90 billones de claves por segundo</strong>.
              Hoy una RTX 4090 lo supera.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
