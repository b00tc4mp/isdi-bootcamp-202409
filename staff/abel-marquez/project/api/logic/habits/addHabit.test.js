import 'dotenv/config'
import addHabit from './addHabit.js'
import db from 'dat'


db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addHabit('675ace02a28a390d912bc40e','ir a correr', 'salud y bienestar', 'hacer ejercicio', '💀')
            .then(console.log)
            .catch(console.error)

        }  catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())
