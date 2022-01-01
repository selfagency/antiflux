import crypto from 'crypto'

export default {
  testObj: { welcomeMySon: 'Welcome to the machine' },
  key: 'bWDlfrMxr1cnl4F4sdOvoKEOO9WY628a',
  path: `${process.env.HOME}/.general_store_test_${crypto.randomBytes(12).toString('hex')}`,
  state: {
    baz: 'qux',
    foo: 'bar'
  }
}
