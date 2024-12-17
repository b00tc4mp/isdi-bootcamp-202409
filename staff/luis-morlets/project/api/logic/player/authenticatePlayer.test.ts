import 'dotenv/config'
import db from 'dat'
import authenticatePlayer from './authenticatePlayer.js'

await db.connect(process.env.MONGO_URL_TEST!)

try {
    const player = await authenticatePlayer('manivela', '123123123')
    console.log(player)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}