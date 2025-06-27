import 'dotenv/config'
import db from 'dat'
import addComment from './addComment.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            addComment('67321cb077f45c936bc2b2a0', '6734e0ccdca0dc9254650fbc', 'la concha de tu madre carlit0')
                .then(() => console.log('Comment added'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)