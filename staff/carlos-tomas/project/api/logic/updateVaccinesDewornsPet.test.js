import 'dotenv/config'
import db from 'dat'

import updateVaccinesDewornsPet from './updateVaccinesDewornsPet.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return updateVaccinesDewornsPet('674eebdb81e2c619b91f7de5', '675c5f03a421b6fbc2639f93', 'rabies', 'both')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())