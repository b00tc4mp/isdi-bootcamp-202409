import db from 'dat'

import getUserName from './getUserName.js'


db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return getUserName('672e228ed27d55a76e0d8190', '672e22eada8aaa7e1073c59b')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect)

