import fs from 'fs'

interface Schema {
  [key: string]: any
}

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

const write = (path: string, data: Schema): void => {
  try {
    writeFile(path, JSON.stringify(data), 'utf8')
  } catch (err) {
    throw new Error('Could not write to file')
  }
}

const read = (path: string): Schema | void => {
  try {
    if (fs.existsSync(path)) {
      const data = readFile(path, 'utf8')
      return sort(JSON.parse(<string>data))
    } else {
      throw new Error('File does not exist')
    }
  } catch (err) {
    console.error(err)
  }
}

export { read, write }
