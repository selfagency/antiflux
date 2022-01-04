import fs from 'fs'
import { decrypt, encrypt } from './crypto'
import type { EncryptedData, Schema } from './main.d'

const readFile = fs.readFileSync
const writeFile = fs.writeFileSync

function sort(obj) {
  return Object.keys(obj)
    .sort()
    .reduce(function (result, key) {
      result[key] = obj[key]
      return result
    }, {})
}

const write = (path: string, data: Schema | EncryptedData, key?: string): void => {
  try {
    if (key) {
      data = <EncryptedData>encrypt(key, data)
    }

    writeFile(path, JSON.stringify(data), 'utf8')
  } catch (err) {
    throw new Error('Could not write to file')
  }
}

const read = (path: string, key?: string): Schema | void => {
  try {
    if (fs.existsSync(path)) {
      let data: string | Schema | EncryptedData = readFile(path, 'utf8')
      data = <EncryptedData>JSON.parse(data)

      if (key) {
        data = <Schema>decrypt(key, data)
      }

      return sort(data)
    } else {
      throw new Error('File does not exist')
    }
  } catch (err) {
    console.error(err)
  }
}

export { read, write }
