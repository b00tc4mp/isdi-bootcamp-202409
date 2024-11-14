import 'dotenv/config'
import db from 'dat';

import getUserName from './getUserName.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getUserName('672e08451dfe72076c0ca52c', '672e08451dfe72076c0ca52c')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())