import 'dotenv/config'
import db from 'dat'
import getComments from './getComments.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            getComments('67321cb077f45c936bc2b2a0', '67321e791885a22a2b68dc33')
                .then(console.log)
                .catch(error => { new Error(error.message) })
        } catch (error) {
            console.error(error)
        }

    })
    .catch(console.error)