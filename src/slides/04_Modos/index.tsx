import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import PixelGrid from '../../components/PixelGrid'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import ModeSelector from './ModeSelector'
import BlockDemo from './BlockDemo'
import type { Mode } from './data'

export default function Modos() {
  const [mode, setMode] = useState<Mode>('ECB')

  return (
    <SlideLayout>
      <Tag>Modos de Operación · Rodrigo</Tag>
      <Title>ECB, CBC y GCM</Title>

      <div className="flex gap-5 flex-1 overflow-hidden">
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 w-[32%] pt-1">
          <p className="text-xs font-mono text-white/35 tracking-widest uppercase self-start">
            Imagen cifrada con {mode}
          </p>
          <PixelGrid mode={mode} />
          <p className="text-sm font-bold" style={{ color: mode === 'ECB' ? '#f87171' : '#34d399' }}>
            {mode === 'ECB' ? '⚠ Patrón visible — inseguro' : '✓ Patrón oculto — seguro'}
          </p>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs font-mono text-white/25">Original (sin cifrar)</p>
            <PixelGrid mode="ECB" small />
          </div>
          <p className="text-xs text-white/30 text-center leading-relaxed">
            {mode === 'ECB'
              ? 'ECB cifra cada bloque igual → bloques idénticos dan el mismo resultado. El patrón queda visible.'
              : mode === 'CBC'
                ? 'CBC encadena bloques con XOR + IV → cada bloque depende del anterior. Patrón destruido.'
                : 'GCM usa contador + autenticación → cifra y detecta manipulaciones. El más seguro.'}
          </p>
        </motion.div>

        <div className="flex flex-col flex-1 gap-3">
          <motion.div variants={fadeUp}>
            <ModeSelector active={mode} onChange={setMode} />
          </motion.div>
          <BlockDemo mode={mode} />
        </div>
      </div>
    </SlideLayout>
  )
}
