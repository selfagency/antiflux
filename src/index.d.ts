import type EventEmitter from 'events'

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

declare class Store {
  watch: EventEmitter
  getters?: {
    [key: string]: Getter
  }
  options: Options
  state: Schema
  constructor(initialState?: Schema, options?: Options, getters?: Record<string, Getter>)
  get(key: string): any
  getter(gtr: string): unknown
  dump(): Schema
  set(key: string, value: unknown): void
  has(key: string): boolean
  delete(key: string): void
  clear(): void
}

export { Store, EventEmitter, Schema, Options, Getter, EncryptedData }

export default Store
