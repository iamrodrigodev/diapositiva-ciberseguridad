/**
 * Utilidades criptográficas simples para demostración en la interfaz.
 * NOTA: Esto es SOLO para fines educativos y visuales, NO es criptografía segura.
 */

// Simulador de cifrado (invierte el string y lo codifica en base64 para que parezca ilegible)
export function simulateEncrypt(plaintext: string): string {
  if (!plaintext) return ''
  try {
    const reversed = plaintext.split('').reverse().join('')
    return btoa(unescape(encodeURIComponent(reversed)))
  } catch {
    return 'ERR_ENC'
  }
}

// Simulador de descifrado
export function simulateDecrypt(ciphertext: string): string {
  if (!ciphertext) return ''
  try {
    const decoded = decodeURIComponent(escape(atob(ciphertext)))
    return decoded.split('').reverse().join('')
  } catch {
    return 'ERR_DEC'
  }
}
