import 'dotenv/config'
import db from 'dat'
import createPost from './createPost.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const post = await createPost('6744e5532b5774964ad2c738', 'https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg', 'hola patagonia')

    console.log(post)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}