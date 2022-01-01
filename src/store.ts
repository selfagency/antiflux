import { EventEmitter } from 'events'
import { existsSync } from 'fs'
import { read, write } from './io'
import type { Getter, Options, Schema } from './main'
import { deepset } from './util'

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
        write(<string>options.persist, dump, options.encryptKey)
      }

      this.watch.on('set', () => save())
      this.watch.on('delete', () => save())
      this.watch.on('clear', () => save())
    }

    // read and write persisted data
    if (options.persist && existsSync(options.persist)) {
      const data = read(options.persist, options.encryptKey)

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
      return this.state[key]
    } else {
      if (key.includes('.')) {
        const keys = key.split('.')
        let current
        for (const k in keys) {
          current = current ? current[keys[k]] : this.state[keys[k]]
        }
        return current
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
  dump(): Schema {
    const localState: Schema = Object.assign({}, this.state)
    return localState
  }

  // set key
  set(key: string, value: unknown): void {
    const prior = this.get(<string>key)

    if (key.includes('.')) {
      this.state = <Schema>deepset(this.state, key, value)
    } else {
      this.state[<string>key] = value
    }

    this.watch.emit('set', { key, value, prior })
  }

  // has key
  has(key: string): boolean {
    if (key.includes('.')) {
      const keys = key.split('.')
      let current = {}
      for (const k in keys) {
        current = current ? current[keys[k]] : this.state[keys[k]]
      }
      return current !== undefined
    } else {
      return Object.prototype.hasOwnProperty.call(this.state, key)
    }
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
