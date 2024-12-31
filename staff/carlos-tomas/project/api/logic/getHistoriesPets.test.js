import 'dotenv/config'
import db from 'dat'

import getHistoriesPets from './getHistoriesPets.js'

await db.connect(process.env.MONGO_URL)

try {

    const histories = await getHistoriesPets('674eebdb81e2c619b91f7de5', 'internal_medicine', '675573a210cfb292da0d053f')

    console.log(histories)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}

