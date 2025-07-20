import 'dotenv/config'
import db from 'dat'
import getPosts from './getPosts.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getPosts('675dc5ed0a0b25eaffae0665')
                .then(posts => console.log(posts.map(({ id, author, image, text, date, whatHappened, petType, petGender, likes, comments }) => ({ id, author, image, text, date, whatHappened, petType, petGender, likes, comments }))))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())