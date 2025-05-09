import 'dotenv/config'
import db from 'dat'
import createMeet from './createMeet.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await createMeet('6751bb7c067ed8cebadadd77', ['Tech', 'Chess', 'Football'], '', [41.379535, 2.151682], new Date, new Date(Date.now() + 2 * (60 * 60 * 1000)), '', '')

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}