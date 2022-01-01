import Store from '../src/store'

test('event handler / debugger', () => {
  console.log = jest.fn()

  const store = new Store({}, { debug: true })

  store.set('foo', 'bar')
  expect(console.log).toHaveBeenCalledWith('(Store) foo: undefined ➟ bar')

  store.set('foo', 'baz')
  expect(console.log).toHaveBeenCalledWith('(Store) foo: bar ➟ baz')

  store.delete('foo')
  expect(console.log).toHaveBeenCalledWith('(Store) foo: baz ➟ DELETED')

  store.clear()
  expect(console.log).toHaveBeenCalledWith('(Store) STATE ➟ CLEARED')
})
