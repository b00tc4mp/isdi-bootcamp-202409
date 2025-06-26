import 'dotenv/config'
import db from 'dat'
import sendMessage from './sendMessage.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const message = await sendMessage('68429f2ff01ff02aab70f0d4', '684af1e1fc132b28760a1cd0', 'Holi:3')

    console.log(message)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}