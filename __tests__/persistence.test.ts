import { read, write } from '../src/io'
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

  expect(store.dump()).toStrictEqual(localState)
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
  const fromFile = read(path, key)

  del(localPath)

  expect(fromFile).toStrictEqual(state)
})
