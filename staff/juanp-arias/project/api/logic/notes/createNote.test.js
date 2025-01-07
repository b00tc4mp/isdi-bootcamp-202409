import 'dotenv/config'
import db from 'dat'
import createNote from './createNote.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createNote('67521389c89514449e0e3adb', 'hola notas')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())