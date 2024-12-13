import 'dotenv/config'
import db from 'dat'

import updateUserScore from './updateUserScore.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const result = await updateUserScore('675a08ffec407c3e85aff04c', 100)

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}