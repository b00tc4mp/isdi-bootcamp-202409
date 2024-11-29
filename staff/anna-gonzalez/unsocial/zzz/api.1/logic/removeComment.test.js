import db from 'dat'
import removeComment from './removeComment.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return removeComment('672e24ea47d3288ee08db8e0', '672e3b61896ebf3fbb5fb827', '673089484c34346f85700901')
                .then(console.log) //undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())