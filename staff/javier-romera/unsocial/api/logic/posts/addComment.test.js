import 'dotenv/config'
import db from 'dat'

import addComment from './addComment.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addComment('672e08451dfe72076c0ca52c', '6735327903bb9af45aed8041', 'mongoose comment3')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())