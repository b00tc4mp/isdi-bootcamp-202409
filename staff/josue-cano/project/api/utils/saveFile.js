import fs from 'fs'
import { Readable } from 'stream'

export default function saveFile(file, filename, callback) {
    if (!(file instanceof Readable)) throw new TypeError('file is not a readable stream')
    if (typeof filename !== 'string') throw new TypeError('filename is not a string')

    try {
        file.pipe(fs.createWriteStream(`files/${filename}`))

        file.on('error', error => callback(error))

        file.on('end', () => callback(null))
    } catch (error) {
        callback(error)
    }
}