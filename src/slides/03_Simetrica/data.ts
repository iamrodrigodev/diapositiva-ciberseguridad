export interface AlgoSpec {
  id: string; label: string; bits: number; rounds: number
  status: 'secure' | 'broken' | 'legacy'
  statusLabel: string
  color: string
  note: string
  detail: string
}

export const ALGOS: AlgoSpec[] = [
  {
    id: 'AES', label: 'AES-256', bits: 256, rounds: 14,
    status: 'secure', statusLabel: 'SEGURO',
    color: '#34d399',
    note: 'Estándar mundial desde 2001 (NIST). Usado en TLS 1.3, SSH, BitLocker, WhatsApp y prácticamente todo sistema moderno.',
    detail: 'Clave de 256 bits → 2²⁵⁶ combinaciones. Con hardware actual tardaría más que la edad del universo en romperlo.',
  },
  {
    id: 'DES', label: 'DES', bits: 56, rounds: 16,
    status: 'broken', statusLabel: 'ROTO',
    color: '#f87171',
    note: 'Diseñado en 1977 por IBM. Roto públicamente en 1999: la EFF lo descifró en 22 horas con hardware especial.',
    detail: 'Clave de solo 56 bits → apenas 2⁵⁶ combinaciones. Hoy se rompe en segundos con GPUs modernas. NO usar.',
  },
  {
    id: '3DES', label: '3DES', bits: 112, rounds: 48,
    status: 'legacy', statusLabel: 'OBSOLETO',
    color: '#fbbf24',
    note: 'Parche temporal: aplica DES tres veces seguidas. Deprecado por NIST en 2019. 3× más lento que AES, vulnerable a Sweet32.',
    detail: 'Sweet32: con 256 GB de datos cifrados se puede recuperar texto. El ataque es práctico en sesiones largas.',
  },
]
