import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const name = await getUserName('6745ab3f7d53422281e66e09', '6745ab3f7d53422281e66e09')

    console.log(name)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}
