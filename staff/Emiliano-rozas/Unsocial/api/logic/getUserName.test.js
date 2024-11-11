import db from 'dat'
import getUserName from './getUserName.js'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            getUserName('672ce6432d591ce2aef50c5b', '672e2336dd171a9a6e9355d0')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)