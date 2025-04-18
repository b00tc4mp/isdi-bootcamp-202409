import 'dotenv/config'
import db from 'dat'
import getPosts from './getPosts.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const posts = await getPosts('6744e6fe3eeefc66cce68898')

    console.log(posts.map(({ id, author, image, text, date, liked, likes, saved, saves, comments }) => ({ id, author, image, text, date, liked, likes, saved, saves, comments })))
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}