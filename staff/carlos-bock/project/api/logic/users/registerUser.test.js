import 'dotenv/config'
//import db from 'dat' // check routes
import db from '../../../dat/index.js'

import registerUser from './registerUser.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return registerUser('Puss in Boots', 'elgato@cat.net', 'elgato', '123132123', '123123123')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())


async function registered() {
    try {
        await db.connect(process.env.MONGO_URL_TEST)
        try {
            const result = await registerUser('Puss in Boots2', 'elgato2@cat.net', 'elgato2', '123132123', '123123123')
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

registered()

