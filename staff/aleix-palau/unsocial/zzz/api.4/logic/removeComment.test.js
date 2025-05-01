import 'dotenv/config'
import db from 'dat'
import removeComment from './removeComment.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            return removeComment('67320fbf808fb47ab40d8190', '67322cb9c393d1e22528100b', '6735b9c6d32c630cbd86664b')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())