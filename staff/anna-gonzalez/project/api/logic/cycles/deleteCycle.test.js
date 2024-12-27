import 'dotenv/config'
import db from 'dat'
import deleteCycle from './deleteCycle.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return deleteCycle('67613ab38ad7845f15ea6873', '2024-11-25T00:00:00.000Z')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())

//no edita bien el periodEnd