import 'dotenv/config'
import db from 'dat'
import getCharacters from './getCharacters.js'

await db.connect(process.env.MONGO_URL_TEST!)

try {
    const characters = await getCharacters('674f80e721465aa4822f5b02')

    console.log(characters)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}