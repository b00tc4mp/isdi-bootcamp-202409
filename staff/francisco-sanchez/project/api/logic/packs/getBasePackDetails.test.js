import 'dotenv/config'
import db from 'dat'

import getBasePackDetails from './getBasePackDetails.js'

await db.connect(process.env.MONGO_URL)

const basePackId = '675992ac3a14a7927ccfe13b'

try {
    const result = await getBasePackDetails(basePackId)
    console.log(result)

} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}