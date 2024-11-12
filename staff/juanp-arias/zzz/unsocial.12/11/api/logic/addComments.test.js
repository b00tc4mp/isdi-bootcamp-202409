import db from 'dat'
import addComments from './addComments.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return addComments('672e1b358df30e650717dcb4', '673219faee3859e42948275f', 'heythere')
                .then(() => console.log('commented'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())