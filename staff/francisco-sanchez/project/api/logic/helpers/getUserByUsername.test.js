import 'dotenv/config'
import db from 'dat'

import getUserByUserame from './getUserByUserame.js'

//await db.connect(process.env.MONGO_URL)
await db.connect('mongodb://127.0.0.1:27017/hourify')

try {
    const userId = await getUserByUserame('675036c010473f3d809e5359', 'greygandalf2')
    console.log(userId)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}