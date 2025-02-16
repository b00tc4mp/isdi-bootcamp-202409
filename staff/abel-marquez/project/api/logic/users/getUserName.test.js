import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            debugger
            return getUserName('675ace02a28a390d912bc40e', '675ace02a28a390d912bc412')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())