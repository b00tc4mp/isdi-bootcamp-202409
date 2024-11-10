import db from 'dat'
import addComment from './addComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            addComment('672e24ea47d3288ee08db8e0', '672e3b61896ebf3fbb5fb827', 'hola patagonia')
                .then(() => console.log('Comment added'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)