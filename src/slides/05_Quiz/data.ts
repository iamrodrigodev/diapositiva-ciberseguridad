export interface Question { q: string; opts: string[]; correct: number; explain: string }

export const QUESTIONS: Question[] = [
  {
    q: '¿Cuál modo de operación revela patrones en imágenes cifradas?',
    opts: ['CBC — Cipher Block Chaining', 'GCM — Galois/Counter Mode', 'ECB — Electronic Codebook', 'CTR — Counter Mode'],
    correct: 2,
    explain: 'ECB cifra cada bloque de forma independiente. Bloques idénticos → ciphertext idéntico. El patrón del mensaje queda visible (el famoso "pingüino ECB").',
  },
  {
    q: 'AES-128 tiene _____ rondas de cifrado',
    opts: ['8 rondas', '10 rondas', '12 rondas', '16 rondas'],
    correct: 1,
    explain: 'AES-128 usa 10 rondas, AES-192 usa 12 y AES-256 usa 14. Cada ronda aplica: SubBytes, ShiftRows, MixColumns y AddRoundKey.',
  },
  {
    q: '¿Cuál algoritmo fue declarado OBSOLETO por NIST en 2019?',
    opts: ['AES-256', 'ChaCha20', '3DES (Triple DES)', 'GCM'],
    correct: 2,
    explain: '3DES fue obsoleto por NIST en 2019 por su baja velocidad y la vulnerabilidad Sweet32 (birthday attack en bloques de 64 bits). AES-256 es el reemplazo.',
  },
]

export const OPT_COLORS = ['#60a5fa', '#34d399', '#f59e0b', '#a78bfa']
