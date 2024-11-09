import db from 'dat'
import getPosts from './getPosts.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {

        try {
            getPosts('672e2ff11dbad3a5583531bf') //userId //asumimos que vamos a necesitar el userId
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })