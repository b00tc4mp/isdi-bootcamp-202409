import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            return getUserName('67378b4d74cc1d9a08635804', '67378b4d74cc1d9a08635804')
                .then(console.log) // ...
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())