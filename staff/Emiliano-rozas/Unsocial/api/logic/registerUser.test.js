import db from 'dat'

import registerUser from './registerUser.js'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            registerUser('Kerry Kachota', 'Kerry@Kachota.com', 'KerryKachota', '123123123', '123123123')
                .then(() => console.log('user registered'))
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)