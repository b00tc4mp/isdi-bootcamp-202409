import 'dotenv/config'
import db from 'dat'

import getUser from './getUser.js'

await db.connect(process.env.MONGO_URL_TEST)

try {

    const user = await getUser('67505536c7e94a4c720a693c')

    console.log(user)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}

