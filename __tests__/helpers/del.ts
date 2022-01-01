import { existsSync, unlink } from 'fs'
import { promisify } from 'util'

const delFile = promisify(unlink)

const del = async (localPath: string): Promise<void> => {
  try {
    if (existsSync(localPath)) await delFile(localPath)
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default del
