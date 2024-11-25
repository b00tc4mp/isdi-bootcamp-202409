import 'dotenv/config'
import db from 'dat'

import getComments from './getComments.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getComments('672e08451dfe72076c0ca52c', '6735327903bb9af45aed8041')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())