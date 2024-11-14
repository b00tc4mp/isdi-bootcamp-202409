import 'dotenv/config'
import db from 'dat'
import registerUser from './registerUser.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            registerUser('Kerry Kchota', 'Kerry@Kachota.com', 'KerryKchota', '123123123', '123123123')
                .then(() => console.log('user registered'))
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)