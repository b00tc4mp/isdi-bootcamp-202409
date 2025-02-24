import 'dotenv/config'
import db from 'dat'
import getCharacterByUuid from './getCharacterByUuid.js'

await db.connect(process.env.MONGO_URL_TEST!)

try {
    const character = await getCharacterByUuid('674f80e721465aa4822f5b02', 'qivos-shadowstep')

    console.log(character)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}