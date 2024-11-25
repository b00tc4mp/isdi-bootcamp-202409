import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL_TEST)
try {
    const name = await getUserName('67449f533a5eb9411f85b226', '67449f533a5eb9411f85b226')
    console.log(name)

} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}
