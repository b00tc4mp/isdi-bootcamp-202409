import 'dotenv/config'
import db from 'dat'

import getBasePacks from './getBasePacks.js'

await db.connect(process.env.MONGO_URL)

const user = '67a1d44e01572f37bc099310'

try {
    const result = await getBasePacks(user)
    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}
