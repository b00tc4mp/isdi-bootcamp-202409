import 'dotenv/config'
import db from 'dat'

import authenticateUser from './authenticateUser.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await authenticateUser('Helio', '123')

    console.log(result) //undefined
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}