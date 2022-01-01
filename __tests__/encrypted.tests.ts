import Store from '../src/store'
import vars from './helpers/vars'

const { key, state } = vars

test('initialize encrypted store', () => {
  const localState = Object.assign({}, state)
  const store = new Store(localState, { encryptKey: key })
  expect(store).toBeDefined()
})

test('get encrypted key', () => {
  const localState = Object.assign({}, state)
  const store = new Store(localState, { encryptKey: key })
  expect(store.get('foo')).toBe('bar')
})

test('dump encrypted store', () => {
  const localState = Object.assign({}, state)
  const store = new Store(localState, { encryptKey: key })
  expect(store.dump()).toEqual(localState)
})
