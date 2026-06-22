import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import { 
  FileVideo, LockKey, Envelope, ShieldCheck, 
  XCircle, CheckCircle, RocketLaunch, WarningCircle,
  Key
} from '@phosphor-icons/react'

type StepStatus = 'idle' | 'success' | 'error'

const STEPS = [
  {
    title: 'Paso 1: Confidencialidad del Archivo',
    scenario: 'Tienes un video ultra secreto de 1GB. ¿Cómo lo cifras para que nadie más lo vea?',
    options: [
      {
        id: 'rsa',
        title: 'Cifrar con RSA',
        subtitle: 'Asimétrico',
        icon: LockKey,
        color: '#a78bfa',
        isCorrect: false,
        feedback: '¡Craso error! RSA es lentísimo con datos grandes. El universo se acabaría antes de cifrar 1GB con matemática de primos puros.'
      },
      {
        id: 'aes',
        title: 'Cifrar con AES',
        subtitle: 'Simétrico',
        icon: Key,
        color: '#34d399',
        isCorrect: true,
        feedback: '¡Excelente! AES cifra gigabytes en milisegundos. El video está a salvo, pero ahora tienes una Clave AES secreta en tu mano.'
      }
    ]
  },
  {
    title: 'Paso 2: Distribución de la Clave',
    scenario: 'Tienes que enviar tu Clave secreta AES a Bob por Internet. ¿Cómo la proteges?',
    options: [
      {
        id: 'plain',
        title: 'Enviarla sin proteger',
        subtitle: 'Texto plano',
        icon: Envelope,
        color: '#f87171',
        isCorrect: false,
        feedback: '¡El hacker la interceptó! Acabas de regalarle la clave para abrir tu archivo de 1GB.'
      },
      {
        id: 'rsakey',
        title: 'Cifrar con Clave Pública de Bob',
        subtitle: 'RSA',
        icon: LockKey,
        color: '#a78bfa',
        isCorrect: true,
        feedback: '¡Brillante! Ahora el paquete viaja seguro. Solo Bob tiene la Clave Privada capaz de abrir esta "caja" y obtener la clave AES.'
      }
    ]
  },
  {
    title: 'Paso 3: Autenticidad (Firmas)',
    scenario: 'Bob recibe el paquete, pero... ¿cómo sabe que realmente se lo enviaste TÚ y no un hacker?',
    options: [
      {
        id: 'sign',
        title: 'Firmar con mi Clave Privada',
        subtitle: 'Firma Digital',
        icon: ShieldCheck,
        color: '#60a5fa',
        isCorrect: true,
        feedback: '¡Perfecto! Al cifrar un "sello" con tu Privada, Bob y el mundo entero pueden verificarlo usando tu Pública. Es tu firma innegable.'
      },
      {
        id: 'trust',
        title: 'Decirle "Soy Alice"',
        subtitle: 'Confianza ciega',
        icon: WarningCircle,
        color: '#f87171',
        isCorrect: false,
        feedback: 'Cualquiera en Internet puede fingir llamarse Alice o falsificar una dirección IP (Spoofing). Nunca confíes, verifica.'
      }
    ]
  }
]

export default function JuegoHibrido() {
  const [currentStep, setCurrentStep] = useState(0)
  const [status, setStatus] = useState<StepStatus>('idle')
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  
  const isFinished = currentStep >= STEPS.length

  const handleOptionClick = (optionId: string, isCorrect: boolean) => {
    if (status === 'success') return // Ya acertó
    setSelectedOption(optionId)
    setStatus(isCorrect ? 'success' : 'error')
  }

  const handleNext = () => {
    setCurrentStep(prev => prev + 1)
    setStatus('idle')
    setSelectedOption(null)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setStatus('idle')
    setSelectedOption(null)
  }

  return (
    <SlideLayout>
      <Tag>Interactive Demo · Criptografía Híbrida</Tag>
      <Title>El Desafío Híbrido</Title>

      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-3xl flex flex-col gap-6 relative z-10"
            >
              {/* Step Header */}
              <div className="text-center mb-2">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold text-white/70 tracking-widest uppercase mb-3">
                  Paso {currentStep + 1} de {STEPS.length}
                </span>
                <h2 className="text-[22px] font-bold text-white mb-2">{STEPS[currentStep].title}</h2>
                <p className="text-[16px] text-white/70 leading-relaxed max-w-xl mx-auto">
                  {STEPS[currentStep].scenario}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-4">
                {STEPS[currentStep].options.map(opt => {
                  const isSelected = selectedOption === opt.id
                  const isWrong = isSelected && status === 'error'
                  const isRight = isSelected && status === 'success'
                  
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionClick(opt.id, opt.isCorrect)}
                      disabled={status === 'success'}
                      className={`relative overflow-hidden rounded-2xl p-5 border text-left transition-all duration-300 ${
                        status === 'success' && !isSelected ? 'opacity-30 scale-95 grayscale' : 'hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                      }`}
                      style={{
                        background: isRight ? `${opt.color}15` : isWrong ? 'rgba(248,113,113,0.1)' : 'rgba(255,255,255,0.08)',
                        borderColor: isRight ? opt.color : isWrong ? '#f87171' : 'rgba(255,255,255,0.2)',
                        cursor: status === 'success' ? 'default' : 'pointer'
                      }}
                    >
                      {/* Top gradient for default state hover */}
                      {!isRight && !isWrong && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                      )}

                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors border"
                          style={{ 
                            background: isRight ? `${opt.color}20` : isWrong ? 'rgba(248,113,113,0.2)' : 'rgba(255,255,255,0.1)',
                            borderColor: isRight ? `${opt.color}40` : isWrong ? 'rgba(248,113,113,0.4)' : 'rgba(255,255,255,0.15)'
                          }}>
                          <opt.icon size={26} weight={isRight || isWrong ? 'fill' : 'duotone'} 
                            color={isRight ? opt.color : isWrong ? '#f87171' : '#fff'} />
                        </div>
                        <div>
                          <h3 className="font-bold text-[16px] text-white mb-0.5">{opt.title}</h3>
                          <span className="text-[12px] text-white/50 font-mono uppercase tracking-wider">{opt.subtitle}</span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Feedback Area */}
              <AnimatePresence>
                {status !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    className="overflow-hidden"
                  >
                    <div className={`mt-2 rounded-2xl p-5 border flex items-start gap-4 ${
                      status === 'success' 
                        ? 'bg-emerald-500/10 border-emerald-500/30' 
                        : 'bg-red-500/10 border-red-500/30'
                    }`}>
                      {status === 'success' ? (
                        <CheckCircle size={28} weight="fill" className="text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle size={28} weight="fill" className="text-red-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className={`text-[15px] leading-relaxed font-medium ${
                          status === 'success' ? 'text-emerald-100' : 'text-red-100'
                        }`}>
                          {STEPS[currentStep].options.find(o => o.id === selectedOption)?.feedback}
                        </p>
                        
                        {status === 'success' && (
                          <button
                            onClick={handleNext}
                            className="mt-4 px-6 py-2 rounded-xl bg-emerald-500 text-black font-bold text-[14px] hover:bg-emerald-400 transition-colors shadow-[0_0_15px_rgba(52,211,153,0.4)] hover:shadow-[0_0_25px_rgba(52,211,153,0.6)]"
                          >
                            {currentStep === STEPS.length - 1 ? 'Finalizar Protocolo' : 'Siguiente Paso →'}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ) : (
            /* FINISHED STATE */
            <motion.div 
              key="finished"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-2xl text-center relative z-10"
            >
              <div className="w-24 h-24 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500/50 mb-6 shadow-[0_0_50px_rgba(52,211,153,0.3)]">
                <RocketLaunch size={48} weight="duotone" className="text-emerald-400" />
              </div>
              <h2 className="text-[32px] font-bold text-white mb-4">¡Misión Cumplida!</h2>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 backdrop-blur-sm">
                <p className="text-[16px] text-white/80 leading-relaxed">
                  Acabas de recrear exactamente cómo funciona Internet hoy en día. Al combinar <strong className="text-emerald-400">Simétrica</strong> (para velocidad), <strong className="text-violet-400">Asimétrica</strong> (para enviar claves) y <strong className="text-blue-400">Firmas Digitales</strong> (para autenticar), has construido las bases del protocolo <strong className="text-white">TLS/HTTPS</strong>.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-lg bg-white/10 text-white/60 text-[13px] hover:bg-white/20 hover:text-white transition-colors"
              >
                ↻ Jugar de nuevo
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </SlideLayout>
  )
}
