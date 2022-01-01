import Store from '../src/store'
import vars from './helpers/vars'

const { state } = vars

test('initialize store', () => {
  const localState = Object.assign({}, state)
  const store = new Store(localState)
  expect(store).toBeDefined()
})

test('dump store', () => {
  const localState = Object.assign({}, state)
  const store = new Store(localState)
  expect(store.dump(true)).toEqual(localState)
})

test('set key / has key', () => {
  const localState = Object.assign({}, state)
  const store = new Store()
  for (const key in localState) {
    store.set(key, localState[key])
  }
  expect(store.has('foo')).toBe(true)
})

test('get key', () => {
  const localState = Object.assign({}, state)
  const store = new Store(localState)
  expect(store.get('foo')).toBe('bar')
})

test('get deep key', () => {
  const localState = Object.assign(
    {
      deep: {
        deeper: {
          deepest: 'deeperest'
        }
      }
    },
    state
  )
  console.log(localState)
  const store = new Store(localState)
  expect(store.get('deep.deeper.deepest')).toBe('deeperest')
})
