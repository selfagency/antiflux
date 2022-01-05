import crypto from 'crypto'
import type { EncryptedData, Schema } from './index.d'

const algo = 'aes-256-gcm'

const encrypt = (key: string, value: unknown): EncryptedData | void => {
  try {
    if (!key) {
      throw new Error('You must specify an encryption key')
    } else {
      if (value) {
        if (typeof value !== 'string') value = JSON.stringify(value)
        const iv = crypto.randomBytes(12)
        const cipher = crypto.createCipheriv(algo, key, iv)
        let enc = cipher.update(<string>value, 'utf8', 'base64')
        enc += cipher.final('base64')
        const data = { enc, iv, tag: cipher.getAuthTag() }
        return data
      } else {
        if (process.env.DEBUG) console.log('No data to encrypt')
        return
      }
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}

const decrypt = (key: string, data: EncryptedData): Schema | void => {
  try {
    if (!key) {
      throw new Error('You must specify an encryption key')
    } else {
      if (data) {
        const { enc, iv, tag } = data
        const decipher = crypto.createDecipheriv(algo, key, Buffer.from(iv))
        decipher.setAuthTag(Buffer.from(tag))
        let output = decipher.update(enc, 'base64', 'utf8')
        output += decipher.final('utf8')
        return JSON.parse(output)
      } else {
        if (process.env.DEBUG) console.log('No data to decrypt')
        return
      }
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}

export { encrypt, decrypt }
