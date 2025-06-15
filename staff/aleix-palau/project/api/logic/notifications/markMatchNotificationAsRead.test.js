import 'dotenv/config'
import db from 'dat'
import markMatchNotificationAsRead from './markMatchNotificationAsRead.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await markMatchNotificationAsRead('6847037fa87f9edce15def06', '684af5dcfc132b28760b425c')

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}