import 'dotenv/config'
import db from 'dat'
import getNote from './getNote.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getNote('67521389c89514449e0e3adb', '6754b4419b72deeb145c53ee')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())