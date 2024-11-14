import db from 'dat'
import getComments from './getComments.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return getComments('67320fbf808fb47ab40d8190', '67322cb9c393d1e22528100b')
                .then(console.log) // [{...}, {...}, ...]
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())