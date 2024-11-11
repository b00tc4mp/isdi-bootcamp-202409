import db from 'dat'

import authenticateUser from './authenticateUser.js'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            authenticateUser('cocodrilo', '123123123')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }

    })
    .catch(console.error)