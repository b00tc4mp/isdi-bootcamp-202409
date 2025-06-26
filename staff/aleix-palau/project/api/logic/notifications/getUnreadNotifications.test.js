import 'dotenv/config'
import db from 'dat'
import getUnreadNotifications from './getUnreadNotifications.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const notifications = await getUnreadNotifications('68429f2ff01ff02aab70f0d4')

    console.log(notifications)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}