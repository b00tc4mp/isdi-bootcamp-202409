import 'dotenv/config'
import db from 'dat'

import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await getUserName('674da6f28d6403a5dedb1a5f', '674da6f28d6403a5dedb1a5f')

    console.log(result) //undefined
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}