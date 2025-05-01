import db from 'dat'
import addComment from './addComment.js'

db.connect(process.env.MONGO_URL)
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