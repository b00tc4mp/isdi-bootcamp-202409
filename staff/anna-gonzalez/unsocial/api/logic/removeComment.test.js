import db from 'dat'
import removeComment from './removeComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            removeComment('672e1ed8d36186d1eaf683b1', '672e33294049f022635a1d6d', '672fa21f2af78f9770d547fd')
                .then(() => console.log('Comment deleted'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)