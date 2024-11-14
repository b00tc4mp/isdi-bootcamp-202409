import db from 'dat'
import addComment from './addComment.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return addComment('67320fbf808fb47ab40d8190', '67322cb9c393d1e22528100b', 'sometimes they come back')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())