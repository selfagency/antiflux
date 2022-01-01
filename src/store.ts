import { EventEmitter } from 'events'
import { existsSync } from 'fs'
import { decrypt, encrypt } from './crypto'
import { read, write } from './io'

export interface Schema {
  [key: string]: any
}

export interface Options {
  persist?: string
  encryptKey?: string
  debug?: boolean
}

export interface Getter {
  (state: Schema): any
}

export default class Store {
  watch: EventEmitter
  getters?: {
    [key: string]: Getter
  }
  options: Options
  state: Schema = {}

  constructor(initialState: Schema = {}, options: Options = {}, getters: Record<string, Getter> = {}) {
    this.options = options
    if (options.debug) process.env.DEBUG = 'true'
    this.watch = new EventEmitter()

    // configure debugging statements
    if (options.debug) {
      this.watch.on('set', data => {
        console.log(`(Store) ${data.key}: ${data.prior} ➟ ${data.value}`)
      })

      this.watch.on('delete', data => {
        console.log(`(Store) ${data.key}: ${data.prior} ➟ DELETED`)
      })

      this.watch.on('clear', () => {
        console.log(`(Store) STATE ➟ CLEARED`)
      })
    }

    if (options.persist) {
      const save = () => {
        const dump = this.dump()
        if (options.debug) {
          console.log('Writing to disk:')
          console.log(dump)
        }
        write(<string>options.persist, dump)
      }

      this.watch.on('set', () => save())
      this.watch.on('delete', () => save())
      this.watch.on('clear', () => save())
    }

    // read and write persisted data
    if (options.persist && existsSync(options.persist)) {
      const data = read(options.persist)

      for (const key in <Schema>data) {
        this.set(key, data[key])
      }
    } else {
      // set initial state from schema
      for (const key in initialState) {
        this.set(key, initialState[key])
      }
    }

    if (getters) {
      this.getters = getters
    }
  }

  // get key
  get(key: string) {
    if (this.state[key]) {
      return this.options.encryptKey ? decrypt(this.options.encryptKey, this.state[key]) : this.state[key]
    } else {
      if (key.includes('.')) {
        const keys = key.split('.')
        let current
        for (const k in keys) {
          if (!current) {
            current = this.state[keys[k]]
          } else {
            current = current[keys[k]]
          }
        }
        return this.options.encryptKey ? decrypt(this.options.encryptKey, current) : current
      }

      return undefined
    }
  }

  // execute getter
  getter(gtr: string) {
    if (this.getters && this.getters[gtr]) {
      return this.getters[gtr](this.dump())
    }
  }

  // dump data
  dump(decryptData = false): Schema {
    if (this.options.encryptKey && decryptData) {
      const localState: Schema = Object.assign({}, this.state)
      for (const key in localState) {
        localState[key] = decrypt(this.options.encryptKey, localState[key])
      }
      return localState
    } else {
      return this.state
    }
  }

  // set key
  set(key: string, value): void {
    const prior = this.get(key)

    if (this.options.encryptKey) {
      this.state[key] = encrypt(this.options.encryptKey, value)
    } else {
      this.state[key] = value
    }
    this.watch.emit('set', { key, value, prior })
  }

  // has key
  has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.state, key)
  }

  // delete key
  delete(key: string): void {
    const prior = this.get(key)
    delete this.state[key]
    this.watch.emit('delete', { key, prior })
  }

  // clear keys
  clear(): void {
    for (const key in this.state) {
      delete this.state[key]
    }
    this.watch.emit('clear')
  }
}
