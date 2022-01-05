import { EventEmitter } from 'events'
import Store from './store'

export class Antiflux extends Store {}
export class Watch extends EventEmitter {}

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
