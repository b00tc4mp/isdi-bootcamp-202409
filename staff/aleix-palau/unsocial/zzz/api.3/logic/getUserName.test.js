import db from 'dat'
import getUserName from './getUserName.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return getUserName('67320fbf808fb47ab40d8190', '67320fbf808fb47ab40d8190')
                .then(console.log) // ...
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())