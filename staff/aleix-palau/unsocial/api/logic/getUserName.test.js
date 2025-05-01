import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL)

try {
    const name = await getUserName('67320fbf808fb47ab40d8190', '67320fbf808fb47ab40d8190')

    console.log(name)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}