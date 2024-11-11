import db from 'dat'

import getComments from './getComments.js'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            getComments('672ce6432d591ce2aef50c5b', '672cea63a14bd241a52c11f9')
                .then(console.log)
                .catch(error => { new Error(error.message) })
        } catch (error) {
            console.error(error)
        }

    })
    .catch(console.error)