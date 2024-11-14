import 'dotenv/config'
import db from 'dat'
import getPosts from './getPosts.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            getPosts('67321cb077f45c936bc2b2a0')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })