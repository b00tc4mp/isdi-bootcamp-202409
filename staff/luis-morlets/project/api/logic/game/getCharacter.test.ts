import 'dotenv/config'
import db from 'dat'
import getCharacter from './getCharacter.js'

await db.connect(process.env.MONGO_URL_TEST!)

try {
    const character = await getCharacter('674f80e721465aa4822f5b02', '675746495c490d431cd2a1c5')

    console.log(character)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}