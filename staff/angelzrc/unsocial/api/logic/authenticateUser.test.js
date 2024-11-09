import db from 'dat'
import authentcateUser from './authenticateUser.js'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            authentcateUser('cocodrilo', '123123123')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)