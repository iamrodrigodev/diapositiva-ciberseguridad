export interface CompSpec { subject: string; Simetrica: number; Asimetrica: number }

export const RADAR_DATA: CompSpec[] = [
  { subject: 'Velocidad',        Simetrica: 95, Asimetrica: 30 },
  { subject: 'Seguridad',        Simetrica: 85, Asimetrica: 95 },
  { subject: 'Distribución',     Simetrica: 30, Asimetrica: 90 },
  { subject: 'Implementación',   Simetrica: 85, Asimetrica: 55 },
  { subject: 'Clave pequeña',    Simetrica: 60, Asimetrica: 90 },
  { subject: 'Escalabilidad',    Simetrica: 40, Asimetrica: 85 },
]

export const COMPARISONS = [
  { label: 'Misma clave',       sym: 'Cifrar y descifrar', asym: 'Par pública/privada' },
  { label: 'Velocidad',         sym: '⚡ Muy rápida',      asym: '🐢 Lenta (~1000×)' },
  { label: 'Distribución clave',sym: '⚠ Problema crítico', asym: '✓ Pública por diseño' },
  { label: 'Uso real',          sym: 'AES en AES-GCM',    asym: 'RSA/ECDH para intercambio' },
  { label: 'TLS 1.3',           sym: 'AEAD (ChaCha20)',   asym: 'ECDHE para handshake' },
]
