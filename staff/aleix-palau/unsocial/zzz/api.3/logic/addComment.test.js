import db from 'dat'
import addComment from './addComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            addComment('...', '...', 'hola patagonia')
                .then(() => console.log('Comment added'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)