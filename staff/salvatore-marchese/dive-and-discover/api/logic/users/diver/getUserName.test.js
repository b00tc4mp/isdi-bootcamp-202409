import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const name = await getUserName('679cf76d0a6821e5457d53fa', '679cf76d0a6821e5457d53fa')

    console.log(name)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}