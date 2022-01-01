import { decrypt, encrypt } from '../src/crypto'
import { EncryptedData } from '../src/main'
import Store from '../src/store'
import vars from './helpers/vars'

const { key, state, testObj } = vars

test('initialize encrypted store', () => {
  const localState = Object.assign({}, state)
  const store = new Store(localState, { encryptKey: key })
  expect(store).toBeDefined()
})

test('encrypt', () => {
  const output = encrypt(key, testObj)
  expect(output).toBeDefined()
})

test('encrypt without string', () => {
  const output = encrypt(key, null)
  expect(output).toBeUndefined()
})

test('encrypt without key', () => {
  expect(() => encrypt(null, testObj)).toThrow()
})

test('decrypt', () => {
  const encrypted = <EncryptedData>encrypt(key, testObj)
  const decrypted = decrypt(key, encrypted)
  expect(decrypted).toStrictEqual(testObj)
})

test('decrypt without encrypted data', () => {
  const decrypted = decrypt(key, null)
  expect(decrypted).toBeUndefined()
})

test('decrypt without key', () => {
  const encrypted = <EncryptedData>encrypt(key, testObj)
  expect(() => decrypt(null, encrypted)).toThrow()
})
