import 'dotenv/config'
import db from 'dat'
import deleteNote from './deleteNote.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return deleteNote('67536eec0e2139105387db02', '67537a9015227a630461c11b')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())