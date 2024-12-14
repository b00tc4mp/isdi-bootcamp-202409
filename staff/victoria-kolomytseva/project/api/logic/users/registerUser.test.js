import 'dotenv/config'
import db from 'dat'

import registerUser from './registerUser.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await registerUser('María López', 'mari0.lopez@example.com', '123123123', '123123123')

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
} 