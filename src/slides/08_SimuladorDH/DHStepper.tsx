import { motion, AnimatePresence } from 'framer-motion'
import StepRow from '../../ui/StepRow'
import { DH_P, DH_G, computeDH } from '../../lib/crypto/dh'

export type StepKey = 'public'|'A'|'B'|'sharedA'|'sharedB'|'verify'

interface Props { a: number; b: number; steps: StepKey[] }

export default function DHStepper({ a, b, steps }: Props) {
  const { A, B, sharedA, sharedB, match } = computeDH(a, b)
  const has = (s: StepKey) => steps.includes(s)

  return (
    <div className="flex flex-col gap-3 overflow-y-auto pr-1">
      <p className="text-xs font-mono text-white/50 tracking-widest uppercase mb-1">Ejecución paso a paso</p>

      <StepRow show={has('public')} color="#34d399" label="① Parámetros públicos conocidos por todos">
        <div className="flex gap-8 font-mono text-base mt-1">
          <span>p = <strong className="text-emerald-400">{DH_P.toString()}</strong></span>
          <span>g = <strong className="text-emerald-400">{DH_G.toString()}</strong></span>
        </div>
        <p className="text-white/65 text-sm mt-2">p es primo (23) y g es generador (5). Estos valores son públicos — cualquiera los conoce.</p>
      </StepRow>

      <StepRow show={has('A')} color="#60a5fa" label="② Alice calcula su clave pública A">
        <div className="font-mono text-sm space-y-1 mt-1 text-white/65">
          <div>A = g<sup>a</sup> mod p = {DH_G.toString()}<sup>{a}</sup> mod {DH_P.toString()}</div>
          <div className="text-base"><strong className="text-blue-400">A = {A.toString()}</strong> <span className="text-white/50 text-sm">(Alice envía este valor a Bob)</span></div>
        </div>
      </StepRow>

      <StepRow show={has('B')} color="#a78bfa" label="③ Bob calcula su clave pública B">
        <div className="font-mono text-sm space-y-1 mt-1 text-white/65">
          <div>B = g<sup>b</sup> mod p = {DH_G.toString()}<sup>{b}</sup> mod {DH_P.toString()}</div>
          <div className="text-base"><strong className="text-violet-400">B = {B.toString()}</strong> <span className="text-white/50 text-sm">(Bob envía este valor a Alice)</span></div>
        </div>
      </StepRow>

      <StepRow show={has('sharedA')} color="#60a5fa" label="④ Alice calcula el secreto usando B de Bob">
        <div className="font-mono text-sm space-y-1 mt-1 text-white/65">
          <div>s = B<sup>a</sup> mod p = {B.toString()}<sup>{a}</sup> mod {DH_P.toString()}</div>
          <div className="text-base"><strong className="text-blue-400">s = {sharedA.toString()}</strong></div>
        </div>
      </StepRow>

      <StepRow show={has('sharedB')} color="#a78bfa" label="⑤ Bob calcula el secreto usando A de Alice">
        <div className="font-mono text-sm space-y-1 mt-1 text-white/65">
          <div>s = A<sup>b</sup> mod p = {A.toString()}<sup>{b}</sup> mod {DH_P.toString()}</div>
          <div className="text-base"><strong className="text-violet-400">s = {sharedB.toString()}</strong></div>
        </div>
      </StepRow>

      <StepRow show={has('verify')} color={match ? '#34d399' : '#f87171'} label="⑥ Verificación del secreto compartido">
        <AnimatePresence>
          {match && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 space-y-2">
              <p className="font-mono text-lg font-bold text-emerald-400">
                ✓ Ambos obtuvieron s = {sharedA.toString()}
              </p>
              <p className="text-sm text-white/50 leading-relaxed">
                Un atacante que intercepte <strong className="text-white/70">A={A.toString()}</strong> y <strong className="text-white/70">B={B.toString()}</strong> no puede calcular s sin resolver el logaritmo discreto mod {DH_P.toString()} — lo que es computacionalmente imposible con primos grandes.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </StepRow>
    </div>
  )
}
