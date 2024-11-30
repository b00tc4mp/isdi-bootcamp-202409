import 'dotenv/config'
import db from 'dat';

import deletePost from './deletePost.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return deletePost('672e08451dfe72076c0ca52c', '6735cbaed29c2a1a58fd1850')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())