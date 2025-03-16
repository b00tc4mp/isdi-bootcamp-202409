import 'dotenv/config'
import db from 'dat'

import registerUser from './registerUser.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await registerUser('h', 'Helio', '123', '123')

    console.log(result) //undefined
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}