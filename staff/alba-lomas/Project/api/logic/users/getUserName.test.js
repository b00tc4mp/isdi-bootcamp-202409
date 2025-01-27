


import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL)

try {
    const name = await getUserName('674468166cc4797b743eedc6', '674468166cc4797b743eedc6')

    console.log(name)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}