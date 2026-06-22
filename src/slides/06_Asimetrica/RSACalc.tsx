import { useState } from 'react'
import { Lock, Unlock, Calculator, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp } from '../../lib/motion'
import Button from '../../ui/Button'
import CodeLine from '../../ui/CodeLine'
import { deriveRSA, modPow } from '../../lib/crypto/rsa'

export default function RSACalc() {
  const [pNum,   setPNum]   = useState(5)
  const [qNum,   setQNum]   = useState(11)
  const [msgNum, setMsgNum] = useState(7)
  const [cipher, setCipher] = useState<bigint | null>(null)
  const [plain,  setPlain]  = useState<bigint | null>(null)
  const [step,   setStep]   = useState<'idle'|'enc'|'dec'>('idle')

  const params = deriveRSA(pNum, qNum)
  const { n, phi, e, d, valid, error } = params
  const m = BigInt(msgNum)

  const reset = () => { setCipher(null); setPlain(null); setStep('idle') }

  const handleP   = (v: number) => { setPNum(v);   reset() }
  const handleQ   = (v: number) => { setQNum(v);   reset() }
  const handleMsg = (v: number) => { setMsgNum(v); reset() }

  const encrypt = () => { if (valid) { setCipher(modPow(m, e, n)); setStep('enc') } }
  const decrypt = () => { if (valid && cipher) { setPlain(modPow(cipher, d, n)); setStep('dec') } }

  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5 mb-1 bg-violet-500/10 w-max px-4 py-1.5 rounded-full border border-violet-500/20">
        <Calculator size={16} className="text-violet-400" />
        <span className="text-[11px] font-bold text-violet-400 uppercase tracking-widest">Simulador RSA Interactivo</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {([['p (primo)', pNum, [3,5,7,11,13], handleP], ['q (primo)', qNum, [7,11,13,17,19], handleQ]] as const).map(([lbl, val, opts, setter]) => (
          <div key={lbl}>
            <label className="text-[13px] font-mono font-bold text-white/50 block mb-2">{lbl}</label>
            <select value={val} onChange={e => setter(+e.target.value)}
              className="w-full rounded-xl px-4 py-2.5 font-mono text-[15px] text-white outline-none transition-colors hover:bg-white/5 cursor-pointer appearance-none"
              style={{ background: 'rgba(167,139,250,0.06)', border: `1px solid ${pNum === qNum ? 'rgba(248,113,113,0.4)' : 'rgba(167,139,250,0.2)'}` }}>
              {(opts as readonly number[]).map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {!valid && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3 rounded-xl px-5 py-3.5 mt-1"
            style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)' }}>
            <AlertTriangle size={18} className="text-red-400 shrink-0" />
            <span className="text-red-400 text-[14px] font-mono">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {valid && (
        <>
          <div className="rounded-2xl p-4 space-y-2 mt-1" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <CodeLine label="n = p × q"         value={`= ${n}`} />
            <CodeLine label="φ(n) = (p-1)(q-1)" value={`= ${phi}`} />
            <CodeLine label="e (clave pública)"  value={`= ${e}`}  color="#34d399" />
            <CodeLine label="d (clave privada)"  value={`= ${d}`}  color="#a78bfa" />
          </div>

          <div className="mt-1">
            <label className="text-[13px] font-mono font-bold text-white/50 block mb-2">Mensaje m (1 … {String(n - 1n)})</label>
            <input type="number" value={msgNum} min={1} max={Number(n - 1n)}
              onChange={e => handleMsg(Math.max(1, Math.min(+e.target.value, Number(n - 1n))))}
              className="w-full rounded-xl px-4 py-2.5 font-mono text-[15px] text-white outline-none transition-colors focus:border-white/30"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>

          <div className="flex gap-3 mt-1">
            <Button variant="primary" className="flex-1 py-3 text-[15px] font-bold" onClick={encrypt}><Lock size={16} /> Cifrar</Button>
            <Button variant="violet"  className="flex-1 py-3 text-[15px] font-bold" onClick={decrypt} disabled={step !== 'enc'}><Unlock size={16} /> Descifrar</Button>
          </div>

          <AnimatePresence>
            {step !== 'idle' && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="rounded-2xl p-4 space-y-2 mt-1" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <CodeLine label="c = mᵉ mod n" value={`= ${cipher}`} color="#34d399" />
                {step === 'dec' && (
                  <div className="flex items-center gap-3">
                    <CodeLine label="m' = cᵈ mod n" value={`= ${plain}`} color="#a78bfa" />
                    {plain === m && <span className="text-[13px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">✓ idéntico</span>}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  )
}
