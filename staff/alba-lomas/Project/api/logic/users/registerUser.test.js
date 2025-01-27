


import 'dotenv/config'
import db from 'dat'

import registerUser from './registerUser.js'

await db.connect(process.env.MONGO_URL)

try {
    const result = await registerUser('employee', 'alba', 'alba@lomas.com', '46718412-F', '123123123', '123123123')

    console.log(result) // undefined
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}