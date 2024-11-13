import db from 'dat'
import getComments from './getComments.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return getComments('672e2c487f1acbd7a5009c67', '67331278d9522b9878546bd3')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())