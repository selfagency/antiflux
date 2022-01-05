import { EventEmitter } from 'events'
import Antiflux from './store'

export class Watch extends EventEmitter {
  constructor() {
    super()
  }
}

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

export { Antiflux, Schema, Options, Getter, EncryptedData }
export default Antiflux
