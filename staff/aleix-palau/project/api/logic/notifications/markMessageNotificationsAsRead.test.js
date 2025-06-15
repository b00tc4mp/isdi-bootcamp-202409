import 'dotenv/config'
import db from 'dat'
import markMessageNotificationsAsRead from './markMessageNotificationsAsRead.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await markMessageNotificationsAsRead('68429f2ff01ff02aab70f0d4', '684af5dcfc132b28760b4259')

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}