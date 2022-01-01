import { unlink } from 'fs'
import { promisify } from 'util'
import { read, write } from '../src/io'
import vars from './helpers/vars'

const delFile = promisify(unlink)
const { path, state } = vars

test('write', () => {
  expect(() => write(path, state)).not.toThrow()
})

test('read', () => {
  const input = read(path)
  expect(input).toStrictEqual(state)
  delFile(path)
})

test('read without path', () => {
  const input = read(null)
  expect(input).toBeUndefined()
})
