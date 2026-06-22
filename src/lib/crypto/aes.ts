import { toHex } from '../utils'

export async function genAESKey(): Promise<{ key: CryptoKey; keyHex: string }> {
  const key = await crypto.subtle.generateKey(
    { name: 'AES-CBC', length: 256 }, true, ['encrypt', 'decrypt']
  )
  const raw = await crypto.subtle.exportKey('raw', key)
  const hex = toHex(raw).replace(/ /g, '').slice(0, 16) + '…'
  return { key, keyHex: hex }
}

export async function aesEncrypt(
  text: string,
  key: CryptoKey,
  iv: Uint8Array
): Promise<string> {
  const data = new TextEncoder().encode(text)
  const enc  = await crypto.subtle.encrypt({ name: 'AES-CBC', iv: iv as unknown as ArrayBuffer }, key, data)
  return toHex(enc).slice(0, 64) + '…'
}

export function freshIV(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(16))
}
