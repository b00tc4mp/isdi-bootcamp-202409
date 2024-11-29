import 'dotenv/config'
import db from 'dat'
import deletePost from './deletePost.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const post = await deletePost('6744e5532b5774964ad2c738', '6744e5c4f7f99bb8fee13a94')

    console.log(post)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}