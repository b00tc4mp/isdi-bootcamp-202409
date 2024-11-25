import 'dotenv/config'
import db from 'dat'
import authenticateUser from './authenticateUser.js'

await db.connect('mongodb://127.0.0.1:27017/unsocial-test')

try {
    const user = await authenticateUser('ctcarlos25', '123123123')

    console.log(user)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}

