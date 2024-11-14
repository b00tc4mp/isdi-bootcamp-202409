import db from 'dat'
import getUserName from './getUserName.js'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            getUserName('67321cb077f45c936bc2b2a0', '67321cb077f45c936bc2b2a0')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)