import 'dotenv/config'
import db from 'dat'
import getPosts from './getPosts.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getPosts('6758a22dfb70087692d96855')
                .then(posts => console.log(posts.map(({ id, author, image, text, date, whatHappened, petType, petGender, status, likes, comments }) => ({ id, author, image, text, date, whatHappened, petType, petGender, status, likes, comments }))))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())