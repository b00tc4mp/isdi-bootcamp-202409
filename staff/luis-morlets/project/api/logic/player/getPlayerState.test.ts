import 'dotenv/config'
import db from 'dat'
import getPlayerState from './getPlayerState.js'

await db.connect(process.env.MONGO_URL_TEST!)

try {
    const playerState = await getPlayerState('674f80e721465aa4822f5b02')

    console.log(playerState)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}