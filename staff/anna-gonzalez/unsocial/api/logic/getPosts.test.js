import 'dotenv/config'
import db from 'dat'
import getPosts from './getPosts.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getPosts('6734bc401af0ac4373132714')
                .then(posts => console.log(posts.map(({ id, author, image, text, date, liked, likes, saved, saves, comments }) => ({ id, author, image, text, date, liked, likes, saved, saves, comments }))))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())