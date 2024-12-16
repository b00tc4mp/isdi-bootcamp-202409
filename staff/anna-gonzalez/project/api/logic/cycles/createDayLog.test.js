import 'dotenv/config'
import db from 'dat'
import createDayLog from './createDayLog.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createDayLog('675c5ded227dc4176577ed8f', '2024-11-19T00:00:00.000Z', { symptoms: ['backache', 'headache'] })
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())