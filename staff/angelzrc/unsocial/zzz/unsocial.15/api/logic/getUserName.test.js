import db from 'dat'
import getUserName from './getUserName.js'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            return getUserName('673504d23131d3523c5172ec', '673504d23131d3523c5172ec')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())