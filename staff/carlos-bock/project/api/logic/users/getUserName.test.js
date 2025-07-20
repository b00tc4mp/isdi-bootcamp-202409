import 'dotenv/config'
import db from '../../../dat/index.js'//import db from 'dat' // check routes

import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const name = await getUserName('6748a152caec5adc6e337baf', '6748a152caec5adc6e337baf')

    console.log(name)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}