import 'dotenv/config'
import db from 'dat'
import createGameState from './createGameState.js'

await db.connect(process.env.MONGO_URL_TEST!)

try {
    const character = await createGameState('674f80e721465aa4822f5b02', '676196c450e057af2242c803')

    console.log(character)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}