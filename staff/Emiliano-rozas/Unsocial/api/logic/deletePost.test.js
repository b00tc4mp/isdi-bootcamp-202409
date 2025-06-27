import 'dotenv/config'
import db from 'dat'
import deletePost from './deletePost.js'


db.connect(process.env.MONGO_URL_TEST)

    .then(() => {
        try {
            deletePost('67321cb077f45c936bc2b2a0', '6734de734ec863c7d3b9d238')
                .then(() => console.log('Post deleted'))
                .catch(console.error)
        } catch (error) {
            console.error(error)

        }
    }).catch(console.error)
