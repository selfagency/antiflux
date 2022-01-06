import Store from '../dist/index.js'

test('instantiate', () => {
  const antiflux = new Store()
  expect(antiflux).toBeInstanceOf(Store)
})

test('set/has/get', () => {
  const antiflux = new Store()
  antiflux.set('foo', 'bar')
  expect(antiflux.has('foo')).toBeTruthy()
  expect(antiflux.get('foo')).toBe('bar')
})
