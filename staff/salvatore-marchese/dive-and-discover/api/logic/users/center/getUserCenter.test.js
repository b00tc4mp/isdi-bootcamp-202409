import 'dotenv/config'
import db from 'dat'
import getUserCentre from './getUserCenter.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const user = await getUserCentre('675c4091da1266cc13fb9496')

    console.log(user)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}
