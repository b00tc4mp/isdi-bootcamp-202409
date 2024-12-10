import 'dotenv/config'
import db from 'dat'

import getUserByEmail from './getUserByEmail.js'

//await db.connect(process.env.MONGO_URL)
await db.connect('mongodb://127.0.0.1:27017/hourify')

try {
    const userId = await getUserByEmail('675036c010473f3d809e5359', 'greygandalf4@themiddleearth.com')
    console.log(userId)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}