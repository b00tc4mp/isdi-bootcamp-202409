import 'dotenv/config'
import db from 'dat'

import getUserDetails from './getUserDetails.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const userScoreAndUsername = await getUserDetails('675d9098852e86d7f8194e16', '675d9098852e86d7f8194e16')

    console.log(userScoreAndUsername)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}