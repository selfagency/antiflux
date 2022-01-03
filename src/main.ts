import Antiflux from './store'

export interface Schema {
  [key: string]: unknown
}

export interface Options {
  persist?: string
  encryptKey?: string
  debug?: boolean
}

export interface Getter {
  (state: Schema): unknown
}

export interface EncryptedData {
  enc: string
  iv: Buffer
  tag: Buffer
}

export default Antiflux
