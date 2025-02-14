import 'dotenv/config'
import db from 'dat'

import getPets from './getPets.js'

await db.connect(process.env.MONGO_URL)

try {

    const pets = await getPets('674eebdb81e2c619b91f7de5')

    console.log(pets)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}

