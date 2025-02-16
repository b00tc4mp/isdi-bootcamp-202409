import 'dotenv/config'
import db from 'dat'
import deleteHabit from './deleteHabit.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return deleteHabit('675ace02a28a390d912bc40e','675b0409eb88a672a794bf6d',)
                .then(console.log('habito deleteado cabron'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())