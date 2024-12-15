import 'dotenv/config'
import db from 'dat'

import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL)
//await db.connect('mongodb://127.0.0.1:27017/hourify')

try {
    const name = await getUserName('6751994806347a4b6bd70cdb', '6751994806347a4b6bd70cdb')
    console.log(name)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}