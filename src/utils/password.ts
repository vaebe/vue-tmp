import AES from 'crypto-js/aes'
import encUtf8 from 'crypto-js/enc-utf8'

/** 密钥 与后端保持一致 */
const key = 'AD-PASSWORD-45678'

// 解密
export function Decrypt(word: string): string {
  if (!word) {
    return word
  }

  const bytes = AES.decrypt(word, key)
  return bytes.toString(encUtf8)
}

// 加密
export function Encrypt(word: string): string {
  if (!word) {
    return word
  }
  return AES.encrypt(word, key).toString()
}
