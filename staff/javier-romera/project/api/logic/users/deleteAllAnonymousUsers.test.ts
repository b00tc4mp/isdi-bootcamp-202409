import 'dotenv/config'
import db from 'dat'

import deleteAllAnonymousUsers from './deleteAllAnonymousUsers.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const result: void = await deleteAllAnonymousUsers()

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}