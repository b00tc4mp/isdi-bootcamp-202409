import 'dotenv/config'
import db from 'dat'
import getComments from './getComments.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return getComments('672e020b405e99414c72a710', '6731cf9fd43e158259538a4f')
                .then(console.log) // [{...}, {...}, ...]
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())