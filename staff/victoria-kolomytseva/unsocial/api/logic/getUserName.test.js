import db from 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const name = await getUserName('673102adab634f097e0719f9', '6731064da072cbd2088763d9')

    console.log(name)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}