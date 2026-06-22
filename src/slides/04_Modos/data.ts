import { ShieldAlert, Shield, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Mode = 'ECB' | 'CBC' | 'GCM'

export interface ModeSpec {
  id: Mode; icon: LucideIcon; color: string
  status: string; full: string; desc: string; secure: boolean
}

export const MODES: ModeSpec[] = [
  { id: 'ECB', icon: ShieldAlert,  color: '#f87171', status: 'INSEGURO',    full: 'Electronic Codebook',   secure: false,
    desc: 'Cada bloque se cifra independientemente. Igual entrada → igual salida. El patrón del mensaje queda visible en el ciphertext.' },
  { id: 'CBC', icon: Shield,       color: '#fbbf24', status: 'ESTÁNDAR',    full: 'Cipher Block Chaining',  secure: true,
    desc: 'Cada bloque se XOR con el bloque cifrado anterior (IV para el primero). Oculta patrones pero no provee autenticación.' },
  { id: 'GCM', icon: ShieldCheck,  color: '#34d399', status: 'RECOMENDADO', full: 'Galois/Counter Mode',   secure: true,
    desc: 'Counter Mode + Galois MAC. Cifra Y autentica los datos. Detecta cualquier manipulación. Usado en TLS 1.3.' },
]
