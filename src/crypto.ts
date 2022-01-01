import crypto from 'crypto'

interface EncryptedData {
  enc: string
  iv: Buffer
  tag: Buffer
}

const algo = 'aes-256-gcm'

const encrypt = (key: string, str: string): EncryptedData | void => {
  try {
    if (!key) {
      throw new Error('You must specify an encryption key')
    } else {
      if (str) {
        const iv = crypto.randomBytes(12)
        const cipher = crypto.createCipheriv(algo, key, iv)
        let enc = cipher.update(str, 'utf8', 'base64')
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

const decrypt = (key: string, data: EncryptedData): string | void => {
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
        return output
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
