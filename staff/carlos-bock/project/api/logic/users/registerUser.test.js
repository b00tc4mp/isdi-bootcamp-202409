import 'dotenv/config'
import db from '../../../dat/index.js' //import db from 'dat' // check routes


import registerUser from './registerUser.js'

db.connect('mongodb://127.0.0.1:27017/mired-test')//process.env.MONGO_URL
    .then(() => {
        try {
            return registerUser('Puss in Boots', 'elgato@cat.net', 'elgato', '123456789', '123456789')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())

/*
async function registered() {
    try {
        await db.connect('mongodb://127.0.0.1:27017/mired')//process.env.MONGO_URL_TEST
        try {
            const result = await registerUser('Puss in Boots2', 'elgato2@cat.net', 'elgato2', '123456789', '123456789')
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
*/
