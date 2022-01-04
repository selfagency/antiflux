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

declare class Antiflux extends Store {}

export type { Antiflux, Schema, Options, Getter, EncryptedData, EventEmitter }

// @ts-ignore
module.default = Antiflux
export default Antiflux
