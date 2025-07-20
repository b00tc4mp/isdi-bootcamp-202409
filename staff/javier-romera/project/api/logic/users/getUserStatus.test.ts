import 'dotenv/config'
import db from 'dat'

import getUserStatus from './getUserStatus.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const status: number = await getUserStatus('67507b73057ea68270d315a1', '67507b73057ea68270d315a1')

    console.log(status)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}