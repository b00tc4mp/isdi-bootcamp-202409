import db from 'dat'
import getUserName from './getUserName.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            getUserName('673102adab634f097e0719f9', '6731064da072cbd2088763d9')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }

    })
    .catch(console.error)
    .finally(() => db.disconnect())