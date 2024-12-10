import 'dotenv/config'
import db from 'dat'
import getUsers from './getUsers.js'

await db.connect(process.env.MONGO_URL_TEST)
try {
    const users = await getUsers('675857763423c819f56b5047')
    console.log(users)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}