import Store from '../src/store'
import type { Schema } from '../src/types.d'
import vars from './helpers/vars'

const { state } = vars

test('getters', () => {
  const localState = Object.assign({}, state)

  const getters = {
    foo(state: Schema) {
      return `-=${state.foo}=-`
    }
  }

  const store = new Store(localState, {}, getters)

  expect(store.getter('foo')).toStrictEqual('-=bar=-')
})
