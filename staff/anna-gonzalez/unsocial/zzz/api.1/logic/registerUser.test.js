import db from 'dat'
import registerUser from './registerUser.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return registerUser('Peter Pan', 'peter@pan.com', 'peterpan', '123123123', '123123123')
                .then(console.log) //undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())