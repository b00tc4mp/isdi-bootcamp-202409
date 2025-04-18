import db from 'dat'
import addComment from './addComment.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return addComment('672e24ea47d3288ee08db8e0', '672e3b61896ebf3fbb5fb827', 'hola patagonia')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())