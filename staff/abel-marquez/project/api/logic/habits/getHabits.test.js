import 'dotenv/config'
import getHabits from './getHabits.js'
import db from 'dat'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getHabits('675ace02a28a390d912bc40e')
            .then(habits => console.log('Hábitos del usuario:', habits ))
            
                .catch(console.error)
        }   catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())