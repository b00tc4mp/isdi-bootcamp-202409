import db from 'dat'
import authenticateUser from './authenticateUser.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            return authenticateUser('cocodrilo', '123123123')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())