import 'dotenv/config'
import db from 'dat'

import registerAnonymousUser from './registerAnonymousUser.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const result = await registerAnonymousUser()

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}