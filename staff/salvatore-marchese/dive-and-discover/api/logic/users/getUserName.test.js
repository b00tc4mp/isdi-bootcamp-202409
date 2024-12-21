import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const name = await getUserName('67503f6a10182798c1418773', '67503f6a10182798c1418773')

    console.log(name)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}