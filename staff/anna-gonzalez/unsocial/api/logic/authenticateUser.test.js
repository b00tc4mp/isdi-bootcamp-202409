import db from 'dat'
import authenticateUser from './authenticateUser.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return authenticateUser('peterpan', '123123123')
                .then(console.log) //...
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())