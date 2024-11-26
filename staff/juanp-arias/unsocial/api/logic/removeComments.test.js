import 'dotenv/config'
import db from 'dat'
import removeComment from './removeComment.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return removeComment('672e1cf7fbf40da8a565ff5d', '673219faee3859e42948275f', '67323535776be1b46c1db3b1')
                .then(() => console.log('comment deleted'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())