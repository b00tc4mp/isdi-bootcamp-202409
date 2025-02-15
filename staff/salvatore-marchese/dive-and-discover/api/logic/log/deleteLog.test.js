// failed test, cannot find the logbook to be deleted 
import 'dotenv/config'
import db from 'dat'
import deleteLog from './deleteLog.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return deleteLog('67503f6a10182798c1418773','675aee162f99377e5e808c64')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())