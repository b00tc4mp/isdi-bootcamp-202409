import 'dotenv/config'
import db from 'dat'

import createPlayerState from './createPlayerState.js'

await db.connect(process.env.MONGO_URL_TEST!)

try {
    const result = await createPlayerState('674f80e721465aa4822f5b02')
    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}