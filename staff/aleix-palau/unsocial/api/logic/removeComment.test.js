import db from 'dat'
import removeComment from './removeComment.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return removeComment('67320fbf808fb47ab40d8190', '67322cb9c393d1e22528100b', '67337330a56f6f3b9d23fded')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())