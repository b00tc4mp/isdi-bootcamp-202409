import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            return getUserName('672cd989fcf48026d6c1c190', '672e328b08a231f547bd9166')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())