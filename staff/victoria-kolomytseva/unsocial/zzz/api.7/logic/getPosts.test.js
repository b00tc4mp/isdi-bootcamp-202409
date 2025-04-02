import 'dotenv/config'
import db from 'dat'
import getPosts from './getPosts.js'


db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getPosts('673102adab634f097e0719f9')
                .then(posts => console.log(posts.map(({ id, author, image, text, date, liked, likes, comments }) => ({ id, author, image, text, date, liked, likes, comments }))))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())