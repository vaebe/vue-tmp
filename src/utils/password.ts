import { AES, enc } from 'crypto-js'

/** 密钥 与后端保持一致 */
const key = 'AD-PASSWORD-45678'

// 解密
export function Decrypt(word: string): string {
  if (!word)
    return word

  const bytes = AES.decrypt(word, key)
  return bytes.toString(enc.Utf8)
}

// 加密
export function Encrypt(word: string): string {
  if (!word)
    return word
  return AES.encrypt(word, key).toString()
}
