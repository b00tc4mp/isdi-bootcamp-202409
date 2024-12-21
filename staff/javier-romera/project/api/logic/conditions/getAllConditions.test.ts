import 'dotenv/config'
import db from 'dat'

import getAllConditions from './getAllConditions.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const conditions = await getAllConditions('676182c6b8731895f18ca844')

    console.log(conditions)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}