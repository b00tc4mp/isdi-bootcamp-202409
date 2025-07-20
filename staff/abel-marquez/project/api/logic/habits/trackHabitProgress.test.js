import 'dotenv/config'
import db from 'dat'
import trackHabitProgress from './trackHabitProgress.js'

db.connect(process.env.MONGO_URL_TEST)

.then(() => {
    try {
        return trackHabitProgress('675ace02a28a390d912bc40e', '675b0ff9158704bcf2d74f47', 'done')

        .catch(console.error)
    }   catch(error) {
        console.error(error)
    }
})
.catch(console.error)
.finally(() => db.disconnect())