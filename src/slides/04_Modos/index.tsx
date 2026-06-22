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
        {/* Pixel art demo */}
        <motion.div variants={fadeUp} className="flex flex-col items-center justify-start gap-5 w-[34%] pt-2">
          <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase self-start">
            Imagen cifrada con {mode}
          </p>
          <PixelGrid mode={mode} />
          <p className="font-mono text-[11px]" style={{ color: mode === 'ECB' ? '#f87171' : '#34d399' }}>
            {mode === 'ECB' ? '⚠ Patrón visible' : '✓ Patrón oculto'}
          </p>
          <div>
            <p className="font-mono text-[9px] text-white/20 text-center mb-1.5">Original</p>
            <PixelGrid mode="ECB" small />
          </div>
        </motion.div>

        {/* Info */}
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
