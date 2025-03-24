import 'dotenv/config'
import db from 'dat'

import deletePlayerState from './deletePlayerState.js'

await db.connect(process.env.MONGO_URL_TEST!)

try {
    const result = await deletePlayerState('674f80e721465aa4822f5b02', '6759a6fe354bea44279f532a')
    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}