import 'dotenv/config'
import db from 'dat'
import getPosts from './getPosts.js'


db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getPosts('6734c629869a91c1bf87851b')
                .then(posts => console.log(posts.map(({ id, author, image, text, date, liked, likes, comments }) => ({ id, author, image, text, date, liked, likes, comments }))))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())