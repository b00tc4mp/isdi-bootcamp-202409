import db from 'dat'
import removeComment from './removeComment.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            removeComment('m2vvw4xzn6d', 'm2vw4ucygv', 'm32welb3e29')
                .then(() => console.log('Comment deleted'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)