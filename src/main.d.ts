import type { EventEmitter } from 'events'
import Store from './store'

interface Schema {
  [key: string]: unknown
}

interface Options {
  persist?: string
  encryptKey?: string
  debug?: boolean
}

interface Getter {
  (state: Schema): unknown
}

interface EncryptedData {
  enc: string
  iv: Buffer
  tag: Buffer
}

export { Store, Schema, Options, Getter, EncryptedData, EventEmitter }
