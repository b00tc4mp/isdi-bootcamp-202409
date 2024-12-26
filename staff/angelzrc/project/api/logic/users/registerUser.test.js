import 'dotenv/config'
import db from 'dat'

import registerUser from './registerUser.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await registerUser('Angel', 'angel@angel.com', 'angel', '123123123', '123123123')

    console.log(result) // undefined
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}