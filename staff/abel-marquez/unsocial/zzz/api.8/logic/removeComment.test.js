import 'dotenv/config'
import db from 'dat'
import removeComment from './removeComment.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return removeComment('672e020b405e99414c72a710', '6731cf9fd43e158259538a4f', '6733418e55453318f7c7b9d3')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())
