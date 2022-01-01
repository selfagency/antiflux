import { decrypt, encrypt } from '../src/crypto'
import { EncryptedData } from '../src/types'
import vars from './helpers/vars'

const { key, testString } = vars

test('encrypt', () => {
  const output = encrypt(key, testString)
  expect(output).toBeDefined()
})

test('encrypt without string', () => {
  const output = encrypt(key, null)
  expect(output).toBeUndefined()
})

test('encrypt without key', () => {
  expect(() => encrypt(null, testString)).toThrow()
})

test('decrypt', () => {
  const encrypted = <EncryptedData>encrypt(key, testString)
  const decrypted = decrypt(key, encrypted)
  expect(decrypted).toBe(testString)
})

test('decrypt without encrypted data', () => {
  const decrypted = decrypt(key, null)
  expect(decrypted).toBeUndefined()
})

test('decrypt without key', () => {
  const encrypted = <EncryptedData>encrypt(key, testString)
  expect(() => decrypt(null, encrypted)).toThrow()
})
