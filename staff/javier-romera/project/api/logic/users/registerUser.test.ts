import 'dotenv/config'
import db from 'dat'

import registerUser from './registerUser.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const result: void = await registerUser('javi@gmail.com', 'javi', '123123123', '123123123')

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}