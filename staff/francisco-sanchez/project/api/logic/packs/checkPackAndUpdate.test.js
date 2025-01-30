import 'dotenv/config'
import db from 'dat'

import checkPackAndUpdate from './checkPackAndUpdate.js'

await db.connect(process.env.MONGO_URL)

const packId = '6780fa7958255d20563d6a97'


try {
    const result = await checkPackAndUpdate(packId)

} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}