import 'dotenv/config'
import db from 'dat'
import getItem from './getItem.js'

await db.connect(process.env.MONGO_URL_TEST!)

try {
    const item = await getItem('674f80e721465aa4822f5b02', '67516a89253c059da7f10f58')

    console.log(item)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}