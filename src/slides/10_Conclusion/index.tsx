import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import TorusKnot from './TorusKnot'

const SUMMARY = [
  {
    color: '#34d399', heading: 'Simétrica (AES/DES/3DES)',
    body: 'Una sola clave para cifrar y descifrar. AES-256 es el estándar actual: rápido, seguro, inrompible. DES está roto. 3DES, obsoleto.',
  },
  {
    color: '#60a5fa', heading: 'Asimétrica (RSA / ECC)',
    body: 'Par de claves: pública para cifrar, privada para descifrar. RSA usa factorización; ECC usa curvas elípticas con claves más cortas.',
  },
  {
    color: '#a78bfa', heading: 'Diffie-Hellman',
    body: 'Permite que dos partes acuerden una clave secreta a través de un canal público sin jamás transmitirla. Base del "Forward Secrecy".',
  },
  {
    color: '#fbbf24', heading: 'Modos de operación (ECB / CBC / GCM)',
    body: 'ECB es inseguro: bloques iguales → ciphertext igual. CBC encadena bloques con IV. GCM cifra Y autentica: el modo recomendado hoy.',
  },
]

export default function Conclusion() {
  return (
    <SlideLayout>
      <Tag>Conclusión · Ambos</Tag>
      <Title>Resumen</Title>

      <div className="flex gap-6 flex-1 overflow-hidden">
        <motion.div variants={fadeUp} className="w-[35%] flex flex-col justify-center gap-4">
          <TorusKnot />
          <div className="rounded-2xl px-5 py-4 text-center"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-sm text-white/75 leading-relaxed">
              La criptografía es invisible pero está en cada conexión HTTPS, cada mensaje de WhatsApp, cada transacción bancaria.
            </p>
            <p className="font-mono text-xs text-white/50 mt-3">
              Carlos Daniel Aguilar Chirinos · Rodrigo Emerson Infanzon Acosta
            </p>
            <p className="font-mono text-xs text-white/40 mt-1">CIBERSEGURIDAD · 2026</p>
          </div>
        </motion.div>

        <motion.div variants={stagger} className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
          {SUMMARY.map(({ color, heading, body }) => (
            <motion.div key={heading} variants={fadeUp}
              className="rounded-2xl px-5 py-4"
              style={{ background: `${color}08`, border: `1px solid ${color}22` }}>
              <h3 className="font-bold text-base mb-1.5" style={{ color }}>{heading}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideLayout>
  )
}
