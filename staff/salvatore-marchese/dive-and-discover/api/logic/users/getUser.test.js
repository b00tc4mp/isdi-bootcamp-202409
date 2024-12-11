import 'dotenv/config'
import db from 'dat'
import getUser from "./getUser.js"

await db.connect(process.env.MONGO_URL_TEST)

try {
    const user = await getUser('67503f6a10182798c1418773')

    console.log(user)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}