import 'dotenv/config'

import db from 'dat'

import updateUserProfile from '../updateUserProfile.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await updateUserProfile('675c13f7b61a0542d1ae04e9', 'calle falsa 123', '+54321234321', 'Barcelona', 'ESPAÑA', '1712')

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}
