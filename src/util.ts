import type { Schema } from './main.d'

const deepset = (state: Schema, target: string, value: unknown) => {
  if (target.includes('.')) {
    const keys = target.split('.')
    const root = state[keys[0]]
    let update = ''

    if (keys.length > 1) {
      let i = 1

      while (i < keys.length) {
        update += `{ "${keys[i]}": `
        i++
      }

      update += typeof value === 'string' ? `"${value}"` : JSON.stringify(value)

      i = 1
      while (i < keys.length) {
        update += ' }'
        i++
      }

      update = JSON.parse(update)
      state[keys[0]] = Object.assign(root, update)
      return state || {}
    }
  }
}

export { deepset }
