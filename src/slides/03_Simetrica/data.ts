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
    id: 'AES', label: 'AES', bits: 256, rounds: 14,
    status: 'secure', statusLabel: 'SEGURO',
    color: '#34d399',
    note: 'Estándar mundial desde 2001 (NIST). Usado en TLS 1.3, SSH, BitLocker, WhatsApp y prácticamente todo sistema moderno.',
    detail: 'Opera en bloques de 128 bits con tres variantes de clave: AES-128 (10 rondas), AES-192 (12 rondas) y AES-256 (14 rondas). Con clave de 256 bits hay 2²⁵⁶ combinaciones — más que la edad del universo para romperlo por fuerza bruta.',
  },
  {
    id: 'DES', label: 'DES', bits: 56, rounds: 16,
    status: 'broken', statusLabel: 'ROTO',
    color: '#f87171',
    note: 'Diseñado en 1977 por IBM. Roto públicamente en 1999: la EFF lo descifró en 22 horas con hardware especial.',
    detail: 'Clave de solo 56 bits → apenas 2⁵⁶ combinaciones. Hoy se rompe en segundos con GPUs modernas. NO usar nunca.',
  },
  {
    id: '3DES', label: '3DES', bits: 112, rounds: 48,
    status: 'legacy', statusLabel: 'OBSOLETO',
    color: '#fbbf24',
    note: 'Parche temporal: aplica DES tres veces (Cifrar–Descifrar–Cifrar). Deprecado por NIST en 2019. 3× más lento que AES.',
    detail: 'Seguridad efectiva de 112 bits por el ataque meet-in-the-middle. Vulnerable a Sweet32: con ~256 GB de datos cifrados se puede recuperar texto en sesiones largas.',
  },
]
