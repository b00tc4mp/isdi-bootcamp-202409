import db from 'dat'
import getUserName from './getUserName.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return getUserName('6734991dbf16fcdc897ef6fc', '6734991dbf16fcdc897ef6fc')
                .then(console.log) // ...
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())