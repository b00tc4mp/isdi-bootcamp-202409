import 'dotenv/config'
import db from 'dat'

import getUserScore from './getUserScore.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const score = await getUserScore('675a08ffec407c3e85aff04c', '675a08ffec407c3e85aff04c')

    console.log(score)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}