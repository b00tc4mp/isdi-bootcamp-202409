import db from 'dat'
import removeComment from './removeComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            removeComment('672e24ea47d3288ee08db8e0', '672e3b61896ebf3fbb5fb827', '673089484c34346f85700901')
                .then(() => console.log('Comment deleted'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)