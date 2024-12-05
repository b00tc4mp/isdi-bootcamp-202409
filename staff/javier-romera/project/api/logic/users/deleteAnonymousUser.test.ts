import 'dotenv/config'
import db from 'dat'

import deleteAnonymousUser from './deleteAnonymousUser.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const result = await deleteAnonymousUser('6750d1227bfe02931a55ecaa')

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}