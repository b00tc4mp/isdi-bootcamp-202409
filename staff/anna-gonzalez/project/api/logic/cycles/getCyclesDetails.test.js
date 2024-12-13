import 'dotenv/config'
import db from 'dat'
import getCyclesDetails from './getCyclesDetails.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getCyclesDetails('675c46cdf9d5c67853170b22')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())