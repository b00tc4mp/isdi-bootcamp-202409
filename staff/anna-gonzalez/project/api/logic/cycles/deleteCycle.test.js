import 'dotenv/config'
import db from 'dat'
import deleteCycle from './deleteCycle.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return deleteCycle('675ac723c12fd273993ea8c4', '2024-11-25T00:00:00.000Z')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())

//no edita bien el periodEnd