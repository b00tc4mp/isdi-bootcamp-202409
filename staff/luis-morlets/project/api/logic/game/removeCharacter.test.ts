import 'dotenv/config'
import db from 'dat'
import removeCharacter from './removeCharacter.js'

await db.connect(process.env.MONGO_URL_TEST!)

try {
    const removedCharacter = await removeCharacter('674f80e721465aa4822f5b02', '6759caee21dbc59aa2ffb78a', '675746495c490d431cd2a1df')
    console.log(removedCharacter)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}