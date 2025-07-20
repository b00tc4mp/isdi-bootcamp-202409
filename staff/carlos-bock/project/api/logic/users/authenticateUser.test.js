import 'dotenv/config'
//import db from 'dat' // check routes
import db from '../../../dat/index.js'
import authenticateUser from './authenticateUser.js'

console.log(process.env.MONGO_URL_TEST)

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return authenticateUser('elgato', '123132123')
                .then(console.log) //nohting
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())

async function authenticate() {
    try {
        await db.connect(process.env.MONGO_URL_TEST)
        try {
            const result = await authenticateUser('elgato2', '123132123')
            console.log(result) // undefined
        } catch (error) {
            console.error(error)
        } finally {
            await db.disconnect()
        }
    } catch (error) {
        console.error(error)
    }
}

authenticate()