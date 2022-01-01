import { decrypt } from '../src/crypto'
import { read, write } from '../src/io'
import type { Schema } from '../src/store'
import Store from '../src/store'
import del from './helpers/del'
import vars from './helpers/vars'

const { key, path, state } = vars

test('persist data', () => {
  const localState = Object.assign({}, state)
  const localPath = path

  del(localPath)

  const store = new Store(localState, { persist: localPath })
  const fromFile = read(localPath)

  del(localPath)

  expect(fromFile).toStrictEqual(localState)
})

test('read persisted data', () => {
  const localState = Object.assign({}, state)
  const localPath = path

  del(localPath)

  write(localPath, localState)
  const store = new Store({}, { persist: localPath })

  del(localPath)

  expect(store.state).toStrictEqual(localState)
})

test('delete persisted data', () => {
  const localState = Object.assign({}, state)
  const localPath = path

  del(localPath)

  const store = new Store(state, { persist: path, debug: true })
  store.delete('foo')
  delete localState.foo

  del(localPath)

  expect(store.dump(true)).toStrictEqual(localState)
})

test('clear persisted data', async () => {
  const localState = Object.assign({}, state)
  const localPath = path

  del(localPath)

  const store = new Store(localState, { persist: localPath, debug: true })
  store.clear()

  const fromFile = read(localPath)

  del(localPath)

  expect(fromFile).toStrictEqual({})
})

test('persist encrypted data', () => {
  const localState = Object.assign({}, state)
  const localPath = path

  del(localPath)

  const store = new Store(localState, { persist: localPath, encryptKey: key })
  const fromFile = read(path)

  for (const f in <Schema>fromFile) {
    console.log(fromFile)
    if (fromFile[f]) {
      fromFile[f] = decrypt(key, fromFile[f])
    }
  }

  del(localPath)

  expect(fromFile).toStrictEqual(state)
})
