import { useState, useRef, useCallback, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import { genAESKey, aesEncrypt, freshIV } from '../../lib/crypto/aes'

export default function AESDemo() {
  const [input,   setInput]   = useState('Hola Mundo!')
  const [output,  setOutput]  = useState('')
  const [keyHex,  setKeyHex]  = useState('')
  const [loading, setLoading] = useState(false)
  const keyRef = useRef<CryptoKey | null>(null)
  const ivRef  = useRef<Uint8Array>(new Uint8Array(16))

  const encrypt = useCallback(async (text: string) => {
    if (!keyRef.current || !text.trim()) return
    setLoading(true)
    try { setOutput(await aesEncrypt(text, keyRef.current, ivRef.current)) }
    finally { setLoading(false) }
  }, [])

  const newKey = useCallback(async () => {
    const { key, keyHex: hex } = await genAESKey()
    keyRef.current = key
    ivRef.current  = freshIV()
    setKeyHex(hex)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    newKey()
  }, [newKey])

  useEffect(() => {
    encrypt(input)
  }, [input, encrypt])

  return (
    <div className="flex-1 flex flex-col rounded-2xl p-5 gap-3"
      style={{ background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.18)' }}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">Demo AES-256-CBC en vivo</span>
        <button onClick={newKey}
          className="flex items-center gap-1 text-xs text-emerald-400/60 hover:text-emerald-400 font-mono transition-colors">
          <RefreshCw size={11} /> nueva clave
        </button>
      </div>

      <div>
        <label className="text-white/40 text-xs font-mono block mb-1">Mensaje</label>
        <input value={input} onChange={e => setInput(e.target.value)} maxLength={48}
          className="w-full rounded-lg px-3 py-2.5 text-sm font-mono text-white outline-none"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
          placeholder="Escribe algo…" />
      </div>

      <div>
        <label className="text-white/40 text-xs font-mono block mb-1">Clave AES-256 (hex)</label>
        <div className="font-mono text-xs text-emerald-400/70 rounded-lg px-3 py-2.5 break-all leading-relaxed"
          style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)' }}>
          {keyHex || '…'}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <label className="text-white/40 text-xs font-mono block mb-1">Ciphertext (hex)</label>
        <div className="flex-1 font-mono text-xs rounded-lg px-3 py-2.5 break-all leading-relaxed"
          style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.15)', color: loading ? '#60a5fa55' : '#60a5fa' }}>
          {loading ? 'cifrando…' : (output || '—')}
        </div>
      </div>

      <p className="font-mono text-xs text-white/25 text-center">Cifrado real en el navegador · Web Crypto API</p>
    </div>
  )
}
