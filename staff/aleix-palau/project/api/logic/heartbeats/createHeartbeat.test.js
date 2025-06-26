import 'dotenv/config'
import db from 'dat'
import createHeartbeat from './createHeartbeat.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await createHeartbeat('68429f2ff01ff02aab70f0d4', '6847037fa87f9edce15def06', 'right')

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}